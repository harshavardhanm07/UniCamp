import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Button,
  FileInput,
  Select,
  TextInput,
  Spinner,
  Card,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BASE_URL from "../../config";


const BlogCreate = () => {
  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();
//   const [file, setFile] = useState(null);
  // const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    content: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [publishError, setPublishError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}/blog/${id}`,{withCredentials:true});
          setFormData(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching blog:", error);
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [id]);

//   const handleUploadImage = async () => {
//     try {
//       if (!file) {
//         setImageUploadError("Please select an image");
//         return;
//       }
//       setImageUploadError(null);
//       setFormData({ ...formData, image: URL.createObjectURL(file) });
//     } catch (error) {
//       setImageUploadError("Image upload failed");
//       console.error(error);
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = id
        ? await axios.post(`${BASE_URL}/blog/edit/${id}`, formData,{withCredentials:true})
        : await axios.post(`${BASE_URL}/blog/create`, formData,{withCredentials:true});

      console.log(response.data);
      setLoading(false);
      navigate("/blogs");
    } catch (error) {
      setPublishError("Something went wrong");
      setLoading(false);
      console.error(error);
    }
  };

  if (loading && id) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner aria-label="Loading..." />
      </div>
    );
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        {id ? "Update Post" : "Create a Post"}
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        {/* <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
          >
            Upload Image
          </Button>
        </div> */}
        {/* {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )} */}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          value={formData.content}
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          {id ? "Update" : "Publish"}
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default BlogCreate;
