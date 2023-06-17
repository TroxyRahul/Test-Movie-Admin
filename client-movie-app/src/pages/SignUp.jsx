import React, { useState } from "react";
import Layout1 from "../components/Layout1";
import { Link, useNavigate } from "react-router-dom";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { MOVIE_API_URL, USER_API } from "../constants/const";

function SignUp() {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    const response = await axios(`${USER_API}/signUp`, {
      method: "POST",
      data: signUpData,
    });
    console.log(
      "🚀 ~ file: SignUp.jsx:24 ~ handleSignUp ~ response:",
      response
    );
    if (response?.status == 200) {
      toast.success("Successfully completed. please Sign In now");
      navigate("/signin");
    }
  };

  const handleInputChange = (e) => {
    setSignUpData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Layout1 headingLabel="Sign up to your account">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3" action="#" method="POST" autoComplete="off">
            <div className="flex w-full gap-2">
              <div className="w-1/2">
                <Label htmlFor="firsName" labelText="First Name" />
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  handleChange={handleInputChange}
                  autoComplete="firstName"
                />
              </div>
              <div className="w-1/2">
                <Label htmlFor="lastName" labelText="Last Name" />
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  handleChange={handleInputChange}
                  autoComplete="lastName"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" labelText="Email address" />
              <Input
                id="email"
                name="email"
                type="email"
                handleChange={handleInputChange}
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" labelText="password" />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                handleChange={handleInputChange}
              />
            </div>

            <div>
              <Button type="button" btnLable="Sign Up" onClick={handleSignUp} />
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?
            <Link
              to="/signin"
              href="#"
              className="font-semibold leading-6 text-violet-600 hover:text-violet-500">
              Sign in
            </Link>
          </p>
        </div>
        {/* <div>
          <Toaster />
        </div> */}
      </Layout1>
    </div>
  );
}

export default SignUp;
