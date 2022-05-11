import { needAxios } from "./needAxios";

export const moveToArchive = async (noteId) => {
  const { data, status } = await needAxios(
    "POST",
    `/api/archives/add/${noteId}`
  );
  return { archives: data.archives, notes: data.notes, status };
};
export const restoreFromArchive = async (noteId) => {
  const { data, status } = await needAxios(
    "POST",
    `/api/archives/restore/${noteId}`
  );
  return { archives: data.archives, notes: data.notes, status };
};
