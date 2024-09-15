import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

function LoginFailed({text}: {text: string}) {
  return (
    <>
      <div className="fixed w-full top-0">
        <Navbar />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
          {text}
        </h1>
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}

export default LoginFailed;
