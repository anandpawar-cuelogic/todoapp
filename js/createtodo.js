(function(){
    if(localStorage.getItem("lasttodoid")==null){
        localStorage.setItem("lasttodoid",0);
    }

    if (sessionStorage.getItem("loggedinuser") === null) {
        window.location='login.html';
      }
})();

window.addEventListener("DOMContentLoaded",function(){
    document.getElementById("btnCreateTodo").addEventListener("click",createToDo);

    var today = new Date().toISOString().split('T')[0];
    document.getElementById("inputTargetDate").setAttribute('min', today);
    document.getElementById("inputReminderDate").setAttribute('min', today);
})

function createToDo(e){
    e.preventDefault();
    var lasttodoid=Number(localStorage.getItem("lasttodoid"));

    var isReminder=document.querySelector('input[name="reminder"]:checked').value
    var reminderDate;
    if(isReminder=='yes'){
        reminderDate=document.getElementById("inputReminderDate").value;
    }
    else{
        reminderDate='';
    }
    var selected_Categories=document.querySelectorAll('input[name="inputCategory"]:checked');
    var catVals = [];
     for(var i = 0; i < selected_Categories.length; i++)
     {
        catVals.push(selected_Categories[i].value);
     }
    var new_todo={
        id:(lasttodoid+1),
        title:document.getElementById("inputTitle").value,
        targetDate:document.getElementById("inputTargetDate").value,
        isDone:false,
        isPublic:document.querySelector('input[name="public"]:checked').value,
        reminderDate:reminderDate,
        categories:catVals
    }

    if(validatetodoform(new_todo)){
        var users = JSON.parse(localStorage.getItem("userlist"));
        var loggedinuser=JSON.parse(sessionStorage.getItem("loggedinuser"));
        var todos=users.find( a => a.email == loggedinuser.email).todos;
        if(!todos){
            todos=[];
        }
        
        todos.push(new_todo);
        for(var i=0;i<users.length;i++){
            if(users[i].email==loggedinuser.email){
                users[i].todos=todos;
                break;
            }
        }
        localStorage.setItem("userlist",JSON.stringify(users));
        localStorage.setItem("lasttodoid",lasttodoid+1);
        alert("Todo item added succesfully!")
        window.location="todos.html";
        
    }
};

function validatetodoform(new_todo){
    var spansToHide = document.getElementsByClassName("text-danger");
    for(var i = 0; i < spansToHide.length; i++){
        spansToHide[i].style.display = "none";
    }
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
    var isReminder=document.querySelector('input[name="reminder"]:checked').value
    if(isReminder=='yes'){
        if(!new_todo.reminderDate){
            isFormValid=false;
            document.getElementById("spn_reminderdate").style.display="block";
        }
        else if(!validatedate(new_todo.reminderDate)){
            isFormValid=false;
            document.getElementById("spn_reminderdateinvalid").style.display="block";
        }
    }
    if(!new_todo.categories || new_todo.categories.length==0){
        isFormValid=false;
         document.getElementById("spn_categories").style.display="block";
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

function handleReminderClick(radioReminder){
    if(radioReminder.value=='yes'){
        document.getElementById("div_reminderDt").style.display="block";
    }
    else{
        document.getElementById("div_reminderDt").style.display="none";
    }
}