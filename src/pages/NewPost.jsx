import { Form } from "react-router-dom";
import { StyledPostForm } from "../components/styles/PostForm.styled";
import { useEffect, useState } from "react";

export default function NewPost() {
  const [tags, setTags] = useState(null);
  const [message, setMessage] = useState("");

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

    fetchTags();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: formData,
      });
      console.log("Post created successfully");
      setMessage("Post created successfully");
    } catch (err) {
      console.error("Error creating the post", err);
      setMessage("Error creating the post");
    }
  };

  return (
    <StyledPostForm>
      <h2>New Post</h2>
      <span>{message && message}</span>
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
