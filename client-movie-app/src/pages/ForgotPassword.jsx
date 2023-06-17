import { useState } from "react";
import Layout1 from "../components/Layout1";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { USER_API } from "../constants/const";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import useLoader from "../hooks/useLoader";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState();
  const { showLoader, setShowLoader } = useLoader();

  const handleInputChange = (e) => {
    setMail(e.target.value);
  };

  const handleSubmitBtn = async () => {
    try {
      if (mail) {
        setShowLoader(true);
        const data = await axios(
          "http://localhost:3456/api/user/forgotPassword",
          {
            method: "POST",
            data: { mail },
          }
        );
        if (data.status === 200) {
          setShowLoader(false);
          toast.success(
            "Your reset code has been sent successfully, Plese check your inbox"
          );
          navigate("/resetPassword");
        } else if (data.status === 400) {
          toast.error("Failed to send reset code!");
        }
      } else {
        toast.error("Enter mail address!");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <Layout1 headingLabel="Forgot Password">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" autoComplete="off">
          <div>
            <Label htmlFor="email" labelText="Email address" />
            <Input
              id="email"
              name="email"
              state={mail}
              handleChange={handleInputChange}
              type="email"
            />
          </div>

          <div>
            <Button
              type="button"
              btnLable="Send Mail"
              onClick={handleSubmitBtn}
            />
          </div>
        </form>
      </div>
      <div>
        {showLoader && <Loader/>}
      </div>
    </Layout1>
  );
};

export default ForgotPassword;
