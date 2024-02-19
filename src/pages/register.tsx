"use client";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "react-bootstrap/Image";
import { api } from "~/utils/api";
import { swalContext } from "./_app";

export default function Register() {
  const router = useRouter();
  const query: string | undefined = router.query?.data as string | undefined;
  const swal = useContext(swalContext);
  const registered = useRef(false);

  const register = api.login.registerUser.useMutation();
  useEffect(() => {
    if (query && !registered.current) {
      console.log("here");
      registered.current = true;
      register.mutate(query, {
        onSuccess: (result) => {
          if (result.wasError) {
            swal({
              title: "Error",
              mainText: result.data,
              icon: "error",
              cancelButton: false,
            });
            void router.push("/");
          } else {
            localStorage.setItem("session", result.data);
            void router.push("/main");
          }
        },
      });
    }
  });
  return (
    <div className="d-flex flex-column container">
      <div
        className="row align-items-center justify-content-center
          min-vh-100"
      >
        <div className="col-12 col-md-8 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="fw-bold text-uppercase mb-2 text-center ">
                Escape Room
              </h2>
              <Image
                src="/images/logo.svg"
                alt="Brand"
                style={{
                  width: "5rem",
                  left: "calc(50% - 2.5rem)",
                  position: "relative",
                }}
              />
              <div className="mb-4">
                <h5>Registering Account</h5>
                <p className="mb-2">
                  Wait a second while we register your account. The page will
                  load once done
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
