import axios from "axios";

export const needAxios = async (method, url, body) => {
  const token = localStorage.getItem("token");
  try {
    const { data, status } = await axios({
      method,
      url,
      data: body,
      headers: {
        authorization: token ?? "",
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
