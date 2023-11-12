import FormComponent from "../components/FormComponent";
import {useEffect, useState} from "react";
import {useLoaderData, useNavigate} from "react-router-dom";
import {useAuth} from "../components/AuthContext";

export async function loader() {
  const tags = await fetch("http://localhost:3000/api/tags");

  const resTags = await tags.json();

  return {tags: resTags.tags};
}

export default function NewPost() {
  const {tags} = useLoaderData();
  const navigate = useNavigate();
  const {authenticated} = useAuth();

  const [title, setTitle] = useState("Title");
  const [displayTag, setDisplayTag] = useState("Travel");
  const [content, setContent] = useState("Content");
  const [isPublished, setIsPublished] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [filePreview, setFilePreview] = useState("https://images.unsplash.com/photo-1682686580224-cd46ea1a6950?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token || !authenticated) {
      navigate("/login");
    }
  }, [authenticated]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Read the selected file and create a data URL
      const reader = new FileReader();

      reader.onloadend = () => {
        setFilePreview(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("jwt");

    if (!token || !authenticated) {
      setShowPopup(false);
      return;
    }

    const formData = new FormData(event.target);
    formData.append("text", content);
    formData.append("isPublished", isPublished);

    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {Authorization: `Bearer ${token}`},
        body: formData,
      });

      if (res.ok) {
        setShowPopup(true);
      }
    } catch (err) {
      console.error("Error creating the post", err);
      setShowPopup(false);
    }
  };

  return authenticated ? <FormComponent title={title} setTitle={setTitle} content={content} setContent={setContent} displayTag={displayTag} setDisplayTag={setDisplayTag} filePreview={filePreview} handleFileChange={handleFileChange} showPopup={showPopup} tags={tags} isPublished={isPublished} setIsPublished={setIsPublished} handleSubmit={handleSubmit} isNewPost={true} /> : <p>You Need to Be logged In</p>;
}
