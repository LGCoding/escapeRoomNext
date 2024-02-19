"use client";
import { QrScanner } from "@yudiel/react-qr-scanner";
import React from "react";

export default function Qr() {
    return (
        <>
            <h2 className="fw-bold mb-2 text-center text-uppercase ">
                QR-Code
            </h2>
            <QrScanner
                onDecode={(result) => console.log(result)}
                onError={(error) => console.log(error?.message)}
            />
        </>
    );
}
