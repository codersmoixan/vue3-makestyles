import { defineComponent } from "vue";
import useVisible from "../../hooks/useVisible";
import { isUndefined } from "../../utils/helper";

export default defineComponent({
  props: {
    xlUp: {
      type: Boolean,
    },
    xlDown: {
      type: Boolean,
    },
    lgUp: {
      type: Boolean,
    },
    lgDown: {
      type: Boolean,
    },
    mdUp: {
      type: Boolean,
    },
    mdDown: {
      type: Boolean,
    },
    smUp: {
      type: Boolean,
    },
    smDown: {
      type: Boolean,
    },
    xsUp: {
      type: Boolean,
    },
    xsDown: {
      type: Boolean,
    },
  },
  setup(props, { slots }) {
    if (isUndefined(slots.default)) {
      throw new Error('Hidden child cannot be null')
    }

    const visible = useVisible(props);

    return () => !visible.value && slots.default?.();
  },
});
