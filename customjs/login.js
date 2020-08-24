(function(){
    if (sessionStorage.getItem("loggedinuser") != null) {
        RedirectToProfilePage();
      }
})();

$("#btnLogin").on("click",function(e){
    e.preventDefault();
    $("#spn_loginerr").hide();
    var logindetails={
        email:$("#inputEmail").val(),
        password:$("#inputPassword").val()
    };
    if(ValidateUserLogin(logindetails)){
        sessionStorage.setItem('loggedinuser',JSON.stringify(GetLoggedInUser(logindetails)));
        RedirectToProfilePage();
    }
    else{
        $("#spn_loginerr").show();
        return false;
    }
    
});

function ValidateUserLogin(logindetails){
    var isUserExist=false;
    var userList=JSON.parse(localStorage.getItem('userlist'));
    for(var i=0;i<userList.length;i++){
        if(userList[i].email===logindetails.email && userList[i].password===logindetails.password){
            isUserExist=true;
            break;
        }
    }
    return isUserExist;
}

function GetLoggedInUser(logindetails){
    var user;
    var userList=JSON.parse(localStorage.getItem('userlist'));
    for(var i=0;i<userList.length;i++){
        if(userList[i].email===logindetails.email && userList[i].password===logindetails.password){
            user=userList[i];
            break;
        }
    }
    return user;
}

function RedirectToProfilePage(){
    window.location="profile.html";
}