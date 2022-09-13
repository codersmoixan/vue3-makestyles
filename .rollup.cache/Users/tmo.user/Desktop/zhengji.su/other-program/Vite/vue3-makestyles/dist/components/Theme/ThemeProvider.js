import { defineComponent, provide } from "vue";
export default defineComponent({
    name: "ThemeProvider",
    props: {
        theme: {
            type: Object,
        },
    },
    setup: function (props, _a) {
        var slots = _a.slots;
        provide("theme", props.theme);
        return function () { return slots.default && slots.default(props.theme); };
    },
});
//# sourceMappingURL=ThemeProvider.js.map