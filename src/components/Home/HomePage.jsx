import React from "react";
import { NavBar } from "./NavBar";
import { links } from "../../data/data";
import Hero from "./Hero";

const HomePage = () => {
  return (
    <div>
      <NavBar links={links} />
      <Hero />
    </div>
  );
};

export default HomePage;
