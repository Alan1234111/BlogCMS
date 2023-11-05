import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewPost, {action as newPostAction} from "./pages/NewPost";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/newpost" element={<NewPost />} action={newPostAction} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
