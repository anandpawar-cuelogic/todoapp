$(document).ready(function(){
    var loggedInUser=JSON.parse(sessionStorage.getItem("loggedinuser"));

    $("#inputFirstName").val(loggedInUser.firstName);
    $("#inputLastName").val(loggedInUser.lastName);
    $("#inputAddress").val(loggedInUser.address);
    $("input[name='gender'][value=" + loggedInUser.gender + "]").prop('checked', true);
    $("#inputEmail").val(loggedInUser.email);
});

$("#btnUpdateProfile").on("click",function(e){
    e.preventDefault();
    var user={
        firstName:$("#inputFirstName").val(),
        lastName:$("#inputLastName").val(),
        gender:$("input[name='gender']:checked").val(),
        address:$("#inputAddress").val(),
        email:$("#inputEmail").val()
    };
    
    if(ValidateUpdateProfileForm(user)){
        var userList=JSON.parse(localStorage.getItem('userlist'));
    for(var i=0;i<userList.length;i++){
        if(userList[i].email===user.email){
            userList[i].firstName=user.firstName;
            userList[i].lastName=user.lastName;
            userList[i].address=user.address;
            userList[i].gender=user.gender;
            localStorage.removeItem("userlist");
            sessionStorage.removeItem("loggedinuser");
            localStorage.setItem("userlist",JSON.stringify(userList));
            sessionStorage.setItem("loggedinuser",JSON.stringify(userList[i]));
            break;
        }
    }
    }
    else{
        return false;
    }
    window.location="profile.html";
    
});

function ValidateUpdateProfileForm(user){
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
    return isFormValid;
};