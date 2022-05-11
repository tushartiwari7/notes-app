import { needAxios } from "./needAxios";

export const moveToTrash = async (noteId) => {
  const { data, status } = await needAxios("POST", `/api/trash/add/${noteId}`);

  return { ...data, status };
};

export const restoreFromTrash = async (noteId) => {
  const { data, status } = await needAxios(
    "POST",
    `/api/trash/restore/${noteId}`
  );
  return { trash: data.trash, notes: data.notes, status };
};

export const restoreAll = async () => {
  const { data, status } = await needAxios("DELETE", `/api/trash/restoreAll`);
  return { notes: data.notes, status };
};

export const permanentlyDelete = async (noteId) => {
  const { data, status } = await needAxios(
    "DELETE",
    `/api/trash/delete/${noteId}`
  );
  return { trash: data.trash, status };
};
