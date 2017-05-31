'use strict';
/**
 * 前端基类控制器
 */
export default class extends think.controller.base {
  init(http) {
    super.init(http);
  };

  /** 
   */
  goto(type) {
    let myroute = type == null ? (!checkMobile(this.userAgent()) ? 'pc' : 'mobile') : type == 'mobile' ? 'mobile' : 'pc';
    return `${myroute}/${this.http.controller}/${this.http.action}`;
  };
};
