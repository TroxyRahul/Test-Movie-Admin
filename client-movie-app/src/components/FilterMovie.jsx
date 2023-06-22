import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

function FilterMovie({ movieList, setFilterEnable, getMovieList }) {
  const [genreList, setGenreList] = useState([{}]);
  const [selectedGenres, setSelectedGenred] = useState([]);
  const [filterStar, setFilterStar] = useState(0);
  

  useEffect(() => {
    getAllGenre();
  }, []);

  useEffect(() => {
    if (selectedGenres.length != 0 || filterStar > 0) {
      filterList();
      setFilterEnable(true);
    } else {
      setFilterEnable(false);
      getMovieList();
    }
  }, [selectedGenres, filterStar]);

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
    setSelectedGenred(selectedOptions);
  };

  const filterList = async () => {
    const data = await axios("http://localhost:3456/api/movie/filter", {
      method: "POST",
      data: { selectedGenres, filterStar },
    });
    console.log("🚀 ~ file: FilterMovie.jsx:42 ~ filterList ~ data:", data);
    movieList(data?.data);
  };

  const handleStar = (e) => {
    setFilterStar((prev) =>
      prev < parseInt(e.target.name) ? parseInt(e.target.name) : prev - 1
    );
  };

  const star = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <input
          type="radio"
          name={i + 1}
          className="mask mask-star-2 bg-orange-400"
          onClick={handleStar}
          checked={i + 1 === filterStar}
        />
      );
    }

    if (filterStar === 0) {
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
