import {
  type $Enums,
  Role,
  type Prisma,
  type PrismaClient,
} from "@prisma/client";
import { type DefaultArgs } from "@prisma/client/runtime/library";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { decrypt, encrypt } from "~/server/util/encrypt";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import NodeMailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { env } from "~/env";
import { createObjectFromJson, userSchema } from "~/server/util/schemaValidate";

export interface Session {
  id: string;
  userId: string;
  role: $Enums.Role;
}

const transportOptions: SMTPTransport.Options = {
  service: "gmail",
  auth: {
    user: "escapestsebs@gmail.com",
    pass: "pmurfpjrxlfejgqv",
  },
  logger: true,
};

const transporter = NodeMailer.createTransport(transportOptions);

function sendEmail(to: string, subject: string, text: string) {
  const mailOptions: Mail.Options = {
    from: "escapestseb@gmail.com", // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
}

export const loginRouter = createTRPCRouter({
  checkSession: publicProcedure
    .input(z.object({ session: z.string() }))
    .query(async ({ input, ctx }) => {
      console.log(ctx.session);
      if (ctx.session?.userId) {
        return { valid: true, isAdmin: ctx.session.role === "ADMIN" };
      } else {
        return { valid: false, isAdmin: false };
      }
    }),
  sendRegisterEmail: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });
      if (!user) {
        sendEmail(
          input.email,
          "Register User",
          "Use this link to register your email " +
            (env.NODE_ENV === "development"
              ? `localhost:3000/register?data=${encrypt(JSON.stringify(input))}`
              : `https://escapestsebs.com/register?data=${encrypt(JSON.stringify(input))}`),
        );
        return true;
      } else {
        return false;
      }
    }),
  registerUser: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      try {
        const decryptedUser = createObjectFromJson(userSchema, decrypt(input));

        const user = await ctx.db.user.findFirst({
          where: {
            email: decryptedUser.email,
          },
        });
        if (!user) {
          const user = await ctx.db.user.create({
            data: {
              name: decryptedUser.name,
              email: decryptedUser.email,
              password: encrypt(decryptedUser.password),
              role: Role.ADMIN,
            },
          });
          const session = await createSession(ctx, user.id, user.role);
          const encoded = encrypt(JSON.stringify(session));
          return { wasError: false, data: encoded };
        } else {
          return {
            wasError: true,
            data: "Either link has been used or it's invalid",
          };
        }
      } catch (error) {
        return { wasError: true, data: "Invalid Attempt" };
      }
    }),
  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          email: input.email,
          password: encrypt(input.password),
        },
        select: {
          id: true,
          sessions: true,
          role: true,
        },
      });
      if (user) {
        if (user.sessions) {
          await ctx.db.session.delete({
            where: {
              userId: user.id,
              id: user.sessions.id,
            },
          });
        }
        const session = await createSession(ctx, user?.id, user.role);
        const encoded = encrypt(JSON.stringify(session));
        return { wasError: false, data: encoded };
      } else {
        return { wasError: true, data: "That username or password is wrong" };
      }
    }),
});

async function createSession(
  ctx: {
    db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  },
  id: string,
  role: $Enums.Role,
) {
  const session = await ctx.db.session.create({
    data: {
      userId: id,
      expiresAt: addDays(new Date(), 2),
      role: role,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { id: session.id, userId: session.userId, role: session.role };
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
