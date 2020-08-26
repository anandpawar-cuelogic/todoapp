(function(){
    const params = new URLSearchParams(window.location.search);
    var id=params.get("id");
    var todos=JSON.parse(localStorage.getItem("todolist"));
    var tobeedittodo;
    for (var i=0;i<todos.length;i++){
        if(todos[i].id==id){
            tobeedittodo=todos[i];
            break;
        }
    }
    $("#inputId").val(tobeedittodo.id);
    $("#inputTitle").val(tobeedittodo.title);
    $("#inputTargetDate").val(tobeedittodo.targetDate);
})();

$("#btnEditTodo").on("click",function(e){
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    var id=params.get("id");
    var todos=JSON.parse(localStorage.getItem("todolist"));

    var tobeupdatetodo={
        id:$("#inputId").val(),
        title:$("#inputTitle").val(),
        targetDate:$("#inputTargetDate").val(),
        isDone:false
    }
    
    if(validatetodoform(tobeupdatetodo)){
        for (var i=0;i<todos.length;i++){
            if(todos[i].id==id){
                //todos[i].id=tobeupdatetodo.id;
                todos[i].title=tobeupdatetodo.title;
                todos[i].targetDate=tobeupdatetodo.targetDate;
                todos[i].isDone=tobeupdatetodo.isDone
                break;
            }
        }
        localStorage.setItem("todolist",JSON.stringify(todos));
        window.location="todos.html";
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