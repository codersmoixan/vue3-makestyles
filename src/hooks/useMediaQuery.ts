import {onMounted, ref, onUnmounted, reactive, Ref} from "vue";
import useTheme from "./useTheme";
import {isUndefined} from "../utils/helper";
import {isFunction} from "../utils/helper";
import {isString} from "../utils/helper";
import type { Theme } from "../types/index.types";

const useMediaQuery = (queryInput: (theme: Theme) => any): Ref<boolean> => {
  const supportMatchMedia = window && !isUndefined(window.matchMedia);
  const matchMedia = supportMatchMedia ? window.matchMedia : null;

  const theme = useTheme();

  const mediaMatch = isFunction(queryInput) ? queryInput(theme) : queryInput;
  let query = isString(mediaMatch) ? mediaMatch : mediaMatch.query;
  query = query.replace(/^@media( ?)/m, "");

  const match = ref<boolean>(false);
  const active = ref<boolean>(true);

  if (!matchMedia) {
    match.value = false;
    return match;
  }

  const queryList = matchMedia?.(query);

  const updateMatch = () => {
    if (!active.value) return false;

    match.value = queryList.matches;
  };

  onMounted(() => {
    active.value = true;

    if (!supportMatchMedia) return;
    updateMatch();
    queryList.addEventListener("change", updateMatch);
  });

  onUnmounted(() => {
    active.value = false;
    queryList.removeEventListener("change", updateMatch);
  });

  return match;
};

export default useMediaQuery;