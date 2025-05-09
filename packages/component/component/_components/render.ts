import type { PropType, Slots, VNodeTypes } from "vue";

import { normalizeProps } from "@layui/component/utils";
import { defineComponent } from "vue";

type RenderFunc = (props: Record<string, unknown>) => VNodeTypes;

export type Render = string | RenderFunc;

export default defineComponent({
  name: "LayRender",
  inheritAttrs: false,
  props: {
    render: {
      type: [String, Function] as PropType<Render>,
    },
    slots: {
      type: Object as PropType<Slots>,
    },
  },
  setup(props, ctx) {
    return () => {
      if (typeof props.render === "string") {
        return (props.slots)?.[props.render]?.(normalizeProps(ctx.attrs));
      }
      return (props.render as RenderFunc)(normalizeProps(ctx.attrs));
    };
  },
});
