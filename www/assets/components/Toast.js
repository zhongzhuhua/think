export default class Toast {
  constructor() {
    console.log('Toast');
  };

  open() {
    setTimeout(() => {
      console.log('open');
    }, 500);
  };
};
