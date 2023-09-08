import React from "react";

const Hero = () => {
  return (
    <div className="md:px-[200px] w-screen h-[91vh] flex flex-col gap-12 justify-center items-center text-center">
      <h1 className="font-semibold leading-snug text-7xl">
        One platform to streamline <br /> all workflows
      </h1>
      <p className="text-xl leading-snug">
        Your all-in-one platform to manage projects, organize work, enhance
        <br />
        collaboration and accelerate execution across all departments.
      </p>
      <button className="px-5 py-3 duration-300 ease-in bg-teal-200 rounded-md hover:bg-teal-400">
        Get Started
      </button>
    </div>
  );
};

export default Hero;
