import * as Vue from "vue";
import {
  filterKeys,
  findMatchKey,
  matchThreshold,
} from "../utils/theme/helper";
import { isUndefined } from "../utils/helper";
import useMediaQuery from "./useMediaQuery";
import type * as Styles from "../types/index.types";

const useVisible = (props: Vue.ExtractPropTypes<Styles.InitialObject<boolean>>) => {
  const isHide = Vue.ref<boolean>(true)

  const matchKeys = filterKeys(
    Object.keys(matchThreshold),
    findMatchKey(props)
  )?.[0] as Styles.MatchThresholdKey;

  const match = matchThreshold[matchKeys] as { query: Styles.BreakpointsQueryHookKey, key: Styles.BreakpointsKey };

  if (isUndefined(match)) {
    return isHide
  }

  return useMediaQuery((theme: Styles.Theme) => (theme.breakpoints[match.query] as Styles.BreakpointsQueryHook)(match.key));
};

export default useVisible;
