window.Promise = Promise;
import Toast from '../../components/Toast.js';

class Vendor {
  constructor() {
    new Promise((res) => {
      console.log('vendor');
      setTimeout(() => {
        res();
      }, 2000);
    }).then(() => {
      console.log('vendor end');
    });
  };
};

new Vendor();
