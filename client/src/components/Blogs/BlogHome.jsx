import React from "react";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogItem from "./BlogItem";
import BASE_URL from "../../config";

const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/blog`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-4xl font-bold mb-5">Blog Home</h1>
      <div className="flex items-center mb-5 justify-end">
        <Link to={`create/`}>
          <Button outline gradientDuoTone="purpleToPink" className="">
            Create
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogItem key={blog._id} blog={blog} />
      ))}
    </div>

    </div>
  );
};

export default BlogHome;
