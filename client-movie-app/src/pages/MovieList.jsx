import { useEffect, useState } from "react";
import Header from "../components/Header";
import { MOVIE_API_URL } from "../constants/const";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import MultiSelectDropdown from "../components/FilterMovie";
import FilterMovie from "../components/FilterMovie";

const MovieList = () => {
  const [movieList, setMovieList] = useState([{}]);
  console.log("🚀 ~ file: MovieList.jsx:11 ~ MovieList ~ movieList:", movieList)
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 4,
    totalPage: "",
  });
  const [filterEnable, setFilterEnable] = useState(false);
  

  useEffect(() => {
    getMovieList();
  }, [pagination.pageNo]);


  const getMovieList = async () => {
    const response = await axios(
      `http://localhost:3456/api/movie/pagination?page=${pagination.pageNo}&pageSize=${pagination.pageSize}`
    );
    setMovieList(response?.data?.data);
    setPagination((prev) => ({
      ...prev,
      totalPage: response.data.totalPage,
    }));
  };


  const handlePagination = (e) => {
    setPagination((prev) => ({
      ...prev,
      pageNo: parseInt(e.target.getAttribute("aria-label")),
    }));
    //getMovieList();
  };

  const pageNo = [];
  for (let index = 0; index < pagination.totalPage; index++) {
    pageNo.push(
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label={index + 1}
        checked={index + 1 == pagination.pageNo}
        onClick={(e) => handlePagination(e)}
      />
    );
  }

  return (
    <div className=" bg-gray-700 min-h-screen">
      <FilterMovie movieList={setMovieList} setFilterEnable={setFilterEnable} getMovieList={getMovieList}/>
      <div className="p-10 flex gap-5 flex-wrap justify-center h-[600px] max-h-[600px] overflow-y-scroll">
        {movieList?.map((item) => (
          <MovieCard
            key={item._id}
            data={item}
            movielist={movieList}
            //setmovielist={setMovieList}
            watchlater={true}
          />
        ))}
      </div>
      <div>
        {!filterEnable && (
          <div className="join flex justify-center p-5">{pageNo}</div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
