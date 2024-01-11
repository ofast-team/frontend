// import remarkMath from 'remark-math'
// import rehypeMathjax from 'rehype-mathjax/svg'
// import rehypeKatex from 'rehype-katex'
// const remarkMath = require('remark-math');
// const rehypeKatex = require('rehype-katex');

const { addAfterLoader, loaderByName } = require('@craco/craco')

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      addAfterLoader(webpackConfig, loaderByName('babel-loader'), {
        test: /\.(md|mdx)$/,
        loader: require.resolve('@mdx-js/loader'),
        // options: {
        //   remarkPlugins: [remarkMath],
        //   rehypePlugins: [rehypeKatex]
        // }
      })

      return webpackConfig
    }
  }
}

// import('remark-math').then(remarkMath => {
//   import('rehype-katex').then(rehypeKatex => {
//     console.log(mod.msg);    //  "Hello world!"
//   })

// }
// );