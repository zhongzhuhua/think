/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 * 
 * global.fn1 = function(){
 *     
 * }
 */

// 基础配置
global.configs = {
  env: think.config('env'),
  api: think.config('api'),
  suffix: think.config('suffix')
};

// 接口
global.maps = {
  login: 'login'
};

// 判断是否是 mobile
global.checkMobile = function(agent) {
  let flag = false;
  agent = agent.toLowerCase();
  let keywords = ['android', 'iphone', 'ipod', 'ipad', 'windows phone', 'mqqbrowser'];

  //排除 Windows 桌面系统  
  if (!(agent.indexOf('windows nt') > -1) || (agent.indexOf('windows nt') > -1 && agent.indexOf('compatible; msie 9.0;') > -1)) {
    //排除苹果桌面系统  
    if (!(agent.indexOf('windows nt') > -1) && !agent.indexOf('macintosh') > -1 && !(agent.indexOf('ipad') > -1)) {
      for (let item of keywords) {
        if (agent.indexOf(item) > -1) {
          flag = true;
          break;
        }
      }
    }
  }
  return flag;
};
