import axios from "axios";

export const needAxios = async (method, url, body) => {
  try {
    const { data, status } = await axios({
      method,
      url,
      data: body,
      headers: {
        authorization: localStorage.getItem("token") ?? "",
      },
    });
    return { data, status };
  } catch (err) {
    console.log(err);
    return {
      data: err.response.data,
      status: err.response.status,
    };
  }
};
