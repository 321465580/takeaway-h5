module.exports = {
    // 配置两个插件
    plugins: {
      autoprefixer: {
        overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7'],
      },
      'postcss-pxtorem': {
        // 根节点的 fontSize 值
        rootValue: 16,
        // 修改css是全部
        propList: ['*'],
        // 忽略 :root 的变量
        selectorBlackList: [':root'],
      },
    },
  }
  