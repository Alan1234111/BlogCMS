import styled from "styled-components";

export const StyledPostForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 1em;

  form {
    text-align: left;
    width: 95%;
    display: flex;
    flex-direction: column;
  }

  form input {
    margin: 0.5rem 0;
    padding: 0.2em 0.1em;
  }

  form div label {
    padding: 1em 0.3em 1em 0.1em;
  }

  button {
    appearance: none;
    background-color: #2ea44f;
    border: 1px solid rgba(27, 31, 35, 0.15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 6px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
    border: none;
  }

  .tags-container label {
    padding: 0.4em 0;
  }

  .tags-container {
    padding: 0.3em 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .tags-container select {
    padding: 0.5em 0.3em;
    font-size: 1rem;
  }
`;
