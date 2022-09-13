# vue3-makeStyles
Allows you to write CSS in the form of writing js object.
<br />
Reading this document will help you use makeStyles. The following examples use `jsx` encoding

# Install
```shell
$ npm install --save vue3-makestyles
$ yarn add vue3-makestyles
```

# Usage
```JS
  import makeStyles from "vue3-makeStyles"

  const useStyles = makeStyles(() => ({
    container: {
      width: "200px",
      height: "200px",
      backgroundColor: "red"
    }
  }))

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
 
  const useStyles = makestyles(() => ({
    container: {
      // ...
      "&.active": {
        // ...
        
        "& .children": {
          // ...
        }
      },
      "&:hover": {
        // ...
      },
      "& .children": {
        // ...
      },
      "& div": {
        // ...
      }
    }
  }))

  // ...
```

### Media Query
Supports media query hook functions, allowing you to write CSS code for different devices in makeStyles
```JS
  // ...

  const useStyles = makestyles((theme) => ({
    container: {
      width: "200px",
      height: "200px",
      backgroundColor: "red",
      [theme.breakpoints.up('md')]: {
        width: "400px",
        height: "400px",
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

If you need to set custom breakpoints, you can customize them in the `theme.ts` file, and then pass the configuration to `ThemeProvider`, so that makeStyles can read the custom configuration.

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
# customize
makeStyles allows you to customize and globally set common CSS styles.
<br />
You can create a custom configuration file in your project directory, such as `theme.js`, in which you can customize some of the configurations you need.
```JS
  import { createBreakpoints, createTheme } from "vue3-makestyles";

  export const initialBreakpoints = {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 15036,
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
> Warning: Hook functions must be executed when the component is mounted for the first time, or when the custom hook function is executed for the first time, and can only be defined in the first layer of the component or custom hook function, otherwise There will be unexpected results.

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
