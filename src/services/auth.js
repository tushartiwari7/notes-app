import { needAxios } from "./needAxios";

export const loginHandler = async (userCreds) => {
  const { data, status } = await needAxios(
    "POST",
    "/api/auth/login",
    userCreds
  );
  return { user: data.foundUser, token: data.encodedToken, status };
};

export const signupHandler = async (userCreds) => {
  const { data, status } = await needAxios(
    "POST",
    "/api/auth/signup",
    userCreds
  );
  return { user: data.createdUser, token: data.encodedToken, status };
};
