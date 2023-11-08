import { useState, useEffect } from "react";
import { StyledNewHome } from "../components/styles/Home.styled";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/posts"
        );
        const result = await response.json();
        setPosts(result.posts);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <StyledNewHome>
      {posts ? (
        posts.map((post) => (
          <div>
            <img
              src={`http://localhost:3000/${post.photoUrl}`}
              alt=""
            />
            <h2>{post.title}</h2>
            <Link to={`posts/${post._id}`}>Edit Post </Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </StyledNewHome>
  );
}
