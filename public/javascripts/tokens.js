var $tokensDiv = $('#tokens');

var $tokenForm = $('#formToken');

$().ready(function (){

});

function recargar() {
    $.ajax({
        url: '/access_tokens',
        type: 'POST',
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
            $tokensDiv.html(html);


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



$tokenForm.submit(function(event) {
    event.preventDefault();
    //alert('hola');
    var $tokenObject = new Object();
    $tokenObject.password = document.getElementById("txtpassword").value;


    $tokenObject.email = document.getElementById("txtmail").value;



      if($tokenObject.password == ""){
          alert("El campo password no puede estar vacío.");
       return false;
         
      }

      if( $tokenObject.email  == "" ){
          alert("El campo email no puede estar vacío."); return false;
         
      }


  else
  {
    var $jsonData = JSON.stringify($tokenObject);
    var url="dashboard.html";

    $.ajax({
        url: '/access_tokens',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        //data: $usersForm.serializeArray(),
        data: $jsonData,//JSON.stringify($d),//$usersForm.serialize(),
        success: function (data){
           // console.log(data);

             // var html3 = 'localStorage.setItem("token" ';
              // html3 += ',"' + data.getToken() + '")';

           localStorage.setItem("name", data.user.name);
           localStorage.setItem("id", data.user.id);
           localStorage.setItem("token", data['token']);
           //console.log(localStorage.getItem("tok"));

            $(location).attr('href',url);
            //recargar();
        },
        error: function (data){
            console.log(data);


        }
    });
    }
});
//$booksDiv.html('Hola mundo');