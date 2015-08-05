var baseURL = document.URL;
var eventId = baseURL.substring(baseURL.lastIndexOf('=') + 1);
   // alert('llega ' +eventId);
var $guestDiv= $('#events');
var $guestForm = $('#formGuest');

$guestForm.submit(function(event) {
    event.preventDefault();
    var $guestObject = new Object();
    $guestObject.email = document.getElementById("email").value; // guest

     if($guestObject.email == ""){
          alert("El correo no puede estar vacio.");
        return false;
         
      }

  else
  {
  //var iduser = JSON.parse(localStorage.getItem('id'));

  var iduser = localStorage.getItem('id');
  var mitoken = localStorage.getItem('token');
  //var $jsonData = JSON.stringify($guestObject);
  var $jsonData = JSON.stringify($guestObject.email);
  //alert("aqui"+$jsonData);
    //alert('hola id'+mitoken);
    $.ajax({
        url: '/users/'+iduser+'/events/'+eventId,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
         headers: {"ACCESS_TOKEN":mitoken},
         data: $jsonData,

        success: function (data){
            console.log(data);
             $('#msg').html('El invitado se agrego correctamente!')
             //recargar();
             //window.opener.location.href="dashboard.html";
             //self.close();
        },
        error: function (data){
            console.log(data);
        }
    });
    }
});
