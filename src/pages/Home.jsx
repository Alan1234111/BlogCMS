import {useEffect} from "react";
import {StyledNewHome} from "../components/styles/Home.styled";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {useAuth} from "../components/AuthContext";

export async function loader() {
  const response = await fetch("http://localhost:3000/api/posts");
  const postData = await response.json();

  return postData.posts;
}

export default function Home() {
  const posts = useLoaderData();
  const navigate = useNavigate();
  const {authenticated} = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token || !authenticated) {
      navigate("/login");
    }
  }, [authenticated]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwt");

    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      navigate("/");
    }
  };

  return authenticated ? (
    <StyledNewHome>
      {posts.map((post) => (
        <div key={post._id} className="post">
          <img src={`http://localhost:3000/${post.photoUrl}`} alt="" />
          <h2>{post.title}</h2>
          <div className="action-btns">
            <Link to={`posts/${post._id}`}>Edit Post</Link>
            <button className="delete-btn" onClick={() => handleDelete(post._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </StyledNewHome>
  ) : (
    <p>You need to be logged in</p>
  );
}
