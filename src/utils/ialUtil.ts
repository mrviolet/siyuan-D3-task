/*
 * @Author: yl_li
 * @Date: 2024-12-01
 * @LastEditors: yl_li
 * @LastEditTime: 2024-12-01
 * @description: 
 */

/**
 * 用来将 block 中的 ial 字段转为 json
 * @param str block.ial
 * @returns json
 */
function parseIal2JSON(str: string): Record<string, string> {
  const regex = /\s*([\w-]+)\s*=\s*["']([^"']+)["']/g;
  const attributes: Record<string, string> = {};
  let match;

  while ((match = regex.exec(str)) !== null) {
    attributes[match[1]] = match[2];
  }

  return attributes;
}

export { parseIal2JSON }