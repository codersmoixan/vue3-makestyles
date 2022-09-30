# vue3-makestyles
Allows you to write CSS in the form of writing js object.
<br />
The api implementation draws on <a href="https://github.com/mui/material-ui/blob/master/packages/mui-styles/src/makeStyles/makeStyles.js">mui</a>，Some tool functions are borrowed from <a href="https://github.com/UX-and-I/vue3-styled-components">vue3-styled-components</a>.
<br />
Reading this document will help you use makeStyles. The following examples use `jsx` encoding

English <a href="https://github.com/codersmoixan/vue3-makestyles/blob/master/docs/chinese.md">中文文档</a>

# Install
```shell
$ npm install --save vue3-makestyles
$ yarn add vue3-makestyles
```

## Usage
```JS
import makeStyles from "vue3-makestyles"

const useStyles = makeStyles({
  container: {
    width: 200,
    height: 200,
    backgroundColor: "red"
  }
})

// ...
export default defineComponent({
  setup() {
    const classes = useStyles()

    return () => <div class={classes.container}>vue3-makeStyles</div>
  }
})
```

You can write makeStyles like you would normally write less/scss
```JS
// ...

const useStyles = makeStyles({
  container: {
    width: 200,
    height: 200,
    "&.active": {
      backgroundColor: 'red',
      "& .children": {
        fontSize: 16,
        color: 'blue',
        "&:hover": {
          color: 'black'
        }
      }
    },
  }
})

// ...
```
Using state in components：
```JS
// ...

const useStyles = makeStyles((theme, props) => ({
  padding: theme.spacing(2),
  backgroundColor: props?.bgColor
  // ...
}))

export default defineComponent({
  setup(props) {
    const classes = useStyles(props)

    // ...
  }
})
```
> Notice: The value passed to `useStyles` needs to be responsive, so that the CSS styles can be updated according to your state

## Media Query
Supports media query hook functions, allowing you to write CSS code for different devices in makeStyles
```JS
// ...

const useStyles = makeStyles((theme) => ({
  container: {
    width: 200,
    height: 200,
    backgroundColor: "red",
    [theme.breakpoints.up('md')]: {
      width: 400,
      height: 400,
      backgroundColor: "blue"
    }
  }
}))

// ...
```
There are three methods for breakpoints: `up`, `between`, `down`
<br />
Enter the corresponding rule breakpoints for matching, `xs`, `sm`, `md`, `lg`, `xl` are default breakpoints, and the corresponding pixel difference values are as follows:
```JS
values = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1680,
}
```
It's worth noting that if you choose to call the `between` method, then you need to pass in two breakpoint parameters, and it will return true when only between your breakpoints

If you need to set custom breakpoints, you can customize them in the <a href="https://github.com/codersmoixan/vue3-makestyles/blob/master/example/theme.ts">theme.ts</a> file, and then pass the configuration to `ThemeProvider`, so that makeStyles can read the custom configuration.
```JS
// app.tsx / app.vue
import { ThemeProvider } from "vue3-makestyles"
import theme from "./theme.ts"
// ...

export default defineComponent({
  name: "App",
  setup() {

    return () => (
      <ThemeProvider theme={theme}>
        ...
      </ThemeProvider>
    );
  },
});
```

makeStyles also provides hook functions that you can use when writing components.
```JS
import { useMediaQuery } from "vue3-makestyles"
// ...

export default defintComponent({
  setup() {
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'))

    return () => mdUp.value ? "Test useMediaQuery" : null
  }
})
```
makeStyles provides the `Hidden` component, which is used to render the wrapped node in your template
```JS
import { Hidden } from "vue3-makestyles"
// ...

export default defineComponent({
  setup() {
    return () => (
      <>
        <Hidden mdUp>
          This is the node rendered by the small screen device
        </Hidden>
        <Hidden mdDown>
          This is the node rendered by the large screen device
        </Hidden>
      </>
    )
  }
})
```
## Customize
makeStyles allows you to customize and globally set common CSS styles.
<br />
You can create a custom configuration file in your project directory, such as <a href="https://github.com/codersmoixan/vue3-makestyles/blob/master/example/theme.ts">theme.ts</a>, in which you can customize some of the configurations you need.
```JS
import { createBreakpoints, createTheme } from "vue3-makestyles";

export const initialBreakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1680,
  },
  unit: "px",
  step: 5,
};

const breakpoints = createBreakpoints(initialBreakpoints)

export default createTheme({
  breakpoints,
  // ...
})
```
Then use `ThemeProvider` in your project App.jsx file to inject your custom configuration dependency into the project global, and then you can use the configuration in your configuration file anywhere in your project.

If you want to use the configuration you just defined in the configuration file, makeStyles provides a hook function `useTheme` that allows you to get the relevant configuration in the custom configuration file.
```JS
import { useTheme } from "vue3-makestyles"
// ...

export default defintComponent({
  setup() {
    const theme = useTheme()

    // ...
  }
})
```
> Notice: Hook functions must be executed when the component is mounted for the first time, or when the custom hook function is executed for the first time, and can only be defined in the first layer of the component or custom hook function, otherwise There will be unexpected results.

You should：
```JS
// ...

export default defineComponent({
  setup() {
    const theme = useTheme() // Correct
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md')) // Correct
    const classes = useStyles() // Correct

    // ...
  }
})
```
You should not:
```JS
// ...

export default defineComponent({
  setup() {
    const handleClick = () => {
      const theme = useTheme() // Incorrect

      // ... 
    }

    return () => <button onClick={handleClick}>按钮</button>
  }
})
```

## Style Isolation
The classes generated by `makeStyles` are randomly generated and unique. Of course, you can also pass the current component name to the second parameter of `makeStyles`, then the currently created class is only used in the current component.
```JS
// ...

const useStyles = makeStyles({
  // ...
}, {
  name: 'TestComponent', // This name is customizable
  // isHashClassName: false // Whether to generate a class name with a hash value The default is true
})
```
You can uniformly configure your css common styles in your <a href="https://github.com/codersmoixan/vue3-makestyles/blob/master/example/theme.ts">theme.ts</a> file, and bind with the name you define in `name` in the makeStyles function
```JS
export default createTheme({
  // ...
  css: {
    TestComponent: {
      width: 200,
      height: 200,
      backgroundColor: 'red'
    }
  }
})
```
> Notice: The styles defined here take precedence over the ones you define in the component

## Use styled to output components
`makeStyles` provides the `styled` function to output components。
```JS
import { styled } from "vue3-makestyles"
// ...

const Container = styled('div')({
  width: 200,
  height: 200,
  backgroundColor: 'red'
})

export default defineComponent({
  setup() {

    return () => <Container />
  }
})
```
You can provide some state to the component to dynamically set the css value, you need to define the `props` type of the component in advance。
```JS
// ...

const Container = styled('div', {
  bgColor: String,
  fontSize: Number
})((theme, props) => ({
  width: 200,
  height: 200,
  backgroundColor: props?.bgColor,
  fontSize: props?.fontSize
}))

export default defineComponent({
  setup() {
    const bgColor = ref<string>('blue')

    return () => <Container bgColor={bgColor.value} fontSize={14} />
  }
})
```
You can pass in a component and then modify the css style of this component.
```JS
import Component from "components/Component"
//...

const CustomerComponent = styled(Component, {
  bgColor: String,
  fontSize: Number
})((theme, props) => ({
  width: 200,
  height: 200,
  backgroundColor: props?.bgColor,
  fontSize: props?.fontSize
}))

export default defineComponent({
  setup() {
    const bgColor = ref<string>('blue')

    return () => <CustomerComponent bgColor={bgColor.value} fontSize={14} />
  }
})
```

