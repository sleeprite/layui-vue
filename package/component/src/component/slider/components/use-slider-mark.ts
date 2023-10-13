/*
 * @Author: baobaobao
 * @Date: 2023-10-11 19:50:26
 * @LastEditTime: 2023-10-13 09:34:24
 * @LastEditors: baobaobao
 */
import { computed, isVNode } from "vue";
import { Mark, SliderProps } from "../types/sliderType";

export const useSliderMark = (props: SliderProps) => {
  const marksList = computed(() => {
    if (!props.marks) {
      return [];
    }
    const getAllkeys = Object.keys(props.marks).map(parseFloat);
    const getMarkList = getAllkeys
      .sort((a, b) => a - b)
      .filter((item) => item >= props.min && item <= props.max)
      .map((pos): Mark => {
        let mark: any = {};
        if (
          typeof props.marks![pos] === "object" &&
          !isVNode(props.marks![pos])
        ) {
          const { label, style } = props.marks![pos];
          mark = {
            label,
            style,
            point: pos,
          };
        } else {
          mark = {
            label: props.marks![pos],
            point: pos,
          };
        }
        return {
          pos: ((pos - props.min) * 100) / (props.max - props.min),
          mark,
        };
      });
    return getMarkList;
  });
  const getSortMarks = computed(() => {
    if (!props.marks) {
      return [];
      
    }
    const getAllkeys = Object.keys(props.marks).map(parseFloat)
    getAllkeys.push(props.min, props.max)
    return getAllkeys.sort((a, b) => a - b)
  })
  return {
    marksList,
    getSortMarks
  };
};
