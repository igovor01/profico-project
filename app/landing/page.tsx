"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";

const Landing = () => {
  const { push } = useRouter();
  const handleLoginClick = () => {
    push("/login");
  };

  const handleSignupClick = () => {
    push("/signup");
  };
  return (
    <div className="bg-orange-50 flex h-screen overflow-hidden justify-center">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md p-16 space-y-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800">
            Browse, Categorize, Rate and Review Books
          </h1>
          <p className="font-semibold text-gray-600">Welome to greatReads</p>
          <div className="space-x-5">
            <button
              onClick={handleLoginClick}
              className="px-8 py-3 text-white bg-yellow-500 rounded hover:bg-yellow-600"
            >
              Login
            </button>
            <button
              onClick={handleSignupClick}
              className="px-8 py-3 text-white bg-yellow-800 rounded hover:bg-yellow-900"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 hidden bg-cover bg-center md:block">
        <Image
          src="/assets/images/pic.jpg"
          alt="Landing Image"
          width={800}
          height={1200}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Landing;
