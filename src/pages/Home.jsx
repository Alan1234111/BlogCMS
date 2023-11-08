import { useState, useEffect } from "react";
import { StyledNewHome } from "../components/styles/Home.styled";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export async function loader() {
  const response = await fetch("http://localhost:3000/api/posts");
  const postData = await response.json();

  return postData.posts;
}

export default function Home() {
  const posts = useLoaderData();
  console.log(posts);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    // Check for the presence of a token and navigate if it doesn't exist.
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate, token]);

  return (
    <StyledNewHome>
      {posts.map((post) => (
        <div key={post._id}>
          <img
            src={`http://localhost:3000/${post.photoUrl}`}
            alt=""
          />
          <h2>{post.title}</h2>
          <Link to={`posts/${post._id}`}>Edit Post</Link>
        </div>
      ))}
    </StyledNewHome>
  );
}
