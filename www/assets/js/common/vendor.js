import Toast from '../../components/Toast.js';

class Vendor {
  constructor() {
    let name = 'ice';
    console.log(new Toast().open());

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
