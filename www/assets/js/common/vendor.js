require('../../components/Toast.js');

class Vendor {
  constructor() {
    let name = 'ice';

    new Promise((res) => {
      console.log(name);
      setTimeout(() => {
        res();
      }, 2000);
    }).then(() => {
      console.log('end');
    });

  };
};

new Vendor();
