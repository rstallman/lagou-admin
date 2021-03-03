import signinTpl from "../views/signin.art";

const htmlSignin = signinTpl({});


const _handleSubmit = (router) => {
  return (e) => {
    e.preventDefault();
    const data = $("#signin").serialize();
    $.ajax({
      url: "/api/users/signin",
      type: "post",
      data,
      success: function (res) {
        if(res.ret){
          router.go('/index') 
        }
      },
    });
  };
}; 


const signin = (router) => {
  return (req, res, next) => {
    res.render(htmlSignin);
    $("#signin").on("submit", _handleSubmit(router));
  };
}; 


export default  signin;