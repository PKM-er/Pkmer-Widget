/*
 * @Author: cumany cuman@qq.com
 * @Date: 2023-09-05 22:18:36
 * @LastEditors: cumany cuman@qq.com
 * @LastEditTime: 2023-09-05 22:57:51
 * @Description: 
 */
const initWidgetConfig = {} as { [key: string]: string | number };
if (process.client) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // 将查询参数更新到initWidgetConfig对象中
  urlParams.forEach((value, key) => {
    initWidgetConfig[key] = convertValue(value);
  });
}
function convertValue(value: string) {
  if (typeof value === "string" && /^\d+$/.test(value)) {
    // 如果值为字符串类型且内容全为数字，则进行转换为数字类型
    return Number(value);
  }

  return value;
}
console.log(initWidgetConfig);
export { initWidgetConfig };


