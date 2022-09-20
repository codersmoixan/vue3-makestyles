import { defineComponent, provide } from "vue";
import type { PropType } from "vue";
import type { Theme } from "../../types/index.types";

export default defineComponent({
  name: "ThemeProvider",
  props: {
    theme: {
      type: Object as PropType<Theme>,
    },
  },
  setup(props, { slots }) {
    provide("theme", props.theme);

    return () => slots.default && slots.default(props.theme);
  },
});
