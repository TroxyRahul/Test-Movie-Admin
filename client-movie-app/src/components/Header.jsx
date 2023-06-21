import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notification from "./Notification";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

function Header() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("movieDb")));
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("movieDb");
    navigate("/signin");
  };
  return (
    <div className="navbar bg-blue-950">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <HiOutlineMenuAlt1 className="h-5 w-5" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a>Watch Later</a>
            </li>
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          Movie List
        </Link>
      </div>

      <div className="navbar-end">
        <Notification />
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {data && (
              <li>
                <Link to={"/watchlater"}>Watch later</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          {data && (
            <a className="btn flex flex-col m-2" onClick={handleLogout}>
              <span> Log Out</span>{" "}
              <span className="text-xs lowercase">{data.email}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
