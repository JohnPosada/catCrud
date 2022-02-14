import { React, useState, useEffect } from "react";

const getCategories = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await fetch(`${process.env.API}/categories`, requestOptions);
    return await res.json();
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

const getCategoryImage = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await fetch(
      `${process.env.API}/images/search?category_ids=${id}`,
      requestOptions
    );
    const category = await res.json();
    return category[0].url;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryImage, setCategoryImage] = useState("");

  const handleSelectCategory = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleFindCategory = async (event) => {
    event.preventDefault();
    const url = await getCategoryImage(selectedCategory);
    setCategoryImage(url);
  };

  useEffect(async () => {
    const resCategory = await getCategories();
    setCategories(resCategory);
  }, []);

  return (
    <div className="flex h-screen flex-row bg-opacity-80 bg-cat-pattern bg-[length:100px_100px] bg-clip-content bg-repeat">
      <form
        className="mx-auto mt-10 flex h-52 w-96 flex-col justify-center rounded-3xl bg-sky-700 p-10"
        onSubmit={handleFindCategory}
      >
        <label className="pl-15 m-2 flex flex-col text-white" htmlFor="select">
          <span className="mb-2 font-bold">Select a category to find it</span>
          <select
            className="w-full rounded border-2 border-black bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-gray-200 focus:bg-white focus:outline-none"
            name="select"
            id="select"
            onChange={handleSelectCategory}
          >
            {categories.map(({ name, id }) => {
              return (
                <option key={id} value={id}>
                  {name}
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
          value="Find"
        />
      </form>

      {categoryImage !== "" ? (
        <div className="mx-auto mt-10 flex h-fit w-fit  max-w-2xl flex-row overflow-x-auto rounded-3xl bg-sky-700 p-10">
          <img src={categoryImage} alt="" className="ml-2 mb-2 max-h-full" />
        </div>
      ) : null}
    </div>
  );
};

export default Category;
