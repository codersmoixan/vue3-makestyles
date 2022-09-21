import * as Vue from "vue"
import makeStyles from "./makeStyles";
import type * as Styles from "../types/index.types";

function styled(component: Vue.DefineComponent) {
  const createStyleComponent = (style: Styles.StyleOrCreator) => {
    const componentProps = component.props
    const name = component.name

    const stylesOrCreator =
      typeof style === 'function'
        ? (theme: Styles.Theme, props: object = {}) => ({ root: style(theme, props) })
        : { root: style };

    const useStyles = makeStyles(stylesOrCreator, { name })

    return {
      props: {
        modelValue: null,
        ...componentProps
      },
      emits: ['input', 'update:modelValue'],
      setup(props: Vue.ExtractPropTypes<Styles.InitialObject>, { slots, attrs, emit }: Vue.SetupContext) {
        const classes = useStyles(props)

        return () => Vue.h(
          component,
          {
            value: props.modelValue,
            class: classes.root,
            ...props,
            ...attrs,
            onInput: (e: any) => {
              emit('update:modelValue', e.target.value)
              emit('input', e)
            }
          },
          slots
        )
      }
    }
  }

  return createStyleComponent
}

export default styled
