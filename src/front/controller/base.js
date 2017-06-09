'use strict';
import fs from 'fs';

export default class extends think.controller.base {
  async init(http) {
    super.init(http);
    this.env = this.config('env');
    this.DeviceWidth = 640;
    this.meta_title = '首页';
  };

  async __before() {
    let hashConfig = await this.session('HashConfig');
    if (hashConfig == null || this.env == 'dev') {
      hashConfig = {
        cssMmCommon: require('../../../www/rev/css.mm.common.json'),
        cssPcCommon: require('../../../www/rev/css.pc.common.json')
      };
      await this.session('HashConfig', hashConfig);
    }
    this.hashConfig = hashConfig;
  };

  /** 
   */
  goto(type) {
    let myroute = type == null ? (!checkMobile(this.userAgent()) ? '' : '.mm.html') : type == 'mobile' ? '.mm.html' : '';
    return `${this.http.controller}/${this.http.action}${myroute}`;
  };
};
