window.addEventListener("DOMContentLoaded",function(){
    if (sessionStorage.getItem("loggedinuser") === null) {
        window.location='login.html';
      }
    const params = new URLSearchParams(window.location.search);
    var id=params.get("id");
    var users = JSON.parse(localStorage.getItem("userlist"));
        var loggedinuser=JSON.parse(sessionStorage.getItem("loggedinuser"));
        var todos=users.find( a => a.email == loggedinuser.email).todos;
    var tobeedittodo;
    for (var i=0;i<todos.length;i++){
        if(todos[i].id==id){
            tobeedittodo=todos[i];
            break;
        }
    }
    document.getElementById("inputId").value=tobeedittodo.id;
    document.getElementById("inputTitle").value=tobeedittodo.title;
    document.getElementById("inputTargetDate").value=tobeedittodo.targetDate;
    document.getElementById("rd_public_"+tobeedittodo.isPublic).checked =true;

    document.getElementById("btnEditTodo").addEventListener("click",editTodo)
})


function editTodo(e){
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    var id=params.get("id");
    var users = JSON.parse(localStorage.getItem("userlist"));
        var loggedinuser=JSON.parse(sessionStorage.getItem("loggedinuser"));
        var todos=users.find( a => a.email == loggedinuser.email).todos;

    var tobeupdatetodo={
        id:document.getElementById("inputId").value,
        title:document.getElementById("inputTitle").value,
        targetDate:document.getElementById("inputTargetDate").value,
        isDone:false,
        isPublic:document.querySelector('input[name="public"]:checked').value
    }
    
    if(validatetodoform(tobeupdatetodo)){
        for (var i=0;i<todos.length;i++){
            if(todos[i].id==id){
                //todos[i].id=tobeupdatetodo.id;
                todos[i].title=tobeupdatetodo.title;
                todos[i].targetDate=tobeupdatetodo.targetDate;
                todos[i].isDone=tobeupdatetodo.isDone
                todos[i].isPublic=tobeupdatetodo.isPublic
                break;
            }
        }
        for(var i=0;i<users.length;i++){
            if(users[i].email==loggedinuser.email){
                users[i].todos=todos;
                break;
            }
        }
        localStorage.setItem("userlist",JSON.stringify(users));
        alert("Todo item updated succesfully!");
        window.location="todos.html";
    }
};

function validatetodoform(new_todo){
    $("span.text-danger").hide();
    var isFormValid = true;
    if(!new_todo.title){
        isFormValid=false;
        document.getElementById("spn_title").style.display="block";
    }
    if(!new_todo.targetDate){
        isFormValid=false;
        document.getElementById("spn_targetdate").style.display="block";
    }
    else if(!validatedate(new_todo.targetDate)){
        isFormValid=false;
        document.getElementById("spn_targetdateinvalid").style.display="block";
    }
    return isFormValid;
}

function validatedate(targetdate){
    var today=new Date();
    today.setHours(0, 0, 0, 0); 
    if(stringToDate(targetdate,"yyyy-mm-dd","-") < today){
        return false;
    }
    return true;
}

function stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            formatedDate.setHours(0, 0, 0, 0)
            return formatedDate;
}