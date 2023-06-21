import { SiThemoviedatabase } from "react-icons/si";
import { BsSearch, BsBell } from "react-icons/bs";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";

const Header = () => {
  return (
    <div className="navbar bg-gray-900 fixed z-10">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <HiOutlineMenuAlt1 className="h-5 w-5" />
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <Link to="/">
            <li className=" hover:bg-violet-600 flex items-center">
              <RiDashboardLine className="h-12 w-12" /> Home
            </li>
          </Link>
          <Link to="movie">
            <li className="px-8 py-4 hover:bg-violet-600 flex items-center gap-3">
              <AiOutlineAppstoreAdd className="h-12 w-12" />
              Add Movie
            </li>
          </Link>
          <Link to="genre">
            <li className="px-8 py-4 hover:bg-violet-600 flex items-center gap-3">
              <BsListCheck className="h-12 w-12" />
              Genre
            </li>
          </Link>
        </ul>
      
      </div>
      <div className="flex-1">
        {/* <a className="btn btn-ghost normal-case text-xl"> */}
        <Link to="/" className="normal-case text-xl">
          <SiThemoviedatabase className="h-14 w-14 ml-10 text-violet-500 p-1 hover:bg-violet-700 hover:bg-opacity-50 hover:rounded-lg" />
        </Link>
        {/* </a> */}
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <BsSearch className="h-5 w-5" />
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <BsBell className="h-5 w-5" />

            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
