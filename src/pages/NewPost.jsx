import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { StyledPostForm } from "../components/styles/PostForm.styled";

export default function NewPost() {
  const [tags, setTags] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/tags"
        );
        const result = await response.json();
        setTags(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    if (!token) {
      navigate("/login");
    } else {
      fetchTags();
    }
  }, [navigate, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      setMessage("You need to be logged in");
      return;
    }

    const formData = new FormData(event.target);

    try {
      await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      setMessage("Post created successfully");
    } catch (err) {
      console.error("Error creating the post", err);
      setMessage("Error creating the post");
    }
  };

  return (
    <StyledPostForm>
      <h2>New Post</h2>
      {message && <span>{message}</span>}
      <Form
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="text">Text:</label>
        <textarea
          name="text"
          id="text"
          cols="30"
          rows="10"
        ></textarea>

        <div>
          {tags &&
            tags.tags.map((tag, i) => (
              <div key={i}>
                <label htmlFor={i}>{tag.name}</label>
                <input
                  type="checkbox"
                  name="tag"
                  value={tag._id}
                  id={i}
                />
              </div>
            ))}
        </div>

        <label htmlFor="photo">Photo:</label>
        <input type="file" id="photo" name="photoUrl" />

        <button type="submit">Submit</button>
      </Form>
    </StyledPostForm>
  );
}
