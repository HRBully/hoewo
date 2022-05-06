const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

const getResult = async (content) => {
  const types = ['books'];
  const result = {};

  let alive = recursion(content, result, types, 0)

  // let alive = Promise.resolve();
  // for (const item of types) {
  //   alive = db.collection(item).where({
  //     title: db.RegExp({
  //       regexp: content,//miniprogram做为关键字进行匹配
  //       options: 'i',//不区分大小写
  //     })
  //   }).get().then((res) => {
  //     let { data } = res
  //     console.log(item, 2)
  //     if (data.length) result[item] = data;
  //   });
  // }

  // types.forEach((item) => {
  //   alive = db.collection(item).where({
  //     title: db.RegExp({
  //       regexp: content,//miniprogram做为关键字进行匹配
  //       options: 'i',//不区分大小写
  //     })
  //   }).get().then((res) => {
  //     let { data } = res
  //     if (data.length) result[item] = data;
  //   });
  // })
  // alive = db.collection(types[0]).where({
  //   title: db.RegExp({
  //     regexp: content,//miniprogram做为关键字进行匹配
  //     options: 'i',//不区分大小写
  //   })
  // }).get().then((res) => {
  //   let { data } = res
  //   console.log(types[0], 2)
  //   if (data) result[types[0]] = data;
  // });

  return await alive.then(() => {
    if (Object.keys(result).length) {
      return result
    }
    return true
  })
}

const recursion = (content, result, types, index) => {
  return new Promise((resolve) => {
    if (index == types.length) resolve();
    let config = index != 1 ?
      {
        title: db.RegExp({
          regexp: content,//miniprogram做为关键字进行匹配
          options: 'i',//不区分大小写
        })
      } : {
        name: db.RegExp({
          regexp: content,//miniprogram做为关键字进行匹配
          options: 'i',//不区分大小写
        })
      }
    db.collection(types[index]).where(config).get().then((res) => {
      let { data } = res;
      if (data.length) result[types[index]] = data;
      resolve(recursion(content, result, types, index + 1));
    });
  })
}

exports.main = (event) => {
  const { content } = event;
  if (!content) return true

  return getResult(content);

}