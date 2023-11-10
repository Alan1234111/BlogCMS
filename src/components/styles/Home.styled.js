import styled from "styled-components";

export const StyledNewHome = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 10px;

  .post {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 300px;
    padding: 2em;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .post img {
    width: 100%;
    height: 70%;
    object-fit: cover;
  }

  .post h2 {
    font-size: 1rem;
    margin-top: 1em;
  }

  .post a,
  .post .delete-btn {
    appearance: none;
    margin-top: 1em;
    margin-right: 1em;
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

  .post a {
    background-color: #2ea44f;
  }

  .post .delete-btn {
    background-color: #ef4444;
  }
`;
