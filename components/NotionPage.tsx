import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import cs from 'classnames'
import { useRouter } from 'next/router'
import { useSearchParam } from 'react-use'
import { IconContext } from 'react-icons'
import BodyClassName from 'react-body-classname'
import dynamic from 'next/dynamic'

// core notion renderer
import { NotionRenderer, Code, Collection, CollectionRow } from 'react-notion-x'

// utils
import { getBlockTitle } from 'notion-utils'
import { DiscussionEmbed } from 'disqus-react'
import { mapPageUrl, getCanonicalPageUrl } from 'lib/map-page-url'
import { mapNotionImageUrl } from 'lib/map-image-url'
import { getPageDescription } from 'lib/get-page-description'
import { searchNotion } from 'lib/search-notion'
import * as types from 'lib/types'
import * as config from 'lib/config'

// components
import { CustomFont } from './CustomFont'
import { CustomHtml } from './CustomHtml'
import { Loading } from './Loading'
import { Page404 } from './Page404'
import { PageHead } from './PageHead'
import { Footer } from './Footer'

import styles from './styles.module.css'
import { useColorMode } from '@chakra-ui/react'

const Modal = dynamic(
  () => import('react-notion-x').then((notion) => notion.Modal),
  { ssr: false }
)
const Tweet = dynamic(
  () => import('react-notion-x').then((notion) => notion.Tweet),
  {
    ssr: false
  }
)
export const NotionPage: React.FC<types.PageProps> = ({
  site,
  recordMap,
  error,
  pageId
}) => {
  const router = useRouter()

  const lite = useSearchParam('lite')

  const params: any = {}
  if (lite) params.lite = lite

  const searchParams = new URLSearchParams(params)

  const isLiteMode = lite === 'true'
  const { colorMode } = useColorMode()
  const isDarkMode = colorMode === 'dark'

  if (router.isFallback) {
    return <Loading />
  }

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value

  if (error || !site || !keys.length || !block) {
    return <Page404 site={site} pageId={pageId} error={error} />
  }

  const title = getBlockTitle(block, recordMap) || site.name

  // console.log('notion page', {
  //   isDev: config.isDev,
  //   title,
  //   pageId,
  //   rootNotionPageId: site.rootNotionPageId,
  //   recordMap
  // })

  if (!config.isServer) {
    // add important objects global window for easy debugging
    ;(window as any).recordMap = recordMap
    ;(window as any).block = block
  }

  const siteMapPageUrl = mapPageUrl(site, recordMap, searchParams)

  const canonicalPageUrl =
    !config.isDev && getCanonicalPageUrl(site, recordMap)(pageId)

  const isBlogPost =
    block.type === 'page' && block.parent_table === 'collection'
  // const showTableOfContents = !!isBlogPost
  const minTableOfContentsItems = 3

  const socialImage = config.api.renderSocialImage(pageId)
  const socialDescription =
    getPageDescription(block, recordMap) ?? config.description
  let comments: React.ReactNode = null

  // only display comments on blog post pages
  if (isBlogPost) {
    if (config.disqusShortName) {
      comments = (
        <DiscussionEmbed
          shortname={config.disqusShortName}
          config={{
            url: canonicalPageUrl || `https://${config.domain}/${pageId}`,
            identifier: pageId,
            title
          }}
        />
      )
    }
  }

  return (
    <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
      <PageHead site={site} />

      <Head>
        <meta property='og:title' content={title} />
        <meta property='og:site_name' content={site.name} />

        <meta name='twitter:title' content={title} />
        <meta property='twitter:domain' content={site.domain} />

        {config.twitter && (
          <meta name='twitter:creator' content={`@${config.twitter}`} />
        )}

        {socialDescription && (
          <>
            <meta name='description' content={socialDescription} />
            <meta property='og:description' content={socialDescription} />
            <meta name='twitter:description' content={socialDescription} />
          </>
        )}

        {socialImage ? (
          <>
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:image' content={socialImage} />
            <meta property='og:image' content={socialImage} />
          </>
        ) : (
          <meta name='twitter:card' content='summary' />
        )}

        {canonicalPageUrl && (
          <>
            <link rel='canonical' href={canonicalPageUrl} />
            <meta property='og:url' content={canonicalPageUrl} />
            <meta property='twitter:url' content={canonicalPageUrl} />
          </>
        )}

        <title>
          {title} {pageId !== site.rootNotionPageId ? ' | ' + site.name : ''}
        </title>
      </Head>

      <CustomFont site={site} />

      {isLiteMode && <BodyClassName className='notion-lite' />}

      <NotionRenderer
        bodyClassName={cs(
          styles.notion,
          pageId === site.rootNotionPageId && 'index-page'
        )}
        components={{
          pageLink: ({
            href,
            as,
            passHref,
            prefetch,
            replace,
            scroll,
            shallow,
            locale,
            ...props
          }) => (
            <Link
              href={href}
              as={as}
              passHref={passHref}
              prefetch={prefetch}
              replace={replace}
              scroll={scroll}
              shallow={shallow}
              locale={locale}
            >
              <a {...props} />
            </Link>
          ),
          code: Code,
          collection: Collection,
          collectionRow: CollectionRow,
          modal: Modal,
          tweet: Tweet
        }}
        recordMap={recordMap}
        rootPageId={site.rootNotionPageId}
        fullPage={!isLiteMode}
        darkMode={isDarkMode}
        previewImages={site.previewImages !== false}
        showCollectionViewDropdown={false}
        showTableOfContents={true}
        minTableOfContentsItems={minTableOfContentsItems}
        defaultPageIcon={config.defaultPageIcon}
        defaultPageCover={config.defaultPageCover}
        defaultPageCoverPosition={config.defaultPageCoverPosition}
        mapPageUrl={siteMapPageUrl}
        mapImageUrl={mapNotionImageUrl}
        searchNotion={searchNotion}
        pageFooter={comments}
        footer={<Footer pageId={pageId} />}
      />

      <CustomHtml site={site} />
    </IconContext.Provider>
  )
}
