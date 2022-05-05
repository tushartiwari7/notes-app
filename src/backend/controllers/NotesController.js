import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to Notes are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all notes in the db.
 * send GET Request at /api/notes
 * */

export const getAllNotesHandler = function (schema, request) {
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
  return new Response(200, {}, { notes: user.notes });
};

/**
 * This handler handles creating a new note
 * send POST Request at /api/notes
 * body contains {note}
 * */

export const createNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { note } = JSON.parse(request.requestBody);
    const newNote = {
      ...note,
      _id: uuid(),
      tags: note.tags ?? [],
      priority: note.priority ?? "",
      isPinned: note.isPinned ?? false,
    };
    user.notes.push(newNote);
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { note: newNote });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles creating a new note
 * send DELETE Request at /api/notes/:noteId
 * */

export const deleteNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const noteId = request.params.noteId;
    user.notes = user.notes.filter((item) => item._id !== noteId);
    this.db.users.update({ _id: user._id }, user);
    return new Response(200, {}, { notes: user.notes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles updating a note
 * send POST Request at /api/notes/:noteId
 * body contains {note}
 * */

export const updateNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { note } = JSON.parse(request.requestBody);
    const { noteId } = request.params;

    const noteIndex = user.notes.findIndex((note) => note._id === noteId);
    if (noteIndex !== -1)
      user.notes[noteIndex] = { ...user.notes[noteIndex], ...note };

    const archiveIndex = user.archives.findIndex((note) => note._id === noteId);
    if (archiveIndex !== -1)
      user.archives[archiveIndex] = { ...user.archives[archiveIndex], ...note };
    this.db.users.update({ _id: user._id }, user);

    return new Response(
      201,
      {},
      { note: user.notes[noteIndex] ?? user.archives[archiveIndex] }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles archiving a note
 * send POST Request at /api/notes/archive/:noteId
 * body contains {note}
 * */

export const archiveNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
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
    const archivedNote = user.notes.filter((note) => note._id === noteId)[0];
    user.notes = user.notes.filter((note) => note._id !== noteId);
    user.archives.push({ ...archivedNote });
    this.db.users.update({ _id: user._id }, user);
    return new Response(
      201,
      {},
      { archives: user.archives, notes: user.notes }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
