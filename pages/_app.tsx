// global styles shared across the entire site
import 'styles/global.css'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'

// used for collection views (optional)
// TODO: re-add if we enable collection view dropdowns
import 'rc-dropdown/assets/index.css'

// used for rendering equations (optional)
// import 'katex/dist/katex.min.css'

// core styles for static tweet renderer (optional)
import 'react-static-tweets/styles.css'

// global style overrides for notion
import 'styles/notion.css'

// global style overrides for prism theme (optional)
import 'styles/prism-theme.css'

// here we're bringing in any languages we want to support for
// syntax highlighting via Notion's Code block
import 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'

// global style overrides for prism theme
import 'styles/prism-theme.css'

import 'nprogress/nprogress.css'

import React from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import Head from 'next/head'
import PromptPWA from 'components/PromptPWA'

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <PromptPWA delay={5000} />
      </ChakraProvider>
    </>
  )
}
