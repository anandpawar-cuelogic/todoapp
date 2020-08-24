(function(){
    if (localStorage.getItem("userlist") === null) {
        localStorage.setItem("userlist",JSON.stringify([]));
      }

    if (sessionStorage.getItem("loggedinuser") != null) {
        window.location="profile.html";
      }
})();
$("#btnRegister").on("click",function(e){
    e.preventDefault();
    var userList=JSON.parse(localStorage.getItem("userlist"));
    var user={
        firstName:$("#inputFirstName").val(),
        lastName:$("#inputLastName").val(),
        email:$("#inputEmail").val(),
        password:$("#inputPassword").val(),
        gender:$("input[name='gender']:checked").val(),
        address:$("#inputAddress").val(),
    };
    if(ValidateRegisterForm(user)){
        userList.push(user);
        localStorage.setItem('userlist',JSON.stringify(userList));
        window.location="Index.html";
    }
    else{
        return false;
    }
    
});

function ValidateRegisterForm(user){
    $("span.text-danger").hide();
    var isFormValid = true;
    if(!user.firstName){
        isFormValid=false;
        $("#spn_fname").show();
    }
    if(!user.lastName){
        isFormValid=false;
        $("#spn_lname").show();
    }
    if(!user.email){
        isFormValid=false;
        $("#spn_email").show();
    }
    if(!isEmailValid(user.email)){
        isFormValid=false;
        $("#spn_email_wrong").show();
    }
    if(isEmailExist(user.email)){
        isFormValid=false;
        $("#spn_email_exist").show();
    }
    if(!user.password){
        isFormValid=false;
        $("#spn_pwd").show();
    }
    return isFormValid;
};

function isEmailValid(email){
    var filter = /^([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,4})+$/;
    return filter.test(email);
}

function isEmailExist(email){
    var isEmailExist=false;
    var userList=JSON.parse(localStorage.getItem('userlist'));
    if(userList){
        for(var i=0;i<userList.length;i++){
            if(userList[i].email===email){
                isEmailExist=true;
                break;
            }
        }
    }
    
    return isEmailExist;
}

