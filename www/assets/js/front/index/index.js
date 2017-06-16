let Promise = window.Promise;

class Index {
  constructor() {
    new Promise((res) => {
      console.log('index');
      setTimeout(() => {
        res();
      }, 3000);
    }).then(() => {
      console.log('index end');
    });
  };
};

new Index();
