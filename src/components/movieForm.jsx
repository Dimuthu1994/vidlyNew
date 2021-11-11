import React, { useEffect, useState } from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";
import SelectGenre from "./common/selectGenre";
import { getGenres } from "../services/genreService";
import { saveMovie, getMovie } from "../services/movieService";

function MovieForm({ match, history }) {
  const dataInit = {
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  };

  const [genres, setGenres] = useState([]);

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

  async function getMovieFromDB() {
    try {
      const movieId = match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      const dataStored = mapToViewModel(movie);
      setData(dataStored);
    } catch (error) {
      if (error.response && error.response.status === 404)
        history.replace("/not-found");
    }
  }

  async function getDataFromDB() {
    const { data } = await getGenres();
    setGenres(data);
  }

  useEffect(() => {
    getDataFromDB();
    getMovieFromDB();
  }, []);

  let doSubmit = async () => {
    //call the server
    await saveMovie(data);
    console.log("submitted");
    history.push("/movies");
  };

  return (
    <div>
      <h1>MovieForm</h1>

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
