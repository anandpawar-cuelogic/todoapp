$("#btn_logout").on("click",function(e){
    e.preventDefault();
    sessionStorage.removeItem('loggedinuser');
    window.location='Index.html';
});
