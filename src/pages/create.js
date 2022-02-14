import { React, useState } from "react";
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
  } catch (err) {
    console.error(err);
    return {};
  }
  return res.json();
};

/*
 * @param body {object} - The body of the request
 * has the following properties:
 *  - image_id {string} - The image_id of the vote to be created
 *  - sub_id {string} - The user_id of the user who is voting
 *  - value {integer} - The vote value to be created, can be 0 for down vote or can be 1 for up vote
 */
const createVote = async (body) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  try {
    const res = await fetch(`${process.env.API}/votes`, requestOptions);
    return await res.json();
  } catch (err) {
    console.error(err);
    return {};
  }
};

const Create = () => {
  const [vote, setVote] = useState(null);
  const handleCreate = async (event) => {
    event.preventDefault();
    const image_id = event.target.elements.image_id.value;
    const sub_id = event.target.elements.image_id.value;
    const voteValue = event.target.elements.voteValue.value;
    const res = await createVote({ image_id, sub_id, value: voteValue });

    setVote({
      vote_id: res.id,
      image_id,
      sub_id,
      value: voteValue,
    });
  };

  return (
    <div className="flex h-screen flex-col bg-opacity-80 bg-cat-pattern bg-[length:100px_100px] bg-clip-content bg-repeat">
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        <form
          className="mx-auto mt-10 flex w-96 flex-col justify-center rounded-3xl bg-sky-700 p-10"
          onSubmit={handleCreate}
        >
          <h2 className="mb-2 font-extrabold text-white">Create a new vote </h2>
          <label
            className="pl-15 m-2 flex flex-col text-white"
            htmlFor="image_id"
          >
            <span className="mb-2 font-bold">image_id</span>
            <input
              className="w-full appearance-none rounded border-2 border-black bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-gray-200 focus:bg-white focus:outline-none"
              type="text"
              name="image_id"
              id="image_id"
            />
          </label>

          <label
            className="pl-15 m-2 flex flex-col text-white"
            htmlFor="sub_id"
          >
            <span className="mb-2 font-bold">sub_id</span>
            <input
              className="w-full appearance-none rounded border-2 border-black bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-gray-200 focus:bg-white focus:outline-none"
              type="text"
              name="sub_id"
              id="sub_id"
            />
          </label>

          <label
            className="pl-15 m-2 flex flex-col text-white"
            htmlFor="voteValue"
          >
            <span className="mb-2 font-bold">Vote Value</span>
            <input
              className="w-full appearance-none rounded border-2 border-black bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-gray-200 focus:bg-white focus:outline-none"
              type="number"
              name="voteValue"
              id="voteValue"
              max="1"
              min="0"
            />
          </label>

          <input
            className="mt-6 cursor-pointer rounded-lg bg-gray-700 p-2 font-bold text-white hover:bg-gray-300 hover:text-gray-900"
            type="submit"
            name="submit"
            id="submit"
            value="Create"
          />
          {vote !== null ? (
            <h2 name="voteId" className="mt-2 font-bold text-white">
              Vote Id: {vote.vote_id}
            </h2>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Create;
