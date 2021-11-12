import React, { useState } from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import { login, getCurrentUser } from "../services/authService";

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
      await login(data.username, data.password);

      //props.history.push("/");
      //if we go to login page and login with valid username password
      //we get redirected to homepage hower we still see login and register page
      //but if we refresh the page problem goes away
      // in app component we get jswn webtoken from local storage
      // and decode it in component didmount this method call only once
      // during lifecycle of application

      //instead of histry we use fullreload
      const { state } = props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errorsNew = { ...errors };
        errorsNew.username = ex.response.data;
        setErrors(errorsNew);
      }
    }
  };
  if (getCurrentUser()) return <Redirect to="/" />;
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
