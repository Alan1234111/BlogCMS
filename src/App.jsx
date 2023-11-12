import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {AuthProvider} from "./components/AuthContext";

import Layout from "./components/Layout";
import Home, {loader as HomeLoader} from "./pages/Home";
import Login from "./pages/Login";
import NewPost, {loader as NewPostLoader} from "./pages/NewPost";
import EditPost, {loader as EditPostLoader} from "./pages/EditPost";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} loader={HomeLoader} />
      <Route path="/login" element={<Login />} />
      <Route path="/newpost" element={<NewPost />} loader={NewPostLoader} />
      <Route path="/posts/:id" element={<EditPost />} loader={EditPostLoader} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
