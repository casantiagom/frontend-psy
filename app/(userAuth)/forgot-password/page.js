"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext.js";

const Page = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("failed to reset");
    }
    setLoading(false);
  }

  return (
    <>
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage: "url(../../static/images/register_bg_2.png)",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">Login</h6>
                      {error && (
                        <div
                          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                          role="alert"
                        >
                          <span className="font-medium">Error!</span> {error}
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          ref={emailRef}
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          disabled={loading}
                          style={{ transition: "all .15s ease" }}
                        >
                          Reset Password
                        </button>
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                            style={{ transition: "all .15s ease" }}
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            Remember me
                          </span>
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 ">
                  <div className="w-1/2 z-40">
                    <Link href="/login" className="text-gray-300">
                      Log in
                    </Link>
                  </div>
                  <div className="w-1/2 text-right z-40">
                    <Link href="/signup" className="text-gray-300">
                      Create new account
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
