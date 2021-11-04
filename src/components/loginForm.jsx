import React, { useState } from "react";
import Input from "./common/input";
import useForm from "./common/form";
import Joi from "joi-browser";

function LoginForm(props) {
  const [dataInit, setDataInit] = useState({ username: "", password: "" });
  let schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  const { validate, handleSubmit, handleChange, data, errors } = useForm({
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
        />

        <button
          disabled={validate()}
          className="btn btn-primary"
          onClick={doSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
