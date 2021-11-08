import React, { useEffect, useState } from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";
import SelectGenre from "./common/selectGenre";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";

function MovieForm({ match, history }) {
  const dataInit = {
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  };

  const [genres, setGenres] = useState(getGenres());

  let schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .max(100)
      .min(0)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .max(10)
      .min(0)
      .label("Daily Rental Rate"),
  };
  const { handleSubmit, handleChange, data, errors, validate, setData } = Form({
    dataInit,
    schema,
  });

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  useEffect(() => {
    const movieId = match.params.id;
    if (movieId === "new") return;
    const movie = getMovie(movieId);
    if (!movie) return history.replace("/not-found");
    const dataStored = mapToViewModel(movie);
    setData(dataStored);
  }, []);

  let doSubmit = () => {
    //call the server
    saveMovie(data);
    console.log("submitted");
    history.push("/movies");
  };

  return (
    <div>
      <h1>MovieForm {match.params.id}</h1>

      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          label="Title"
          value={data.title}
          onChange={handleChange}
          error={errors.title}
        />

        <SelectGenre
          name="genreId"
          value={data.genreId}
          label="Genre"
          onChange={handleChange}
          options={genres}
          error={errors.genreId}
        />

        <Input
          name="numberInStock"
          label="Number in Stock"
          value={data.numberInStock}
          onChange={handleChange}
          error={errors.numberInStock}
        />

        <Input
          name="dailyRentalRate"
          label="Rate"
          value={data.dailyRentalRate}
          onChange={handleChange}
          error={errors.dailyRentalRate}
        />

        <button
          onClick={doSubmit}
          disabled={validate()}
          className="btn btn-primary"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default MovieForm;
