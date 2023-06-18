import { useEffect, useState } from "react";
import { MOVIE_LIST_URL } from "../constants/const";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import FilterMovie from "../components/FilterMovie";
import usePagination from "../hooks/usePagination";

const MovieList = () => {
  const [movieList, setMovieList] = useState([{}]);
  const [filterEnable, setFilterEnable] = useState(false);

  const { pagination, setTotalPage, pageNo } = usePagination({
    pageNo: 1,
    pageSize: 4,
    totalPage: "",
  });

  useEffect(() => {
    getMovieList();
  }, [pagination.pageNo, pagination.totalPage]);

  const getMovieList = async () => {
    const response = await axios(
      `${MOVIE_LIST_URL}page=${pagination.pageNo}&pageSize=${pagination.pageSize}`
    );
    setMovieList(response?.data?.data);
    setTotalPage(response.data.totalPage);
  };

  return (
    <div className=" bg-gray-700 min-h-screen">
      <FilterMovie
        movieList={setMovieList}
        setFilterEnable={setFilterEnable}
        getMovieList={getMovieList}
      />
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
          <div className="join flex justify-center pb-4">{pageNo}</div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
