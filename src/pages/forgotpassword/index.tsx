"use client";
import React from "react";
import Image from "react-bootstrap/Image";

export default function ForgotPassword() {
    return (
        <div className="container d-flex flex-column">
            <div
                className="row align-items-center justify-content-center
          min-vh-100"
            >
                <div className="col-12 col-md-8 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="fw-bold mb-2 text-center text-uppercase ">
                                Escape Room
                            </h2>
                            <Image
                                src="./images/logo.svg"
                                alt="Brand"
                                style={{
                                    width: "5rem",
                                    left: "calc(50% - 2.5rem)",
                                    position: "relative",
                                }}
                            />
                            <div className="mb-4">
                                <h5>Forgot Password?</h5>
                                <p className="mb-2">
                                    Enter your registered email ID to reset the
                                    password
                                </p>
                            </div>
                            <form>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter Your Email"
                                        required={true}
                                    />
                                </div>
                                <div className="mb-3 d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Reset Password
                                    </button>
                                </div>
                                <span>
                                    {"Don't have an account? "}
                                    <a href="../">sign in</a>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
