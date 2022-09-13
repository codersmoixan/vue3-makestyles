import { Ref } from "vue";
import type { Theme } from "../types/index.types";
declare const useMediaQuery: (queryInput: (theme: Theme) => any) => Ref<boolean>;
export default useMediaQuery;
