import React from "react";

function Input({ label, error, name, ...rest }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;

// function Input({ name, label, value, onChange, error, type = "text" }) {
//   return (
//     <div className="form-group">
//       <label htmlFor={name}>{label}</label>
//       <input
//         value={value}
//         name={name}
//         onChange={onChange}
//         type={type}
//         id={name}
//         className="form-control"
//       />
//       {error && <div className="alert alert-danger">{error}</div>}
//     </div>
//   );
// }
