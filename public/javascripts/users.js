var $usersDiv = $('#users');
var $usersForm = $('#formUser');

$().ready(function (){

});

function recargar() {
    $.ajax({
        url: '/users',
        type: 'GET',
        success: function (users){
            console.log(users);
            //books = JSON.parse(users);
            var html = '<table border=1 class="table table-bordered">';
            //html ='<tr border=1 class="table table-bordered ><td>Nombre</td><td>Password</td><td>Email</td></tr>';
            for (var i = 0; i < users.length; i++){
                var trid = 'user-' + users[i].id;
                var user = users[i];
                html += '<tr id="' + trid + '"><td>' + user.name + '</td>';
                html += '<td>' + user.password + '</td>';
                html += '<td>' + user.email + '</td>';
                html += '<td><button class="btn btn-info edit" data-id="' + user.id + '">Editar</button></td>';
                html += '<td><button class="btn btn-danger delete" data-id="' + user.id + '">Eliminar</button></td></tr>';
            }
            html += "</table>"
            console.log(html);
            $usersDiv.html(html);


            for (var i = 0; i < users.length; i++){
                var user = users[i];
                var trid = 'user-' + user.id;
                var $tr = $('#' + trid);
                var $editButton = $('.edit', $tr);
                var $deleteButton = $('.delete', $tr);
                $editButton.click(function(){
                   var id = $(this).attr('data-id');
                   //alert('Edit book ' + $(this).attr("data-id"));
                   location.href = 'update.html?id=' + id;
                });


                $deleteButton.click(function(){
                   var id = $(this).attr('data-id');
                   //alert('Delete book ' + $(this).attr("data-id"));
                   $.ajax({
                        type: 'DELETE',
                        url: '/users/' + id
                   });
                   recargar();
                });
                //console.log(trid);
            }
        },
        error: function (){
            console.log('An error occurred')
        }
    });
}


function validaCorreo(valor)
{
	var reg=/(^[a-zA-Z0-9._-]{1,30})@([a-zA-Z0-9.-]{1,30}$)/;
	if(reg.test(valor)) return true;
	else return false;
}
$usersForm.submit(function(event) {
    event.preventDefault();
    //alert('hola');
    var $userObject = new Object();
    $userObject.name = document.getElementById("txtName").value;
    $userObject.password = document.getElementById("txtpassword").value;

    $userObject.password2 = document.getElementById("txtpassword2").value;

    $userObject.email = document.getElementById("txtmail").value;


     if($userObject.name == ""){
          alert("El campo Nombre no puede estar vacío.");
        return false;
         
      }
      if($userObject.password == ""){
          alert("El campo password no puede estar vacío.");
       return false;
         
      }
   if($userObject.password != $userObject.password2){
          alert("contraseñas diferentes.");
        return false;

         
      }
      if( $userObject.email  == "" ){
          alert("El campo email no puede estar vacío."); return false;
         
      }


  else
  {
    var $jsonData = JSON.stringify($userObject);
    $.ajax({
        url: '/users',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        //data: $usersForm.serializeArray(),
        data: $jsonData,//JSON.stringify($d),//$usersForm.serialize(),
        success: function (data){
            console.log(data);
            recargar();
        },
        error: function (data){
            console.log(data);
        }
    });
    }
});
//$booksDiv.html('Hola mundo');