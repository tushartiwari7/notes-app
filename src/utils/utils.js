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
