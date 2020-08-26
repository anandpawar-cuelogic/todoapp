(function(){
    //$("#inputTargetDate").datepicker({ dateFormat: "mm/dd/yyyy" }); 
    if(localStorage.getItem("lasttodoid")==null){
        localStorage.setItem("lasttodoid",0);
    }
})();

$("#btnCreateTodo").on("click",function(e){
    e.preventDefault();
    var lasttodoid=Number(localStorage.getItem("lasttodoid"));
    var new_todo={
        id:(lasttodoid+1),
        title:$("#inputTitle").val(),
        targetDate:$("#inputTargetDate").val(),
        isDone:false
    }

    if(validatetodoform(new_todo)){
        var todolist;
        if(localStorage.getItem("todolist")===null){
            todolist=[];
        }
        else{
            todolist=JSON.parse(localStorage.getItem("todolist"));
        }
        todolist.push(new_todo);
        localStorage.setItem("todolist",JSON.stringify(todolist));
        window.location="todos.html";
        localStorage.setItem("lasttodoid",lasttodoid+1);
    }
});

function validatetodoform(new_todo){
    $("span.text-danger").hide();
    var isFormValid = true;
    if(!new_todo.title){
        isFormValid=false;
        $("#spn_title").show();
    }
    if(!new_todo.targetDate){
        isFormValid=false;
        $("#spn_targetdate").show();
    }
    else if(!validatedate(new_todo.targetDate)){
        isFormValid=false;
        $("#spn_targetdateinvalid").show();
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