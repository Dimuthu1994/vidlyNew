import React from "react";

function Like({ onToggle, liked }) {
  let classes = " fa fa-heart";
  if (!liked) classes += "-o";
  return (
    <i
      onClick={onToggle} //component ekn data yawanawa parent ekn update karanwa
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    ></i>
  );
}

export default Like;
