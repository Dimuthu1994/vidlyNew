import React, { useState } from "react";

function LoginForm(props) {
  const [account, setAccount] = useState({ username: "", password: "" });

  let handleSubmit = (e) => {
    e.preventDefault();
    //call the server
    console.log("submitted");
  };

  let handleChange = (e) => {
    const accountNew = { ...account };
    accountNew[e.currentTarget.name] = e.currentTarget.value;
    setAccount(accountNew);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            value={account.username}
            onChange={handleChange}
            name="username"
            id="username"
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={account.password}
            onChange={handleChange}
            name="password"
            id="password"
            type="text"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
