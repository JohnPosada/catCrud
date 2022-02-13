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
    body: JSON.stringify(body),
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

  const handleDelete = async () => {
    const res = await deleteVote();
    setDeletedVote(vote);
  };

  useEffect(async () => {
    const votes = await getVotes();
    setVotes(votes);
  }, []);

  return (
    <div className="flex flex-col pl-10">
      <Navbar />
      <form onSubmit={handleDelete}>
        <label htmlFor="image_id">
          image_id
          <input type="text" name="image_id" id="image_id" />
        </label>
        <select name="select">
          {votes.map(({ id }) => {
            return (
              <option key={id} value={id}>
                {id}
              </option>
            );
          })}
        </select>
      </form>
      {/* <div>{vote.vote_id}</div> */}
    </div>
  );
};

export default Delete;
