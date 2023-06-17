import React, { useState } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import Layout1 from "../components/Layout1";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { USER_API } from "../constants/const";
import Loader from "../components/Loader";

function SignIn() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const data = await axios(`${USER_API}/signIn`, {
        method: "POST",
        data: login,
      });
      if (data.status == 200) {
        localStorage.setItem(
          "movieDb",
          JSON.stringify({
            token: data?.data?.accesstoken,
            email: data?.data?.email,
          })
        );
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };

  const handleInputChange = (e) => {
    setLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Layout1 headingLabel="Sign in to your account">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" autoComplete="off">
          <div>
            <Label htmlFor="email" labelText="Email address" />
            <Input
              id="email"
              name="email"
              state={login.email}
              handleChange={handleInputChange}
              type="email"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" labelText="password" />
              <div className="text-sm">
                <Link
                  to="/forgotPassword"
                  className="font-semibold text-violet-600 hover:text-violet-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              handleChange={handleInputChange}
            />
          </div>

          <div>
            <Button type="button" btnLable="Sign in" onClick={handleLogin} />
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link
            to="/signup"
            href="#"
            className="font-semibold leading-6 text-violet-600 hover:text-violet-500">
            Sign up
          </Link>
        </p>
      </div>
      <div>
        <Toaster />
      </div>
    </Layout1>
  );
}

export default SignIn;
