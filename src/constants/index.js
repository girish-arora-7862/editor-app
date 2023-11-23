export const LS_EDITOR = "raw-data";

export const STYLES = ["BOLD", "RED", "CODE", "UNDERLINE"];

export const STYLE_MAP = {
  RED: {
    color: "red",
  },
  CODE: {
    color: "dodgerblue",
  },
};

export const PREFIX_STYLES = [
  {
    prefix: "# ",
    font: "header-one",
  },
  {
    prefix: "* ",
    style: "BOLD",
  },
  {
    prefix: "** ",
    style: "RED",
  },
  {
    prefix: "*** ",
    style: "UNDERLINE",
  },
  {
    prefix: "``` ",
    font: "CODE",
    style: "CODE",
  },
];
