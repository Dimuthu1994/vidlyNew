import React, { useState } from "react";
import Joi from "joi-browser";

function useForm({ dataInit, schema }) {
  const [data, setData] = useState(dataInit);
  const [errors, setErrors] = useState({});

  let validate = () => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(data, schema, option);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  let validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemaProperty = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaProperty);
    return error ? error.details[0].message : null;
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    const errorsNew = validate();
    setErrors(errorsNew || {});
  };

  let handleChange = ({ currentTarget: input }) => {
    const dataNew = { ...data };
    dataNew[input.name] = input.value;
    setData(dataNew);

    const errorsNew = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errorsNew[input.name] = errorMessage;
    else delete errorsNew[input.name];
    setErrors(errorsNew);
  };

  return {
    handleSubmit,
    handleChange,
    validate,
    data,
    errors,
  };
}

export default useForm;
