'use strict';

import Base from './base.js';
import http from 'http';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    return this.display(this.goto());
  };

  /**
   * [post] login
   */
  loginAction() {
    let url = configs.api + maps.login + configs.suffix;
    new Promise((resolve) => {
      http.get(url, function(res) {
        let result = null;
        res.on('data', function(data) {
          result = JSON.parse(data);
        });
        res.on('end', function() {
          resolve();
        });
      });
    }).then((result) => {
      this.success(result);
    });
  };
};
