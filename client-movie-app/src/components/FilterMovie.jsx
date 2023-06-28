import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { ALL_GENRE_API } from "../constants/const";

function FilterMovie({
  selectedGenres,
  filterGenre,
  selectedStar,
  filterStar,
}) {
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    getAllGenre();
  }, []);

  const getAllGenre = async () => {
    try {
      const response = await axios(ALL_GENRE_API);
      const { data } = response;
      const updatedGenre = data.map(({ genre, _id }) => ({
        value: _id,
        label: genre,
      }));
      setGenreList(updatedGenre);
    } catch (error) {
      console.log("Error while fetching genre list", error);
    }
  };

  const handleGenreChanges = (selectedOptions) => {
    filterGenre(selectedOptions);
  };

  const handleStar = (e) => {
    filterStar((prev) =>
      prev < parseInt(e.target.name) ? parseInt(e.target.name) : prev - 1
    );
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      const isChecked = i + 1 <= selectedStar;
      stars.push(
        <input
          key={`stars-${i}`}
          type="radio"
          name={i + 1}
          className={`mask mask-star-2 ${
            isChecked ? "!bg-orange-400" : "!bg-gray-400 opacity-25"
          }`}
          onClick={handleStar}
          checked={isChecked}
        />
      );
    }
    return stars;
  };
  return (
    <div className="flex justify-end items-center lg:mr-52 mr-4">
      <div className=" p-3 min-w-[350px] ">
        <label htmlFor="" className="label text-sm">
          Genre
        </label>
        <Select
          isMulti
          name="colors"
          options={genreList}
          value={selectedGenres}
          onChange={handleGenreChanges}
          className="basic-multi-select "
          classNamePrefix="select"
        />
      </div>
      <div className=" p-3">
        <label htmlFor="" className="label text-sm">
          Rating
        </label>
        <div className="rating">{renderStars()}</div>
      </div>
    </div>
  );
}

export default FilterMovie;
