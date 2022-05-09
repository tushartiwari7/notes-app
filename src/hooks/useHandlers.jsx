import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/Context";
import {
  moveToArchive,
  moveToTrash,
  permanentlyDelete,
  restoreAll,
  restoreFromArchive,
  restoreFromTrash,
  updateNote,
} from "../services";

export const useHandlers = () => {
  const { setAllTags, setUser } = useUser();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [priority, setPriority] = useState("");

  const updateNoteHandler = async ({ textContent, themeColor, _id }) => {
    let [title, ...content] = textContent.split(`\n`);
    // sometimes the first line is empty when user starts typing from second line. so weare moving the first line to second line
    if (title === "" && content.length) {
      title = content[0];
      content = content.slice(1);
    }
    const contentString = content.join("\r\n");
    const { note } = await updateNote({
      title,
      content: contentString,
      themeColor,
      tags,
      _id,
    });
    setUser((user) => ({
      ...user,
      notes: user.notes.map((node) => (node._id === _id ? note : node)),
    }));
  };

  const updateNoteColorHandler = async (_id, color, setColor) => {
    const { note } = await updateNote({
      themeColor: color,
      _id,
    });
    setUser((user) => ({
      ...user,
      notes: user.notes.map((node) => (node._id === _id ? note : node)),
    }));
    setColor(color);
  };

  const updateNoteTagsHandler = async (tag, isRemove = false, _id) => {
    const { note } = await updateNote({
      tags: isRemove ? tags.filter((prev) => prev !== tag) : [...tags, tag],
      _id,
    });
    setUser((user) => ({
      ...user,
      notes: user.notes.map((node) => (node._id === _id ? note : node)),
    }));
    setTags(note.tags);
    setAllTags((tags) => [...tags, tag]);
  };

  const updateNotePriorityHandler = async (priority, _id) => {
    const { note } = await updateNote({
      priority,
      _id,
    });

    setUser((user) => ({
      ...user,
      notes: user.notes.map((node) => (node._id === _id ? note : node)),
    }));
    setPriority(priority);
  };

  const moveToArchivesHandler = async (id) => {
    const { archives, notes, status } = await moveToArchive(id);
    setUser((user) => ({
      ...user,
      notes,
      archives,
    }));
    if (status === 200) navigate("/?showOnly=archived");
  };

  const removeFromArchiveHandler = async (id) => {
    const { archives, notes, status } = await restoreFromArchive(id);
    setUser((user) => ({
      ...user,
      notes,
      archives,
    }));
    if (status === 200) navigate("/");
  };

  const moveToTrashHandler = async (id) => {
    const { trash, notes, status } = await moveToTrash(id);
    setUser((user) => ({
      ...user,
      notes,
      trash,
    }));
    if (status === 200) navigate("/?showOnly=trashed");
  };

  const permanentlyDeleteHandler = async (id) => {
    const { trash } = await permanentlyDelete(id);
    setUser((user) => ({
      ...user,
      trash,
    }));
  };

  const restoreFromTrashHandler = async (id) => {
    const { trash, notes, status } = await restoreFromTrash(id);
    setUser((user) => ({
      ...user,
      notes,
      trash,
    }));
    if (status === 200) navigate("/");
  };

  const restoreAllHandler = async () => {
    const { notes, status } = await restoreAll();
    setUser((user) => ({
      ...user,
      notes,
      trash: [],
    }));
    if (status === 200) navigate("/");
  };

  return {
    tags,
    setTags,
    priority,
    setPriority,
    updateNoteHandler,
    updateNoteTagsHandler,
    updateNoteColorHandler,
    updateNotePriorityHandler,
    moveToArchivesHandler,
    removeFromArchiveHandler,
    moveToTrashHandler,
    permanentlyDeleteHandler,
    restoreFromTrashHandler,
    restoreAllHandler,
  };
};
