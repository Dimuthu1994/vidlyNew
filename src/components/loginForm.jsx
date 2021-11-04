import React, { useState } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

function LoginForm(props) {
  const [account, setAccount] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  let schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    //call the server
    const errorsNew = validate();
    setErrors(errorsNew || {});

    console.log("submitted");
  };

  let handleChange = ({ currentTarget: input }) => {
    const accountNew = { ...account };
    accountNew[input.name] = input.value;
    setAccount(accountNew);
  };

  let validate = () => {
    const result = Joi.validate(account, schema, { abortEarly: false });

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={account.username}
          onChange={handleChange}
          error={errors.username}
        />

        <Input
          name="password"
          label="Password"
          value={account.password}
          onChange={handleChange}
          error={errors.password}
        />

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
