import crypto from "node:crypto";
import { env } from "~/env";

const secret = Buffer.from(env.AUTH_SECRET, "hex");
const iv = Buffer.from(env.AUTH_IV, "hex");

export function encrypt(data: string) {
  const cipher = crypto.createCipheriv("aes-256-cbc", secret, iv);

  let encryptedText = cipher.update(data, "utf-8", "hex");

  // finalize the encryption
  encryptedText += cipher.final("hex");
  return encryptedText;
}

export function decrypt(data: string) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", secret, iv);
  let decryptedText = decipher.update(data, "hex", "utf-8");

  // finalize the decryption
  decryptedText += decipher.final("utf-8");

  return decryptedText;
}
