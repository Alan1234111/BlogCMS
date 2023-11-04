import {Form} from "react-router-dom";
import {StyledNewPost} from "../components/styles/NewPost.styled";

export default function NewPost() {
  return (
    <StyledNewPost>
      <h2>New Post</h2>
      <Form>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" />
        <label htmlFor="text">Text:</label>
        <textarea name="" id="text" cols="30" rows="10"></textarea>

        <div>
          <label htmlFor="1">Adventure</label>
          <input type="checkbox" name="tag" value="adventure" id="1" />
          <label htmlFor="2">Tech</label>
          <input type="checkbox" name="tag" id="2" />
          <label htmlFor="3">Travel</label>
          <input type="checkbox" name="tag" id="3" />
          <label htmlFor="4">Travel</label>
          <input type="checkbox" name="tag" id="4" />
          <label htmlFor="5">Travel</label>
          <input type="checkbox" name="tag" id="5" />
        </div>

        <label htmlFor="photo">Photo:</label>
        <input type="file" id="photo" />

        <button type="submit">Submit</button>
      </Form>
    </StyledNewPost>
  );
}
