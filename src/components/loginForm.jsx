import React from "react";

function LoginForm(props) {
  let handleSubmit = (e) => {
    e.preventDefault();

    //call the server
    console.log("submitted");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="text" className="form-control" />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
