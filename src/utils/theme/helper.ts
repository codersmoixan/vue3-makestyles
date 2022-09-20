import type { MatchThreshold } from "../../types/hidden.types";

export const matchThreshold: MatchThreshold = {
  xlUp: { query: "up", key: "xl" },
  xlDown: { query: "down", key: "xl" },
  lgUp: { query: "up", key: "lg" },
  lgDown: { query: "down", key: "lg" },
  mdUp: { query: "up", key: "md" },
  mdDown: { query: "down", key: "md" },
  smUp: { query: "up", key: "sm" },
  smDown: { query: "down", key: "sm" },
  xsUp: { query: "up", key: "xs" },
  xsDown: { query: "down", key: "xs" },
};

export const filterKeys = (keys: string[], propsKeys: string[]): string[] =>
  keys.filter((i) => propsKeys.some((j) => j === i));

export const findMatchKey = (props: any): string[] => {
  const keys: string[] = [];

  for (const key in props) {
    if (props[key]) {
      keys.push(key);
    }
  }

  return keys;
};
