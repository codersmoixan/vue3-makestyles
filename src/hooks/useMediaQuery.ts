import * as Vue from "vue";
import useTheme from "./useTheme";
import { isUndefined, isFunction, isString } from "../utils/helper";
import type * as Styles from "../types/index.types";

const useMediaQuery = (queryInput: (theme: Styles.Theme) => any): Vue.Ref<boolean> => {
  const supportMatchMedia = window && !isUndefined(window.matchMedia);
  const matchMedia = supportMatchMedia ? window.matchMedia : null;

  const theme = useTheme();

  const mediaMatch = isFunction(queryInput) ? queryInput(theme) : queryInput;
  let query = isString(mediaMatch) ? mediaMatch : mediaMatch.query;
  query = query.replace(/^@media( ?)/m, "");

  const match = Vue.ref<boolean>(false);
  const active = Vue.ref<boolean>(true);

  if (!matchMedia) {
    match.value = false;
    return match;
  }

  const queryList = matchMedia?.(query);

  const updateMatch = () => {
    if (!active.value) { return false; }

    match.value = queryList.matches;
  };

  Vue.onMounted(() => {
    active.value = true;

    if (!supportMatchMedia) { return; }
    updateMatch();
    queryList.addEventListener("change", updateMatch);
  });

  Vue.onUnmounted(() => {
    active.value = false;
    queryList.removeEventListener("change", updateMatch);
  });

  return match;
};

export default useMediaQuery;
