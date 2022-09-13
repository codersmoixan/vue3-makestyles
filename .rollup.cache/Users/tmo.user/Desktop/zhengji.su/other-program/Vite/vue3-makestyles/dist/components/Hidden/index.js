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
    setup: function (props, _a) {
        var slots = _a.slots;
        if (isUndefined(slots.default)) {
            throw new Error('Hidden child cannot be null');
        }
        var visible = useVisible(props);
        return function () { var _a; return !visible.value && ((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)); };
    },
});
//# sourceMappingURL=index.js.map