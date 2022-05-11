import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Trash  are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all trash notes in the db.
 * send GET Request at /api/trash
 * */

export const getAllTrashedNotesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  return new Response(200, {}, { trash: user.trash });
};

/**
 * ----------------------------------------------------------------------------------------------------------
 * This handler handles adds note to trash.
 * send POST Request at /api/trash/add/:noteId
 * */

export const moveToTrashHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }

  const { noteId } = request.params;
  const { notes, trash, archives } = user;
  let note = notes.find((note) => note._id === noteId);
  if (note) {
    user.notes = notes.filter((note) => note._id !== noteId);
  } else {
    note = archives.find((note) => note._id === noteId);
    user.archives = archives.filter((note) => note._id !== noteId);
  }
  user.trash = [...trash, note];
  this.db.users.update({ _id: user._id }, user);
  return new Response(
    200,
    {},
    { trash: user.trash, notes: user.notes, archives: user.archives }
  );
};

/**
 * ----------------------------------------------------------------------------------------------------------
 * This handler handles deletes note from user notes.
 * send DELETE Request at /api/trash/delete/:noteId
 * */

export const deleteFromTrashHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const { noteId } = request.params;
  user.trash = user.trash.filter((note) => note._id !== noteId);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { trash: user.trash });
};

/**
 * This handler handles restoring the trash notes to user notes.
 * send POST Request at /api/trash/restore/:noteId
 * */

export const restoreFromTrashHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const { noteId } = request.params;
  const restoredNote = user.trash.find((note) => note._id === noteId);
  user.trash = user.trash.filter((note) => note._id !== noteId);
  user.notes.push({ ...restoredNote });
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { trash: user.trash, notes: user.notes });
};

export const restoreAllHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  user.notes.push(...user.trash);
  user.trash = [];
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { trash: user.trash, notes: user.notes });
};
