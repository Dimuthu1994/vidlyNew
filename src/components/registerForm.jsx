import React, { useState } from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";

function RoginForm(props) {
  const [dataInit, setDataInit] = useState({
    username: "",
    password: "",
    name: "",
  });
  let schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
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
      <h1>Register</h1>
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

        <Input
          name="name"
          label="Name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />

        <button
          onClick={doSubmit}
          disabled={validate()}
          className="btn btn-primary"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RoginForm;
