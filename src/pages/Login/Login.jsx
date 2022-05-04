import { useState } from "react";
import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import "./Login.css";
const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [userCreds, setUserCreds] = useState({ email: "", password: "" });

  const togglePasswordType = () =>
    setPasswordType(passwordType === "password" ? "text" : "password");

  return (
    <form className="flex flex-col login-form">
      <h3 className="h2 fw-regular">Welcome Back</h3>
      <div className="full-width ">
        <label className={`fs-s flex flex-col my-sm`}>
          Email
          <input
            type="text"
            placeholder="johnDoe@gmail.com"
            className="login_input input rounded-s full-width my-xs fs-s"
            value={userCreds.email}
            onChange={(e) =>
              setUserCreds({ ...userCreds, email: e.target.value })
            }
          />
        </label>
        <label className={`fs-s my-sm flex flex-col pos-rel`}>
          Password
          <input
            type={passwordType}
            placeholder="johnDoe123"
            className="login_input input rounded-s full-width my-xs fs-s"
            value={userCreds.password}
            onChange={(e) =>
              setUserCreds({ ...userCreds, password: e.target.value })
            }
          />
          {passwordType === "password" ? (
            <BsEye
              className="pos-abs eye-icon"
              size="2rem"
              onClick={togglePasswordType}
            />
          ) : (
            <BsEyeSlash
              className="pos-abs eye-icon"
              size="2rem"
              onClick={togglePasswordType}
            />
          )}
        </label>
      </div>
      <div className="full-width">
        <button
          className={`btn btn-primary full-width rounded-s p-xs fs-m`}
          // onClick={() => handlers.loginHandler(userCreds)}
        >
          Log in
        </button>
        <button
          className="btn btn-outline-primary full-width p-xs rounded-s my-sm fs-m"
          // onClick={() =>
          //   handlers.loginHandler({
          //     email: process.env.React_APP_TEST_EMAIL,
          //     password: process.env.React_APP_TEST_PASSWORD,
          //   })
          // }
        >
          Login as Guest
        </button>
      </div>
      <Link to="../signup" className="fs-s link">
        Don't have an account? Signup
      </Link>
    </form>
  );
};

export default Login;
