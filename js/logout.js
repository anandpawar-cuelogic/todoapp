 window.addEventListener("DOMContentLoaded",function(){
     document.getElementById("btn_logout").addEventListener("click",function(e){
        e.preventDefault();
        sessionStorage.removeItem('loggedinuser');
        window.location='login.html';
     });
 })