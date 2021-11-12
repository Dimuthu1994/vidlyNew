import React, { useEffect } from "react";

function Logout(props) {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location = "/";
  }, []);
  return null;
}

export default Logout;
