import { useEffect, useState } from "react";
import {
  MOVIE_PAGINATION_FILTER_URL,
  NOTIFICATION_API,
} from "../constants/const";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import FilterMovie from "../components/FilterMovie";
import usePagination from "../hooks/usePagination";

const MovieList = () => {
  const [movieList, setMovieList] = useState([{}]);
  const { pagination, setTotalPage, pageNo } = usePagination({
    pageNo: 1,
    pageSize: 4,
    totalPage: "",
  });

  const [selectedGenres, setSelectedGenred] = useState([]);
  const [filterStar, setFilterStar] = useState(0);

  useEffect(() => {
    getMovieList();
  }, [pagination.pageNo, pagination.totalPage, selectedGenres, filterStar]);

  useEffect(() => {
    const eventSource = new EventSource(NOTIFICATION_API);
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data != null) {
        getMovieList();
      }
    };
    return () => {
      eventSource.close();
    };
  }, []);

  const getMovieList = async () => {
    const response = await axios(
      `${MOVIE_PAGINATION_FILTER_URL}page=${pagination.pageNo}&pageSize=${pagination.pageSize}`,
      {
        method: "POST",
        data: { selectedGenres, filterStar },
      }
    );
    setMovieList(response?.data?.movieList);
    setTotalPage(response?.data?.totalPage);
  };

  return (
    <div className=" bg-gray-700 min-h-screen">
      <FilterMovie
        selectedGenres={selectedGenres}
        filterGenre={setSelectedGenred}
        selectedStar={filterStar}
        filterStar={setFilterStar}
      />
      <div className="p-10 flex gap-5 flex-wrap justify-center h-[600px] max-h-[600px] overflow-y-scroll">
        {movieList?.map((item) => (
          <MovieCard
            key={item._id}
            data={item}
            movielist={movieList}
            watchlater={true}
          />
        ))}
      </div>
      <div>
        <div className="join flex justify-center pb-4">{pageNo}</div>
      </div>
    </div>
  );
};

export default MovieList;
