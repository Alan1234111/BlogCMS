import React from "react";
import {StyledLogin} from "../components/styles/Login.styled";
import {Form} from "react-router-dom";

export default function Login() {
  return (
    <StyledLogin>
      <h2>Login</h2>
      <Form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" />
        <button>Submit</button>
      </Form>
    </StyledLogin>
  );
}
