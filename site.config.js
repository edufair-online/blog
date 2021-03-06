module.exports = {
  // where it all starts -- the site's root Notion page (required)
  rootNotionPageId: 'ef70445f3daa48edb825df2d537fb517',

  // basic site info (required)
  name: 'Edufair Online 2021',
  domain: 'blog.edufaironline.id',
  author: 'Wisesa',
  mainWeb: 'https://edufaironline.id/',
  disqusShortName: 'edufair-blog',
  // open graph metadata (optional)
  description: 'Edufair Online 2021 Blog',
  socialImageTitle: 'Edufair Online 2021',
  socialImageSubtitle: 'Edufair Online 2021 Blog',
  googleAnalyticsId: 'G-EP3GWXJX5Z',
  // social usernames (optional)
  // twitter: 'transitive_bs',
  // github: 'transitive-bullshit',
  // linkedin: 'fisch2',

  socialMedia: {
    instagram: 'https://www.instagram.com/edufair_online/',
    discord: 'https://s.id/edu-discord',
    youtube: 'https://www.youtube.com/channel/UCt0rriFZO-ZPy802fEKxE7Q'
  },
  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null, // URL
  defaultPageCover: null, // URL
  defaultPageCoverPosition: 0.5,

  // image CDN host to proxy all image requests through (optional)
  // NOTE: this requires you to set up an external image proxy
  imageCDNHost: null,

  // Utteranc.es comments via GitHub issue comments (optional)
  // utterancesGitHubRepo: 'edufair-online/blog',

  // whether or not to enable support for LQIP preview images (optional)
  // NOTE: this requires you to set up Google Firebase and add the environment
  // variables specified in .env.example
  isPreviewImageSupportEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  pageUrlOverrides: null
}
