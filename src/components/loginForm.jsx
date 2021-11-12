import React, { useState } from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";
import { login } from "../services/authService";

function LoginForm(props) {
  const [dataInit, setDataInit] = useState({ username: "", password: "" });
  let schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  const { handleSubmit, handleChange, data, errors, validate, setErrors } =
    Form({
      dataInit,
      schema,
    });

  let doSubmit = async () => {
    //call the server
    try {
      const { data: jwt } = await login(data.username, data.password);
      localStorage.setItem("token", jwt);
      props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errorsNew = { ...errors };
        errorsNew.username = ex.response.data;
        setErrors(errorsNew);
      }
    }
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
