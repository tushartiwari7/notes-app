import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import "./Login.css";
import { useUser } from "../../context/Context";
import { loginHandler } from "../../services";
const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [userCreds, setUserCreds] = useState({ email: "", password: "" });

  const togglePasswordType = () =>
    setPasswordType(passwordType === "password" ? "text" : "password");

  const { setUser } = useUser();
  const navigate = useNavigate();
  const login = async (details) => {
    const resp = await loginHandler(details);
    setUser((prev) => ({
      ...prev,
      ...resp.user,
      token: resp.token,
      isLoggedIn: true,
    }));
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userCreds);
  };

  return (
    <form className="flex flex-col login-form" onSubmit={handleSubmit}>
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
          type="submit"
        >
          Log in
        </button>
        <button
          className="btn btn-outline-primary full-width p-xs rounded-s my-sm fs-m"
          type="button"
          onClick={() =>
            login({ email: "guestuser@gmail.com", password: "guestUser123" })
          }
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
