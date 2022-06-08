export const themes = [
  {
    name: "Purple",
    hexCode: "#242038",
  },
  {
    name: "Prussian Blue",
    hexCode: "#0F172A",
  },
  {
    name: "Earle Black",
    hexCode: "#1b1b1e",
  },
  {
    name: "Maroon",
    hexCode: "#96031A",
  },
  {
    name: "Coffee Brown",
    hexCode: "#1C1917",
  },
];

export const debounce = (func, delay) => {
  let inDebounce;
  return (val) => {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(val), delay);
  };
};

export const filterByTags = (notes, filters) => {
  const ans = filters.tag
    ? notes.filter((note) => note.tags.includes(filters.tag))
    : notes;
  return ans;
};

export const filterByPriority = (notes, filters) => {
  if (!filters.priority) return notes;
  return notes.filter(
    (note) => note.priority.toLowerCase() === filters.priority.toLowerCase()
  );
};

export const sortByDate = (notes, filters) => {
  if (filters.sortBy) {
    if (filters.sortBy === "Latest")
      return notes.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    else if (filters.sortBy === "Oldest")
      return notes.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
  }
  return notes;
};

export const compose = (state, ...functions) => {
  return (filters) => {
    return functions.reduce((acc, fn) => {
      return fn(acc, filters);
    }, state);
  };
};
