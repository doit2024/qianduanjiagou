/**
 * @fileOverview 实现Index数据模型
 * @author dengweimin@dazhuang.online
 */

 /**
  * IndexModel类 ，生成一段异步的数据
  * @class
  */
class IndexModel {
  /**
   * @constructor 
   * @param {string} app koa2上下文环境
   */
  constructor (app) {}

  /**
   * 获取用户列表
   * @returns {Promise} 返回异步的处理结果
   * @example
    {
      errcode: 0,
      errmsg: '成功',
      data: {
        id: 1,
        name: 'hello'
      }
    }
   */
  getData () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          errcode: 0,
          errmsg: '成功',
          data: {
            id: 1,
            name: 'hello'
          }
        })
      }, 1000)
    })
  }
}

module.exports = IndexModel
