import React, { useState } from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";
import { register } from "../services/userService";

function RegisterForm(props) {
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
  const { handleSubmit, handleChange, data, errors, validate, setErrors } =
    Form({
      dataInit,
      schema,
    });

  let doSubmit = async () => {
    //call the server
    try {
      const response = await register(data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      props.history.push("/");
    } catch (ex) {
      //mulinma balano postman ekan ekama data eka deparak yawwama
      // ena error eka
      // User is already register kila eno
      // enm api error object eka aran
      // error object eke username ekata response eke data eka danna ona
      // ita passe eka set karanna ona
      if (ex.response && ex.response.status === 400) {
        const errorsNew = { ...errors };
        errorsNew.username = ex.response.data;
        setErrors(errorsNew);
      }
    }
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

export default RegisterForm;
