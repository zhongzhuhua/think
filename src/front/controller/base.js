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
        cssMmCommon: JSON.parse(fs.readFileSync('www/rev/css.mm.common.json', 'utf8')),
        cssPcCommon: JSON.parse(fs.readFileSync('www/rev/css.pc.common.json', 'utf8')),
        jsPcCommon: JSON.parse(fs.readFileSync('www/rev/js.pc.common.json', 'utf8')),
        jsMmCommon: JSON.parse(fs.readFileSync('www/rev/js.mm.common.json', 'utf8')),
        js: JSON.parse(fs.readFileSync('www/rev/js.json', 'utf8'))
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
