
$(document).ready(function(){
    var loggedInUser=JSON.parse(sessionStorage.getItem("loggedinuser"));
    $("#profile_name").html(loggedInUser.firstName+ " "+ loggedInUser.lastName);
    $("#profile_email").html(loggedInUser.email);
    $("#profile_gender").html(loggedInUser.gender);
    $("#profile_address").html(loggedInUser.address);
});