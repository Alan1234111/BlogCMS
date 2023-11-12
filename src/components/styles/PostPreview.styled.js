import styled from "styled-components";

export const StyledPostPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  word-wrap: break-word;
  width: 100%;
  height: 85vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
  font-family: "Poppins", sans-serif;

  .information {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    word-wrap: break-word;
    width: 90%;
    text-align: center;
  }

  .main-img {
    width: 100%;
    object-fit: cover;
    height: 400px;
  }

  .information button {
    margin: 1em 0;
  }

  .information h2 {
    margin: 0.1em 0;
    font-size: 1.8rem;
    font-weight: bold;
  }

  .information p {
    margin: 0.3em 0 0.8em;
    font-size: 0.9rem;
  }

  .content {
    text-align: left;
    margin-top: 1em;
    width: 70%;
  }

  .content img {
    width: 100%;
    margin: 0.2em 0;
  }
`;
