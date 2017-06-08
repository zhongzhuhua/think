'use strict';

export default class extends think.controller.base {
  init(http) {
    super.init(http);
    this.env = this.config('env');
  };

  /** 
   */
  goto(type) {
    let myroute = type == null ? (!checkMobile(this.userAgent()) ? '' : '.mm.html') : type == 'mobile' ? '.mm.html' : '';
    console.log(`${this.http.controller}/${this.http.action}${myroute}`)
    return `${this.http.controller}/${this.http.action}${myroute}`;
  };
};
