import {useEffect, useState} from "react";
import {Form, useNavigate} from "react-router-dom";
import {StyledPostForm} from "../components/styles/PostForm.styled";
import {useAuth} from "../components/AuthContext";

export default function NewPost() {
  const {authenticated} = useAuth();
  const [tags, setTags] = useState(null);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token || !authenticated) {
      navigate("/login");
    }

    async function fetchTags() {
      try {
        const response = await fetch("http://localhost:3000/api/tags");
        const result = await response.json();
        setTags(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchTags();
  }, [authenticated]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("jwt");

    if (!token || !authenticated) {
      setMessage("You need to be logged in");
      return;
    }

    const formData = new FormData(event.target);

    try {
      await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {Authorization: `Bearer ${token}`},
        body: formData,
      });

      setMessage("Post created successfully");
    } catch (err) {
      console.error("Error creating the post", err);
      setMessage("Error creating the post");
    }
  };

  return authenticated ? (
    <StyledPostForm>
      <h2>New Post</h2>
      {message && <span>{message}</span>}
      <Form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="text">Text:</label>
        <textarea name="text" id="text" cols="30" rows="10"></textarea>

        <div>
          {tags &&
            tags.tags.map((tag, i) => (
              <div key={i}>
                <label htmlFor={i}>{tag.name}</label>
                <input type="checkbox" name="tag" value={tag._id} id={i} />
              </div>
            ))}
        </div>

        <label htmlFor="photo">Photo:</label>
        <input type="file" id="photo" name="photoUrl" />

        <button type="submit">Submit</button>
      </Form>
    </StyledPostForm>
  ) : (
    <p>You Need to Be logged In</p>
  );
}
