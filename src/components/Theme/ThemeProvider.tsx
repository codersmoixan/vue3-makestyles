import * as Vue from "vue";
import type * as Styles from "../../types/index.types";

export default Vue.defineComponent({
  name: "ThemeProvider",
  props: {
    theme: {
      type: Object as Vue.PropType<Styles.Theme>,
    },
  },
  setup(props, { slots }) {
    Vue.provide("theme", props.theme);

    return () => slots.default && slots.default(props.theme);
  },
});
