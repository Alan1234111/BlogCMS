import {StyledNewPost} from "./styles/NewPost.styled";
import {StyledPostForm} from "./styles/PostForm.styled";
import {StyledPostPreview} from "./styles/PostPreview.styled";
import {StyledTag} from "./styles/Tag.styled";
import {Form, Link} from "react-router-dom";
import {Editor} from "@tinymce/tinymce-react";
import DOMPurify from "dompurify";
import {useRef} from "react";

export default function FormComponent(props) {
  const editorRef = useRef(null);
  return (
    <StyledNewPost>
      <div className="create-post">
        <h2>{props.isNewPost ? "New Post" : "Edit Post"}</h2>
      </div>
      <StyledPostForm>
        {props.showPopup && (
          <>
            <div className="popup">
              <h3>{props.isNewPost ? "Post Created Sucessfuly" : "Post Edited Sucessfuly"}</h3>
              <div className="popup-btns">
                <Link to="/" className="back">
                  Back to home
                </Link>
                {props.isNewPost && (
                  <Link reloadDocument to="/newpost" className="next">
                    Create another Post
                  </Link>
                )}
              </div>
            </div>
            <div className="wall"></div>
          </>
        )}
        <Form method="POST" encType="multipart/form-data" onSubmit={props.handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={props.title} onChange={(e) => props.setTitle(e.target.value)} />
          <Editor
            name="text"
            apiKey={import.meta.env.VITE_API_EDITOR}
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={props.content}
            onEditorChange={(newContent) => props.setContent(newContent)}
            init={{
              height: 500,
              menubar: false,
              plugins: ["advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount"],
              toolbar: "undo redo | blocks | " + "bold italic forecolor | alignleft aligncenter " + "alignright alignjustify | bullist numlist outdent indent | " + "removeformat | help",
              content_style: "body { font-family:Poppins,Arial,sans-serif; font-size:14px }",
            }}
          />

          <div className="tags-container">
            <label htmlFor="tag">Tag:</label>
            <select type="select" placeholder="Select Tag" name="tag" required="true" id="tag" onChange={(e) => props.setDisplayTag(e.target.options[e.target.selectedIndex].text)}>
              {props.tags &&
                props.tags.map((tag, i) => (
                  <option key={i} value={tag._id} selected={props.displayTag === tag.name ? "selected" : false}>
                    {tag.name}
                  </option>
                ))}
            </select>
          </div>

          <label htmlFor="photo">Main Photo:</label>
          <input type="file" id="photo" name="photoUrl" onChange={props.handleFileChange} />

          <label htmlFor="isPublished">Set as Published:</label>
          <input
            type="checkbox"
            id="isPublished"
            checked={props.isPublished}
            onChange={(e) => {
              props.setIsPublished(!!e.target.checked);
            }}
          />

          <button type="submit">Submit</button>
        </Form>
      </StyledPostForm>

      <StyledPostPreview>
        <div className="information">
          <StyledTag>{props.displayTag}</StyledTag>
          <h2>{props.title}</h2>
          <p>01.01.2025 | by Sean Silverico</p>
        </div>
        <img className="main-img" src={props.filePreview} alt="Preview" />
        {props.content && <div className="content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.content)}} />}
      </StyledPostPreview>
    </StyledNewPost>
  );
}
