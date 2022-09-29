# vue3-makestyles
允许您以编写 js 对象的形式编写 CSS。
<br />
api实现借鉴了 <a href="https://github.com/mui/material-ui/blob/master/packages/mui-styles/src/makeStyles/makeStyles.js">mui</a>，部分工具函数借鉴了 <a href="https://github.com/UX-and-I/vue3-styled-components">vue3-styled-components</a>。
<br />
阅读本文档将帮助您使用 `makeStyles`， 以下示例使用 `jsx` 编码。

中文文档 <a href="https://github.com/codersmoixan/vue3-makestyles/blob/master/doc/english.md">English</a>

# 安装
```shell
$ npm install --save vue3-makestyles
$ yarn add vue3-makestyles
```

## 基本使用
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

您可以像通常编写 `less/scss` 一样编写 `makeStyles`
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
使用组件中的状态：
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
> 注意：传入`useStyles`的值需要是响应式的，这样才能根据你的状态来更新的CSS样式

## 媒体查询
支持媒体查询钩子函数，允许您在`makeStyles`中为不同设备编写CSS代码
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
断点提供了三种查询函数: `up`, `between`, `down`
<br />
输入对应的规则断点进行匹配，`xs`、`sm`、`md`、`lg`、`xl`为默认断点，对应的像素差值如下：
```JS
values = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1680,
}
```
值得注意的是，如果你选择调用 `between` 方法，那么你需要传入两个断点参数，只有在你的断点之间才会返回 true。

如果需要设置自定义断点，可以在`theme.ts`文件中进行自定义，然后将配置传递给`ThemeProvider`，这样makeStyles就可以读取自定义配置。
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

`makeStyles` 还提供了可以在编写组件时使用的钩子函数。
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
`makeStyles` 提供了 `Hidden` 组件，用于在你的模板中渲染被包裹的节点
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
## 自定义配置
`makeStyles` 允许您自定义一些配置和全局设置常见的 CSS 样式。
<br />
你可以在你的项目目录下创建一个自定义的配置文件，比如<a href="https://github.com/codersmoixan/vue3-makestyles/blob/master/example/theme.ts">theme.ts</a>，你可以在其中自定义一些你需要的配置。
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
然后在你的项目 `App.jsx` 文件中使用 `ThemeProvider` 将你的自定义配置依赖注入到项目全局中，然后你就可以在项目的任何地方使用你的配置文件中的配置了。

如果你想使用你刚刚在配置文件中定义的配置，`makeStyles`提供了一个钩子函数`useTheme`，可以让你在自定义配置文件中获取相关配置。
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
> 注意：hook函数必须在组件第一次挂载时执行，或者自定义hook函数第一次执行时执行，并且只能在组件或自定义hook函数的第一层定义，否则会出现 得到意想不到的结果。

您应该：
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
您不应该:
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

## 样式隔离
`makeStyles`生成的类是随机生成的，唯一的。 当然，你也可以将当前组件名称传递给`makeStyles`的第二个参数，那么当前创建的类只在当前组件中使用。
```JS
// ...

const useStyles = makeStyles({
  // ...
}, {
  name: 'TestComponent', // This name is customizable
  // isHashClassName: false // 是否在生成具有hash值的类名 默认为true
})
```
你可以在你的 <a href="https://github.com/codersmoixan/vue3-makestyles/blob/master/example/theme.ts">theme.ts</a> 文件中统一配置你的css常用样式，并在`makeStyles`函数中与你在`name`中定义的名称绑定。
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
> 注意：此处定义的样式优先于您在组件中定义的样式

## 使用styled输出组件
`makeStyles`提供了`styled`函数用来输出组件。
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
你可以给组件提供一些状态用来动态设置css值，需要你提前定义组件的`props`类型。
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
你可以传入一个组件，然后修改这个组件的css样式。
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
