/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-04-19 10:05:00
 * @LastEditTime: 2021-04-19 17:57:18
 * @LastEditors: @Xin (834529118@qq.com)
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: name => {
          return `element-plus/lib/theme-chalk/${name}.css`
        },
      },
    ],
  ],
}
