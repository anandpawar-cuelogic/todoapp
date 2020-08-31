window.addEventListener("DOMContentLoaded",function(){
    var loggedInUser=JSON.parse(sessionStorage.getItem("loggedinuser"));
    if(loggedInUser){
        document.getElementById("inputFirstName").value=loggedInUser.firstName;
        document.getElementById("inputLastName").value=loggedInUser.lastName;
        document.getElementById("inputEmail").value=loggedInUser.email;
        //document.profileForm.gender.value=loggedInUser.gender;
        document.getElementById("rd_"+loggedInUser.gender).checked =true;
        //document.querySelector('input[name="gender"]').value=loggedInUser.gender;
        document.getElementById("inputAddress").value=loggedInUser.address;
        document.getElementById("imgProfile").src=loggedInUser.profilePic;
        document.getElementById("inputProfileImage").src=loggedInUser.profilePic;
    }
    else{
        window.location="login.html";
    }

    document.getElementById("btnUpdateProfile").addEventListener("click",UpdateUserProfile)
});

function UpdateUserProfile(e){
    e.preventDefault();
    var user={
            firstName:document.getElementById("inputFirstName").value,
            lastName:document.getElementById("inputLastName").value,
            email:document.getElementById("inputEmail").value.toLowerCase(),
            gender:document.querySelector('input[name="gender"]:checked').value,
            address:document.getElementById("inputAddress").value,
            profilePic:document.getElementById("inputProfileImage").src,
            todos:[]
    };
    
    if(ValidateUpdateProfileForm()){
        var userList=JSON.parse(localStorage.getItem('userlist'));
    for(var i=0;i<userList.length;i++){
        if(userList[i].email===user.email){
            userList[i].firstName=user.firstName;
            userList[i].lastName=user.lastName;
            userList[i].address=user.address;
            userList[i].gender=user.gender;
            userList[i].profilePic=user.profilePic;
            //localStorage.removeItem("userlist");
            //sessionStorage.removeItem("loggedinuser");
            localStorage.setItem("userlist",JSON.stringify(userList));
            sessionStorage.setItem("loggedinuser",JSON.stringify(userList[i]));
            break;
        }
    }
    }
    else{
        return false;
    }
    alert("User profile updated succesfully");
    window.location="profile.html";
    
};

function ValidateUpdateProfileForm(){
    var user={
        firstName:document.getElementById("inputFirstName").value,
        lastName:document.getElementById("inputLastName").value
    };
    $("span.text-danger").hide();
    var isFormValid = true;
    if(!user.firstName){
        isFormValid=false;
        document.getElementById("spn_fname").show();
    }
    if(!user.lastName){
        isFormValid=false;
        document.getElementById("spn_lname").show();
    }
    return isFormValid;
};

function OnProfilePicChange() {
    var input = document.getElementById("inputProfileImage");
    var imagereader = new FileReader();
    imagereader.readAsDataURL(input.files[0]);
    imagereader.onloadend = function(event) {
        var profileImage = document.getElementById("inputProfileImage");
        var displayImg = document.getElementById("imgProfile");
        displayImg.src = URL.createObjectURL(input.files[0]);
        profileImage.src = event.target.result;
       
    }
    
}