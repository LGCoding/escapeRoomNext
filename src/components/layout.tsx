"use client";
import { ButtonGroup } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import NavButton from "./main/navButton";
import { sessionContext } from "~/pages/_app";
import { useContext } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useContext(sessionContext);
  console.log(session);
  return (
    <>
      <div
        style={{
          display: "grid",
          height: "100%",
          maxHeight: "100%",
          overflow: "hidden",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "min-content minmax(0, 1fr) min-content",
          gridTemplateAreas: `
                    'a'
                    'b'
                    'c'
                   `,
        }}
      >
        <div
          className="bg-secondary"
          style={{
            gridArea: "a",
          }}
        >
          <h2 className="fw-bold text-light text-uppercase mb-2 text-center ">
            <Image
              src="/images/logo.svg"
              alt="Brand"
              style={{
                width: "2.5rem",
                position: "relative",
                display: "inline",
              }}
            />{" "}
            Escape Room{" "}
            <Image
              src="/images/logo.svg"
              alt="Brand"
              style={{
                width: "2.5rem",
                position: "relative",
                display: "inline",
              }}
            />
          </h2>
        </div>
        <div
          className="overflow-scroll"
          style={{
            gridArea: "b",
            padding: ".25rem",
          }}
        >
          {children}
        </div>
        <div
          style={{
            gridArea: "c",
            textAlign: "center",
          }}
          className="bg-secondary"
        >
          <ButtonGroup>
            <NavButton href="/main" iconName="HouseDoorFill">
              Home
            </NavButton>
            <NavButton href="/main/qr" iconName="QrCodeScan">
              Qrcode
            </NavButton>
            <NavButton href="/main/cards" iconName="FileLock2Fill">
              Cards
            </NavButton>
            <NavButton href="/main/locks" iconName="LockFill">
              Locks
            </NavButton>

            <NavButton
              style={{ display: session.isAdmin ? "block" : "none" }}
              href="/main/admin"
              iconName="PersonFillGear"
            >
              Admin
            </NavButton>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}
