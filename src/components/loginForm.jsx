import React, { useState } from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";

function LoginForm(props) {
  const [dataInit, setDataInit] = useState({ username: "", password: "" });
  let schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  const { handleSubmit, handleChange, data, errors, validate } = Form({
    dataInit,
    schema,
  });

  let doSubmit = () => {
    //call the server
    console.log("submitted");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={data.username}
          onChange={handleChange}
          error={errors.username}
        />

        <Input
          name="password"
          label="Password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
          type={"password"}
        />

        <button
          onClick={doSubmit}
          disabled={validate()}
          className="btn btn-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
