import { defineComponent } from "vue";
import useVisible from "../../hooks/useVisible";
import { isUndefined } from "../../utils/helper";

export default defineComponent({
  props: {
    xlUp: Boolean,
    xlDown: Boolean,
    lgUp: Boolean,
    lgDown: Boolean,
    mdUp: Boolean,
    mdDown: Boolean,
    smUp: Boolean,
    smDown: Boolean,
    xsUp: Boolean,
    xsDown: Boolean,
  },
  setup(props, { slots }) {
    if (isUndefined(slots.default)) {
      throw new Error('Hidden child cannot be null')
    }

    const visible = useVisible(props);

    return () => !visible.value && slots.default?.();
  },
});
