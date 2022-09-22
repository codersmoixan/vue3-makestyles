import * as Vue from "vue"
import makeStyles from "./makeStyles";
import type * as Styles from "../types/index.types";

function styled<Props extends Styles.InitialObject>(component: any, targetProps?: Vue.ExtractPropTypes<Props>) {
  const createStyledComponent = (styles: Styles.StyleOrCreator, options: Styles.MakeStylesOptions = {}) => {
    const componentProps = component.props
    const name = component.name

    const stylesOrCreator =
      typeof styles === 'function'
        ? (theme: Styles.Theme, props: Vue.ExtractPropTypes<Styles.InitialObject> = {}) => ({ root: styles(theme, props) })
        : { root: styles };

    const useStyles = makeStyles(stylesOrCreator, { name, ...options })

    const selfPropTypes = targetProps || {}
    const combinedPropTypes = componentProps ? { ...componentProps, ...selfPropTypes } : selfPropTypes

    return Vue.defineComponent<Props>(
      {
        props: {
          modelValue: null,
          ...combinedPropTypes
        },

        emits: ['input', 'update:modelValue'],

        setup(props: Vue.ExtractPropTypes<Styles.InitialObject>, { slots, attrs, emit }: Vue.SetupContext) {
          const classes = useStyles(props)

          return () => Vue.h(
            component,
            {
              value: props.modelValue,
              ...attrs,
              ...props,
              class: classes.root,
              onInput: (e: any) => {
                emit('update:modelValue', e.target.value)
                emit('input', e)
              }
            },
            slots
          )
        }
      }
    )
  }

  return createStyledComponent
}

export default styled
