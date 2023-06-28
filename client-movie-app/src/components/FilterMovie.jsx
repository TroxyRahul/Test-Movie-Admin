import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

function FilterMovie({
  selectedGenres,
  filterGenre,
  selectedStar,
  filterStar
}) {
  const [genreList, setGenreList] = useState([{}]);

  useEffect(() => {
    getAllGenre();
  }, []);

  const getAllGenre = async () => {
    const data = await axios(`http://localhost:3456/api/genre`);
    const genreList = data?.data;
    const updatedGenre = genreList.map(({ genre, _id }) => ({
      value: _id,
      label: genre,
    }));
    setGenreList(updatedGenre);
  };

  const handleGenreChanges = (selectedOptions) => {
    filterGenre(selectedOptions);
  };


  const handleStar = (e) => {
    filterStar((prev) => (prev < parseInt(e.target.name) ? parseInt(e.target.name) : prev - 1 ));
  };

  const star = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <input
        key={`stars-${i}`}
          type="radio"
          name={i + 1}
          className="mask mask-star-2 bg-orange-400"
          onClick={handleStar}
          checked={i + 1 === selectedStar}
        />
      );
    }

    if (selectedStar === 0) {
      stars = stars.map((star, index) => {
        return (
          <input
            key={`star-${index}`}
            type="radio"
            name={index + 1}
            className="mask mask-star-2 bg-gray-400 opacity-25"
            onClick={handleStar}
            checked={false}
          />
        );
      });
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
        <div className="rating">{star()}</div>
      </div>
    </div>
  );
}

export default FilterMovie;
