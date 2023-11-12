import styled from "styled-components";

export const StyledNewPost = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1fr;
  grid-template-rows: 100px 1fr;
  width: 95%;
  margin: 0 auto;

  .create-post {
    grid-column: 1/3;
    margin: 0 auto;
  }

  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 400px;
    height: 200px;
    z-index: 11;
    background-color: #e5e7eb;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  .popup h3 {
    margin-bottom: 1em;
  }

  .popup-btns a {
    margin: 1em 0.4em 0;
    appearance: none;
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

  .popup-btns a.next {
    background-color: #2ea44f;
  }

  .popup-btns a.back {
    background-color: #ef4444;
  }

  .wall {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 0.3;
    z-index: 10;
  }
`;
