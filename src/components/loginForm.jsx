import React, { useState } from "react";
import Input from "./common/input";

function LoginForm(props) {
  const [account, setAccount] = useState({ username: "", password: "" });

  let handleSubmit = (e) => {
    e.preventDefault();
    //call the server
    console.log("submitted");
  };

  let handleChange = ({ currentTarget: input }) => {
    const accountNew = { ...account };
    accountNew[input.name] = input.value;
    setAccount(accountNew);
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
        />

        <Input
          name="password"
          label="Password"
          value={account.password}
          onChange={handleChange}
        />

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
