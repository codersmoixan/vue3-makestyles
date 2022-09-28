import * as Vue from "vue";
import type { PropType } from "vue";
import type { Theme } from "../../types/theme.types";

export default Vue.defineComponent({
  name: "ThemeProvider",
  props: {
    theme: {
      type: Object as PropType<Theme>,
    },
  },
  setup(props, { slots }) {
    Vue.provide("theme", props.theme);

    return () => slots.default && slots.default(props.theme);
  },
});
