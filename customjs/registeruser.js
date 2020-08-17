var userList=[];
$("#btnRegister").on("click",function(e){
    e.preventDefault();
    var user={
        firstName:$("#inputFirstName").val(),
        lastName:$("#inputLastName").val(),
        email:$("#inputEmail").val(),
        password:$("#inputPassword").val(),
        gender:$("input[name='gender']:checked").val(),
        address:$("#inputAddress").val(),
    };
    console.log(user);
    if(ValidateRegisterForm(user)){
        userList.push(user);
        localStorage.setItem('userlist',JSON.stringify(userList));
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
    if(!user.password){
        isFormValid=false;
        $("#spn_pwd").show();
    }
    return isFormValid;
};

function isEmailValid(email){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return filter.test(email);
}

