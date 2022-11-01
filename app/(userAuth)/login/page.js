"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext.js";

const Page = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, signInGoogle, currentUser, signInWithGoogle } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      console.log(error);
      setError("failed to log in");
    }
    setLoading(false);
  }

  async function googleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
      history.push("/");
    } catch {
      console.log(error);
      //  setError("failed to log in with google");
    }
    setLoading(false);
  }

  return (
    <>
      <main>
        {console.log(currentUser)}
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
                        <div className="flex flex-col items-center">
                          <button
                            type="button"
                            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                            onClick={googleSubmit}
                          >
                            <svg
                              className="mr-2 -ml-1 w-4 h-4"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fab"
                              data-icon="google"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 488 512"
                            >
                              <path
                                fill="currentColor"
                                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                              ></path>
                            </svg>
                            Sign in with Google
                          </button>
                        </div>
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

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          ref={passwordRef}
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
                          Log In
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
                    <Link href="/forgot-password" className="text-gray-300">
                      Forgot password?
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
