import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Signup.css";
const Signup = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [userCreds, setUserCreds] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const togglePasswordType = () =>
    setPasswordType(passwordType === "password" ? "text" : "password");

  return (
    <form
      // onSubmit={(e) =>
      //   handlers.signupHandler(e, userCreds, location.state.from)
      // }
      className="flex flex-center flex-col rounded-s signup-form gap2"
    >
      <h3 className="h2 fw-light">Let's get Started</h3>
      <div className="full-width">
        <div className="flex full-width gap2">
          <label className="fs-s flex full-width flex-col">
            First Name
            <input
              type="text"
              required
              placeholder="John"
              className="input rounded-s px-sm py-xs full-width my-xs fs-s"
              value={userCreds.firstName}
              onChange={(e) =>
                setUserCreds({ ...userCreds, firstName: e.target.value })
              }
            />
          </label>
          <label className="fs-s flex flex-col pos-rel full-width">
            Last Name
            <input
              type="text"
              required
              placeholder="Doe"
              className="input rounded-s px-sm py-xs full-width my-xs fs-s"
              value={userCreds.lastName}
              onChange={(e) =>
                setUserCreds({ ...userCreds, lastName: e.target.value })
              }
            />
          </label>
        </div>
        <label className="fs-s my-sm flex flex-col">
          Email
          <input
            type="email"
            required
            placeholder="name@example.com"
            className="input rounded-s px-sm py-xs full-width my-xs fs-s"
            value={userCreds.email}
            onChange={(e) =>
              setUserCreds({ ...userCreds, email: e.target.value })
            }
          />
        </label>
        <label className="fs-s flex flex-col pos-rel my-sm">
          Password
          <input
            type={passwordType}
            required
            placeholder="johnDoe123"
            className="fs-s px-sm py-xs rounded-s full-width my-xs input"
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
          type="submit"
          className="btn btn-primary full-width rounded-s p-sm fs-s"
        >
          Sign Up
        </button>
        <Link to="../login" className="fs-s link py-sm">
          Already have an account? Login
        </Link>
      </div>
    </form>
  );
};

export default Signup;
