import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../Components/Logo/Logo";
import SignIn from "../../Components/PageAccount/SignIn/SignIn";
import SignUp from "../../Components/PageAccount/SignUp/SignUp";
import "./Account.css";

function Account({ type }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.root.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    {
      type === "SignIn"
        ? (document.title = "Sign In")
        : (document.title = "Sign Up");
    }
  }, [type]);

  return (
    <div className="h-screen w-screen relative">
      <img
        src="/loginBg.jpg"
        alt=""
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 ">
        <div className="relative w-full h-full flex items-center justify-center ">
          <div className="absolute lg:left-20 md:left-10 top-5 md:block hidden">
            <Logo />
          </div>
          {type === "SignIn" ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
}

export default Account;
