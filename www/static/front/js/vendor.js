console.log('vendor');

var maps = {
  login: '/front/user/login'
};

$.ajax({
  url: maps.login,
  success: function(data) {
    console.log(data);
  }
});
