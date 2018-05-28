class IndexModel {
  constructor (app) {}
  getData () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('hello from index-model')
      }, 3000)
    })
  }
}

module.exports = IndexModel
