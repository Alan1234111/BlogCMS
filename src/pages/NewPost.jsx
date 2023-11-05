import {Form} from "react-router-dom";
import {StyledNewPost} from "../components/styles/NewPost.styled";
import {useEffect, useState} from "react";

export async function action({request}) {
  const formData = await request.formData();
  const title = formData.get("title");
  const text = formData.get("text");
  // const tag = formData.getAll("tag");
  const photoUrl = formData.get("photoUrl");

  const postData = {
    title: title,
    text: text,
    photoUrl: photoUrl,
  };

  try {
    await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {"Content-Type": "application/json"},
    });
  } catch (err) {
    console.error(err);
  }

  return null;
}

export default function NewPost() {
  const [tags, setTags] = useState(null);

  useEffect(() => {
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
  }, []);

  return (
    <StyledNewPost>
      <h2>New Post</h2>
      <Form method="POST" encType="multipart/form-data">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="text">Text:</label>
        <textarea name="text" id="text" cols="30" rows="10"></textarea>

        <div>
          {tags &&
            tags.tags.map((tag, i) => (
              <div key={i}>
                <label htmlFor={i}>{tag.name}</label>
                <input type="checkbox" name="tag" value={tag.name} id={i} />
              </div>
            ))}
        </div>

        <label htmlFor="photo">Photo:</label>
        <input type="file" id="photo" name="photoUrl" />

        <button type="submit">Submit</button>
      </Form>
    </StyledNewPost>
  );
}
