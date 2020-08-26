(function(){
    if (sessionStorage.getItem("loggedinuser") === null) {
        window.location='Index.html';
      }

      var todoList=JSON.parse(localStorage.getItem("todolist"));
      if(todoList){
          for (var i=0;i<todoList.length;i++){
              var rowhtml=`<tr>
              <td>${todoList[i].title}</td>
              <td>${todoList[i].targetDate}</td>
              <td>${(todoList[i].isDone)?"Yes":"No"}</td>
              <td>${(todoList[i].targetDate>Date())?"Yes":"No"}</td>
              <td><a href="edittodo.html?id=${todoList[i].id}">Edit</a></td>
              <td style="text-align:center"><input type="checkbox" data-id="${todoList[i].id}" name="chkdeletetodo" /></td>
              </tr>`
              $("#tbl_todolist tbody").append(rowhtml);
          }
      }
})();

$("#btndeletetodos").on("click",function(e){
    e.preventDefault();
    var todolist=JSON.parse(localStorage.getItem("todolist"));
    var newtodolist=todolist;
    var r = confirm("Are you sure you want to delete selected todos?");
    if (r == true) {
        $('input[name="chkdeletetodo"]:checked').each(function () {
            var id = $(this).data("id");
            newtodolist=newtodolist.filter(function(value, index, arr){ return value.id != id;});
        });
        localStorage.setItem("todolist",JSON.stringify(newtodolist));
        window.location="todos.html";
    } else {
        return false;
    }
});