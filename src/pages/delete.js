import { React, useEffect, useState } from "react";
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
const deleteVote = async (vote_id) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
    mode: "cors",
  };
  try {
    const res = await fetch(
      `${process.env.API}/votes/${vote_id}`,
      requestOptions
    );
    return await res.json();
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

const Delete = () => {
  const [deletedVote, setDeletedVote] = useState({});
  const [votes, setVotes] = useState([]);
  const [selectedVote, setSelectedVote] = useState("");

  const handleDelete = async () => {
    event.preventDefault();
    const res = await deleteVote(selectedVote);
    console.log(res);
    // setDeletedVote();
  };

  const handleSelectVote = (event) => {
    setSelectedVote(event.target.value);
  };

  useEffect(async () => {
    const votes = await getVotes();
    setVotes(votes);
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <form
        className="mx-auto mt-10 flex w-96 flex-col justify-center rounded-3xl bg-sky-700 p-10"
        onSubmit={handleDelete}
      >
        <label className="pl-15 m-2 flex flex-col text-white" htmlFor="select">
          <span className="mb-2 font-bold">Select a vote to delete it</span>
          <select
            className="w-full rounded border-2 border-black bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-gray-200 focus:bg-white focus:outline-none"
            name="select"
            id="select"
            onChange={handleSelectVote}
          >
            {votes.map(({ id }) => {
              return (
                <option key={id} value={id}>
                  {id}
                </option>
              );
            })}
          </select>
        </label>
        <input
          className="mt-6 cursor-pointer rounded-lg bg-gray-700 p-2 font-bold text-white hover:bg-gray-300 hover:text-gray-900"
          type="submit"
          name="submit"
          id="submit"
          value="Delete"
        />
      </form>
    </div>
  );
};

export default Delete;
