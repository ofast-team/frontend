const { addAfterLoader, loaderByName } = require('@craco/craco')

module.exports = async (env) => {
  const remarkMath = (await import('remark-math')).default
  const rehypeMathjax = (await import('rehype-mathjax/svg')).default

  return {
    webpack: {
      configure: (webpackConfig) => {
        addAfterLoader(webpackConfig, loaderByName('babel-loader'), {
          test: /\.(md|mdx)$/,
          loader: require.resolve('@mdx-js/loader'),
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeMathjax]
          }
        })
        return webpackConfig
      }
    }
  }
}