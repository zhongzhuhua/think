'use strict';

/**
 * 公用处理模块
 */
export default class extends think.controller.base {
  async clearhashAction(){
    this.session('HashConfig', null);
    return this.success('清除文件缓存数据成功');
  };
};