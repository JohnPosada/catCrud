import { React, useState, useEffect } from "react";
import Navbar from "../layout/Navbar";

const getVotes = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await fetch(`${process.env.API}/votes`, requestOptions);
    return await res.json();
  } catch (err) {
    console.error(err);
    return {};
  }
};

/*
 * @param vote_id {string} - The id of the vote to delete
 */
const searchBreeds = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await fetch(`${process.env.API}/breeds`, requestOptions);
    return await res.json();
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

const searchBreedByName = async (name) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
  };
  try {
    // const res = await fetch(
    const res = await fetch(
      `${process.env.API}/breeds/search?q=${name}`,
      requestOptions
    );

    return await res.json();
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

const searchImageById = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(
      `${process.env.API}/images/search?breed_id=${id}&limit=1`,
      requestOptions
    );

    const breed = await res.json();
    return breed[0].url;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

const Search = () => {
  const [search, setSearch] = useState("");
  const [votes, setVotes] = useState([]);
  const [imagesBreed, setImagesBreed] = useState([]);

  const onChangeSearch = async (event) => {
    setSearch(event.target.value);
    const breeds = await searchBreedByName(search);
    const breedsId = breeds.map((breed) => {
      return breed.id;
    });

    const images = await breedsId.map(async (id) => {
      return await searchImageById(id);
    });

    setImagesBreed(await Promise.all(images));
  };

  // const handleSearch = async () => {
  //   setSearchVote(vote);
  // };

  // useEffect(async () => {
  //   const breeds = await searchBreeds();
  // }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row">
        <form className="mx-auto mt-10 flex w-96 flex-col justify-center rounded-3xl bg-sky-700 p-10">
          <label htmlFor="id_voto">
            <span className="mb-2 font-bold text-white">Breed name</span>
            <input
              className="w-full appearance-none rounded border-2 border-black bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-gray-200 focus:bg-white focus:outline-none"
              type="text"
              onChange={onChangeSearch}
              name="breed_name"
              id="breed_name"
            />
          </label>
          {/* <input
          className="mt-6 cursor-pointer rounded-lg bg-gray-700 p-2 font-bold text-white hover:bg-gray-300 hover:text-gray-900"
          type="submit"
          name="submit"
          id="submit"
          value="Search"
        /> */}
        </form>
        <div className="mx-auto mt-10 flex h-fit max-w-2xl flex-wrap justify-center rounded-3xl bg-sky-700 p-10">
          {imagesBreed.map((image, index) => {
            return (
              <img
                key={index}
                src={image}
                alt="not found"
                className="ml-2 mb-2 max-h-20"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
