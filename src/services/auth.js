import { needAxios } from "./needAxios";

export const loginHandler = async (userCreds) => {
  const { data, status } = await needAxios(
    "POST",
    "/api/auth/login",
    userCreds
  );
  localStorage.setItem("token", data.encodedToken);
  return { user: data.foundUser, token: data.encodedToken, status };
};

export const signupHandler = async (userCreds) => {
  const { data, status } = await needAxios(
    "POST",
    "/api/auth/signup",
    userCreds
  );
  localStorage.setItem("token", data.encodedToken);
  return { user: data.createdUser, token: data.encodedToken, status };
};
