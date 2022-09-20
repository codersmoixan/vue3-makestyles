import { ref } from "vue";
import {
  filterKeys,
  findMatchKey,
  matchThreshold,
} from "../utils/theme/helper";
import { isUndefined } from "../utils/helper";
import useMediaQuery from "./useMediaQuery";
import type { Theme } from "../types/index.types";
import type { matchThresholdKey } from "../types/hidden.types";

const useVisible = (props: object) => {
  const isHide = ref<boolean>(true)

  const matchKeys = filterKeys(
    Object.keys(matchThreshold),
    findMatchKey(props)
  )?.[0] as matchThresholdKey;

  const match = matchThreshold[matchKeys];

  if (isUndefined(match)) {
    return isHide
  }

  return useMediaQuery((theme: Theme) => {
    return (theme.breakpoints as any)[match.query](match.key);
  });
};

export default useVisible;
