import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { USER_API } from "../constants/const";
import usePagination from "../hooks/usePagination";
import { MdInfo } from "react-icons/md";

const WatchLater = () => {
  const [watchLater, setWatchLater] = useState([{}]);
  const { pagination, setTotalPage, pageNo } = usePagination({
    pageNo: 1,
    pageSize: 4,
    totalPage: "",
  });

  useEffect(() => {
    getAllWatchLaterMovies();
  }, [pagination.pageNo, pagination.totalPage]);

  const getAllWatchLaterMovies = async () => {
    const movieDb = JSON.parse(localStorage.getItem("movieDb"));
    const datas = await axios(
      `${USER_API}watchlist?page=${pagination.pageNo}&pageSize=${pagination.pageSize}`,
      {
        method: "GET",
        headers: { Authorization: movieDb.token },
      }
    );
    const { data, totalPage } = datas?.data;
    setWatchLater(data);
    setTotalPage(totalPage);
  };

  return (
    <div>
      <div>
        <div className=" bg-white">
          <div className="p-20 flex gap-5 flex-wrap justify-center h-[600px] max-h-[600px] overflow-hidden">
            {watchLater.length != 0 ? (
              watchLater?.map((item) => (
                <MovieCard key={item._id} data={item} watchlater={false} />
              ))
            ) : (
              <div className="alert">
                <MdInfo className="stroke-info shrink-0 w-6 h-6 text-blue-400" />
                <span>Not added any movies to watch later list</span>
              </div>
            )}
          </div>
          <div>
            <div className="join flex justify-center p-5">{pageNo}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchLater;
