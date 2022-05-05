import { needAxios } from "./needAxios";

export const createNew = async () => {
  const { data, status } = await needAxios("POST", "/api/notes", {
    note: { title: "", content: "", themeColor: "" },
  });
  return { note: data.note, status };
};

export const updateNote = async (note) => {
  const { data, status } = await needAxios("POST", `/api/notes/${note._id}`, {
    note,
  });
  return { note: data.note, status };
};
