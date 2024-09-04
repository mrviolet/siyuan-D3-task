/*
 * @Author: yl_li
 * @Date: 2024-09-02
 * @LastEditors: yl_li
 * @LastEditTime: 2024-09-04
 * @description: 
 */
/**
 * 关闭侧边栏
 * 没有找到官方 api, 只能模拟点击按钮
 */
function closeDock() {
  const element = document.querySelector<HTMLElement>('[data-type="siyuan-Mtaskdock_tab"]');
  if (element) {
    element?.click();
  }
}

/**
 * 打开管理页签
 */
function openMtaskTab() {
  window.mtaskPluginInstance.openMtaskTab()
}

export { closeDock, openMtaskTab }