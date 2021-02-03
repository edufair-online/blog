// const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const pwaLoader = withPWA({
  target: 'serverless',

  pwa: {
    dest: 'public',
    sourcemap: false
    // disable: process.env.NODE_ENV === 'development',
    // register: true
  }
})

// Next configuration
const nextConfig = {}

module.exports = withPlugins([[withBundleAnalyzer], [pwaLoader], nextConfig])
