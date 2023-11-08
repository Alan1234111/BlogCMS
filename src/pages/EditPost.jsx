import { useState, useEffect } from "react";
import { useLoaderData, Form, useNavigate } from "react-router-dom";
import { StyledPostForm } from "../components/styles/PostForm.styled";

export async function loader({ params }) {
  const postData = await fetch(
    `http://localhost:3000/api/posts/${params.id}`
  );
  return postData;
}

export default function EditPost() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  const [tags, setTags] = useState(null);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: data.post.title || "",
    text: data.post.text || "",
    tag: data.post.tag || [],
    photoUrl: data.post.photoUrl || "",
  });

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

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;

    setFormData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          [name]: [...prevData[name], value],
        };
      } else {
        return {
          ...prevData,
          [name]: prevData[name].filter((tagId) => tagId !== value),
        };
      }
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

      setMessage("Post edited successfully");
    } catch (err) {
      console.error("Error editing the post", err);
      setMessage("Error editing the post");
    }
  };

  return (
    <StyledPostForm>
      <h2>Edit Post</h2>
      {message && <span>{message}</span>}
      <Form
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <label htmlFor="text">Text:</label>
        <textarea
          name="text"
          id="text"
          cols="30"
          rows="10"
          value={formData.text}
          onChange={handleInputChange}
        ></textarea>

        <div>
          {tags ? (
            tags.tags.map((tag, i) => (
              <div key={i}>
                <label htmlFor={i}>{tag.name}</label>
                <input
                  type="checkbox"
                  name="tag"
                  value={tag._id}
                  id={i}
                  checked={formData.tag.includes(tag._id)}
                  onChange={handleCheckboxChange}
                />
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <label htmlFor="photo">Photo:</label>
        <input
          type="file"
          id="photo"
          name="photoUrl"
          onChange={handleInputChange}
        />

        <button type="submit">Submit</button>
      </Form>
    </StyledPostForm>
  );
}
