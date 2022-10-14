import * as Vue from "vue"
import makeStyles from "./makeStyles";
import type * as Styles from "../types/index.types";

interface StyledProps { [key: string]: Vue.Prop<unknown> }

function styled(component: any, propDefinitions: Vue.ExtractPropTypes<StyledProps> = {}) {
  const componentProps = component.props as Vue.ExtractPropTypes<StyledProps>
  const name = component.name

  const componentDefinitionsKeys = componentProps ? Object.keys(componentProps) : []

  const combinedPropTypes = (componentProps ? { ...componentProps, ...propDefinitions } : propDefinitions)

  const createStyledComponent = (
    styles: Styles.CreateCSSProperties | ((theme: Styles.Theme, props: Styles.InitialObject) => Styles.CreateCSSProperties),
    options: Styles.MakeStylesOptions = {}
  ): Vue.DefineComponent<typeof combinedPropTypes> => {
    const stylesOrCreator =
      typeof styles === 'function'
        ? (theme: Styles.Theme, props: Styles.InitialObject = {}) => ({ root: styles(theme, props) })
        : { root: styles };

    const useStyles = makeStyles(stylesOrCreator, { name, isStyled: true, ...options })

    return Vue.defineComponent({
      props: {
        modelValue: null,
        ...combinedPropTypes
      },

      emits: ['input', 'update:modelValue'],

      setup(props, { slots, attrs, emit }: Vue.SetupContext) {
        const classes = useStyles(props)

        return () => {
          const targetProps: Styles.InitialObject = {}

          if (componentDefinitionsKeys.length) {
            for (const [key, value] of Object.entries(props)) {
              if (componentDefinitionsKeys.includes(key)) {
                targetProps[key] = value
              }
            }
          }

          return Vue.h(
            component,
            {
              value: props.modelValue,
              ...attrs,
              ...targetProps,
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
    })
  }

  return createStyledComponent
}

export default styled
