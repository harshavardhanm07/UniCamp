// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import { Alert, Button, Card, Spinner } from "flowbite-react";
// import { format } from "date-fns";

// const BlogDetails = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/blog/${id}`);
//         setBlog(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching blog:", error);
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Spinner aria-label="Loading..." />
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="max-w-3xl mx-auto mt-10">
//         <Alert color="failure">Blog not found</Alert>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto mt-10">
//       <div className="flex justify-end items-center mb-5">
//         <Button color="info" pill as={Link} to={`/blog/${blog._id}/edit`}>
//           Edit
//         </Button>
//       </div>
//       <Card>
//         {/* {blog.image && (
//           <img
//             src={blog.image}
//             alt={blog.title}
//             className="w-full h-64 object-cover mb-4"
//           />
//         )} */}
//         <div className="p-5">
//         <h1 className="text-3xl font-bold text-gray-800 mb-5">{blog.title}</h1>
//           <p className="text-sm text-gray-500 mb-2">
//             Category: <span className="text-gray-900">{blog.category}</span>
//           </p>
//           <p className="text-sm text-gray-500 mb-4">
//             Posted on:{" "}
//             <span className="text-gray-900">
//               {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
//             </span>
//           </p>
//           <div
//             className="text-gray-700 leading-relaxed"
//             dangerouslySetInnerHTML={{ __html: blog.content }}
//           />
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default BlogDetails;

import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PostPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

useEffect(() => {
  const fetchBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog:", error);
      setLoading(false);
    }
  };

  fetchBlog();
}, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-end items-center mb-5">
        <Button color="info" pill as={Link} to={`http://localhost:3000/blogs/blog/edit/${id}`}>
          Edit
        </Button>
      </div>
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Button color="gray" pill size="xs" className="mt-5 self-center">
        {post && post.category}
      </Button>
      {/* <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      /> */}
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
    </main>
  );
}
