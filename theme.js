import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: (props) => ({
    body: {
      color: mode('black', 'whiteAlpha.900')(props),
      bg: mode('white', '#2f3437')(props)
    }
  })
}
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
}
const components = {
  // Link: {
  //   baseStyle: (props) => ({
  //     color: mode("blue.400", "blue.300")(props),
  //   }),
  // },
  IconButton: {
    sizes: {
      lg: {
        h: 12,
        minW: 12,
        fontSize: 'lg',
        px: 6
      },
      md: {
        h: 10,
        minW: 10,
        fontSize: 'md',
        px: 4
      },
      sm: {
        h: 8,
        minW: 8,
        fontSize: 'sm',
        px: 3
      },
      xs: {
        h: 6,
        minW: 6,
        fontSize: 'xs',
        px: 2
      }
    }
  }
}

const theme = extendTheme({
  components,
  styles,
  config
})

export default theme
