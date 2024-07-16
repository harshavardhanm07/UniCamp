import React from "react";
import { Badge, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const BlogItem = ({ blog }) => {
  return (
    <Card className="h-full">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold mb-2">
              {blog.title.split(" ").slice(0, 3).join(" ")} ...
            </h2>
            <Badge color="pink" size="md" className=" rounded-xl text-center">
              {blog.category}
            </Badge>
          </div>
          <div
            className="text-gray-800 mb-2"
            dangerouslySetInnerHTML={{
              __html: `${blog.content.substring(0, 100)}...`,
            }}
          />
        </div>
        <Link
          to={`blog/${blog._id}`}
          className="text-teal-600 mt-2 self-end no-underline hover:underline"
        >
          Read more
        </Link>
      </div>
    </Card>
  );
};

export default BlogItem;
