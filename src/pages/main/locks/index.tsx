"use client";
import React from "react";
import Lock from "../../../components/main/locks/lock";

export default function Locks() {
  return (
    <>
      <h2 className="fw-bold text-uppercase mb-2 text-center ">Locks</h2>
      <Lock
        openCallback={() => {
          alert();
        }}
        combination={"3576"}
        title="TES"
      />
      <Lock
        openCallback={() => {
          alert();
        }}
        combination={"0000"}
        title="TES"
      />
    </>
  );
}
