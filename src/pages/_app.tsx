import { type AppType } from "next/app";
import Head from "next/head";
import { api } from "~/utils/api";
import "~/styles/globals.scss";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardText, CardTitle } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import { createContext } from "react";

interface swal {
  title?: string;
  mainText?: string;
  icon?: "error" | "none";
  confirmButton?: boolean;
  cancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmCallback?: () => void;
  cancelCallback?: () => void;
}

interface session {
  isAdmin: boolean;
}

export const swalContext = createContext((swalInfo: swal) => {
  console.log(swalInfo);
});

export const sessionContext = createContext<session>({ isAdmin: false });

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [swalInfo, setSwalInfo] = useState<swal>({
    title: "Test",
    mainText: "This is a test",
    icon: "error",
  });

  const checkSession = api.login.checkSession.useQuery(
    {
      session:
        typeof window !== "undefined"
          ? localStorage?.getItem("session") ?? ""
          : "",
    },
    {
      enabled:
        typeof window !== "undefined" && !!localStorage?.getItem("session"),
    },
  );

  function handleClose() {
    setShow(false);
  }

  function swal(swalInfo: swal) {
    setSwalInfo(swalInfo);
    setShow(true);
  }

  useEffect(() => {
    // if (!localStorage) return;
    // if (localStorage.getItem("session")) {
    //   if (checkSession.fetchStatus !== "idle") return;
    //   if (checkSession.data && !checkSession.data.valid) {
    //     void router.push("/");
    //     localStorage.removeItem("session");
    //   } else {
    //     if (router.pathname === "/") {
    //       void router.push("/main");
    //     }
    //   }
    //   if (!checkSession.data) return;
    //   setIsAdmin(checkSession.data.isAdmin);
    //   if (
    //     router.pathname.includes("/main/admin") &&
    //     !checkSession.data.isAdmin
    //   ) {
    //     void router.push("/main");
    //   }
    // } else {
    //   if (router.pathname.includes("/main")) {
    //     void router.push("/");
    //   }
    // }
  }, [checkSession.data, checkSession.fetchStatus, router]);
  return (
    <>
      <Head>
        <title>{"Escape St. Sebastian's"}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      <div
        style={{
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        <swalContext.Provider value={swal}>
          {/* <sessionContext.Provider value={{ isAdmin }}> */}
          {router.route.startsWith("/main") ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
          {/* </sessionContext.Provider> */}
        </swalContext.Provider>
      </div>
      <div
        style={{
          display: show ? "block" : "none",
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          backgroundColor: "rgba(50,50,50,.5)",
        }}
        onClick={handleClose}
      >
        <Card
          style={{
            width: "18rem",
            left: "calc(50% - 9rem)",
            top: "50%",
            translate: "0 -90%",
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <CardBody style={{ textAlign: "center" }}>
            <XCircle
              color="red"
              style={{
                display: swalInfo?.icon === "error" ? "block" : "none",
                left: "calc(50% - 2.5rem)",
                position: "relative",
                width: "5rem",
                height: "5rem",
              }}
            ></XCircle>
            <CardTitle
              style={{
                fontSize: "2rem",
              }}
            >
              {swalInfo?.title ?? ""}
            </CardTitle>
            <CardText
              style={{
                fontSize: "1.5rem",
              }}
            >
              {swalInfo?.mainText ?? ""}
            </CardText>
            <Button
              style={{
                display: swalInfo?.confirmButton ?? true ? "inline" : "none",
                marginRight: ".5rem",
                marginLeft: ".5rem",
              }}
              variant="primary"
              onClick={() => {
                if (swalInfo.confirmCallback) {
                  swalInfo.confirmCallback();
                }
                handleClose();
              }}
            >
              Confirm
            </Button>
            <Button
              style={{
                display: swalInfo?.cancelButton ?? true ? "inline" : "none",
                marginRight: ".5rem",
                marginLeft: ".5rem",
              }}
              onClick={() => {
                if (swalInfo.cancelCallback) {
                  swalInfo.cancelCallback();
                }
                handleClose();
              }}
              variant="danger"
            >
              Cancel
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default api.withTRPC(MyApp);