"use client";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

const Page = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <>
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div className="absolute top-0 w-full h-full  bg-bg_user bg-center bg-cover">
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={currentUser && currentUser.photoURL}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "150px" }}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <Link
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        href="/quiz"
                        style={{ transition: "all .15s ease" }}
                      >
                        Take Quiz
                      </Link>
                      <Link
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        href="/ranking"
                        style={{ transition: "all .15s ease" }}
                      >
                        Take Ranking
                      </Link>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2">
                    {currentUser && currentUser.displayName}
                  </h3>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nulla sollicitudin accumsan pharetra. Nullam eu congue
                        arcu, vel euismod felis. Morbi erat sapien, finibus non
                        leo at, pharetra semper odio. Vestibulum aliquam semper
                        varius. Pellentesque rutrum eros lectus, quis tristique
                        ipsum sollicitudin lobortis. Pellentesque vel.
                      </p>
                    </div>
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
