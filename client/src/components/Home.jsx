import React from "react";
import Blogs from "./Blogs";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-4xl font-bold mb-5">Blog Home</h1>
      <div className="flex items-center mb-5 justify-end">
        <Link to={`form/`}>
          <Button outline gradientDuoTone="purpleToPink" className="">
            Create
          </Button>
        </Link>
      </div>
      <Blogs />
    </div>
  );
};

export default Home;
