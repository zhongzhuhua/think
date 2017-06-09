'use strict';

export default class extends think.controller.base {
  init(http) {
    super.init(http);
    this.env = this.config('env');
    this.DeviceWidth = 720;
    this.meta_title = '首页';
  };

  /** 
   */
  goto(type) {
    let myroute = type == null ? (!checkMobile(this.userAgent()) ? '' : '.mm.html') : type == 'mobile' ? '.mm.html' : '';
    return `${this.http.controller}/${this.http.action}${myroute}`;
  };
};
