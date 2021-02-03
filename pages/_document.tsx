import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../theme'
import * as config from 'lib/config'

export default class MyDocument extends Document {
  render() {
    const isDev =
      process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
    return (
      <Html lang='en'>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          />
          <link
            rel='apple-touch-icon'
            sizes='57x57'
            href='icons/apple-icon-57x57.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='60x60'
            href='icons/apple-icon-60x60.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='72x72'
            href='icons/apple-icon-72x72.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='76x76'
            href='icons/apple-icon-76x76.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='114x114'
            href='icons/apple-icon-114x114.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='120x120'
            href='icons/apple-icon-120x120.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='144x144'
            href='icons/apple-icon-144x144.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='icons/apple-icon-152x152.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='icons/apple-icon-180x180.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='192x192'
            href='icons/android-icon-192x192.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='icons/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='96x96'
            href='icons/favicon-96x96.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='icons/favicon-16x16.png'
          />
          <link rel='manifest' href='/manifest.json' />
          <meta name='msapplication-TileColor' content='#ffffff' />
          <meta
            name='msapplication-TileImage'
            content='icons/ms-icon-144x144.png'
          />
          <meta name='theme-color' content='#ffffff' />
          {!isDev && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`}
              ></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments)}
            gtag("js", new Date());
            gtag("config", "${config.googleAnalyticsId}");
        `
                }}
              ></script>
            </>
          )}
        </Head>

        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
