'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  adapter: {
    dev: {
      type: 'mysql',
      host: '127.0.0.1',
      port: '',
      database: 'thinkjs',
      user: 'root',
      password: '',
      prefix: '',
      encoding: 'utf8'
    },
    stg: {
      type: 'mysql',
      host: '127.0.0.1',
      port: '',
      database: 'thinkjs',
      user: 'root',
      password: '',
      prefix: '',
      encoding: 'utf8'
    },
    prd: {
      type: 'mysql',
      host: '127.0.0.1',
      port: '',
      database: 'thinkjs',
      user: 'root',
      password: '',
      prefix: '',
      encoding: 'utf8'
    }
  }
};
