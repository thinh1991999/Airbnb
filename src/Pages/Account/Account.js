import SignIn from "../../Components/PageAccount/SignIn/SignIn";
import SignUp from "../../Components/PageAccount/SignUp/SignUp";
import "./Account.css";

function Account({ type }) {
  return (
    <div className="h-screen w-screen relative">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/airbnb-4989d.appspot.com/o/loginBg.jpg?alt=media&token=0f49e770-058c-4f47-980b-004624bc0968"
        alt=""
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        {type === "SignIn" ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
}

export default Account;
