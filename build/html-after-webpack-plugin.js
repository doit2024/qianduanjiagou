const pluginName = 'HtmlAfterWebpackPlugin'

class HtmlAfterWebpackPlugin {
  apply (compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(pluginName, htmlPluginData => {
        const { html, assets } = htmlPluginData
        const {css, js} = assets
        htmlPluginData.html = html
          .replace("<!--injectcss-->", css.map(item => `<link rel="stylesheet" href="${item}"/>`).join(""))
          .replace("<!--injectjs-->", js.map(item => `<script src="${item}"></script>`).join(""))
      })
    })
  }
}

module.exports = HtmlAfterWebpackPlugin
