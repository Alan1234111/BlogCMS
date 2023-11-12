import {useState, useEffect} from "react";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../components/AuthContext";
import FormComponent from "../components/FormComponent";

export async function loader({params}) {
  const post = await fetch(`http://localhost:3000/api/posts/${params.id}`);
  const tags = await fetch("http://localhost:3000/api/tags");

  const resPost = await post.json();
  const resTags = await tags.json();

  return {post: resPost.post, tags: resTags.tags};
}

export default function EditPost() {
  let {id} = useParams();
  const {post, tags} = useLoaderData();
  const {authenticated} = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState(post.title || "");
  const [displayTag, setDisplayTag] = useState(post.tag.name || "");
  const [content, setContent] = useState(post.text || "");
  const [isPublished, setIsPublished] = useState(post.isPublished || false);
  const [showPopup, setShowPopup] = useState(false);
  const [filePreview, setFilePreview] = useState(`http://localhost:3000/${post.photoUrl}` || "https://images.unsplash.com/photo-1682686580224-cd46ea1a6950?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

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

    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "POST",
        headers: {Authorization: `Bearer ${token}`},
        body: formData,
      });

      if (res.ok) {
        setShowPopup(true);
      }
    } catch (err) {
      console.error("Error editing the post", err);
      setShowPopup(false);
    }
  };

  return authenticated ? <FormComponent title={title} setTitle={setTitle} content={content} setContent={setContent} displayTag={displayTag} setDisplayTag={setDisplayTag} filePreview={filePreview} handleFileChange={handleFileChange} tags={tags} isPublished={isPublished} setIsPublished={setIsPublished} handleSubmit={handleSubmit} showPopup={showPopup} isNewPost={false} /> : <p>You Need to Be logged In</p>;
}
