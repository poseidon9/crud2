

function abrirVentana(url) {
    window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=400, height=400");
}
var $eventsDiv= $('#events');
var $eventsForm = $('#formEvent');


$().ready(function (){

  var iduser = JSON.parse(localStorage.getItem('id'));
  var mitoken = localStorage.getItem('token');

 $.ajax({
        url: '/users/'+iduser+'/events',
        type: 'GET',
         headers: {"ACCESS_TOKEN":mitoken},
        success: function (events){
            console.log(events);
            var html = '<table border=1 class="table table-bordered"><tr><td>Nombre</td><td>Fecha</td><td>Descripcion</td> <td>Acciones</td></tr>';
            for (var i = 0; i < events.length; i++){
                var trid = 'event-' + events[i].id;
                var event = events[i];
                html += '<tr id="' + trid + '"><td>' + event.name + '</td>';
                html += '<td>' + event.day + '</td>';
                html += '<td>' + event.description + '</td>';
                html += '<td> <button class="btn btn-info edit" data-id="' + event.id + '">Invitar </button>';
                html += '<button class="btn btn-danger delete" data-id="' + event.id + '">Foto</button></td></tr>';

             }
            html += "</table>";
            console.log(html);
            $eventsDiv.html(html);


            for (var i = 0; i < events.length; i++){
                var event = events[i];
                var trid = 'event-' + event.id;
                var $tr = $('#' + trid);
                var $editButton = $('.edit', $tr);
                var $deleteButton = $('.delete', $tr);
                $editButton.click(function(){
                   var id = $(this).attr('data-id');
                   alert('evento ' + $(this).attr("data-id"));
                   location.href = 'invite.html?event=' + id;
                });


                 $deleteButton.click(function(){
                                   var id = $(this).attr('data-id');
                                   alert('evento ' + $(this).attr("data-id"));
                                   location.href = 'photos.html?event=' + id;
                                });



                console.log(trid);
            }
        },
        error: function (){
            console.log('An error occurred')
        }
    });
});

function recargar() {

}




$eventsForm.submit(function(event) {
    event.preventDefault();

    var $eventObject = new Object();

    $eventObject.name = document.getElementById("txtName").value;
    $eventObject.day = document.getElementById("txtfecha").value;
    $eventObject.description = document.getElementById("txtdescription").value;



     if($eventObject.name == ""){
          alert("El campo Nombre no puede estar vacío.");
        return false;
         
      }
      if($eventObject.day == ""){
          alert("El campo fecha no puede estar vacio.");
       return false;
         
      }
 
      if( $eventObject.description  == "" ){
          alert("El campo descripcion no puede estar vacío."); return false;
         
      }


  else
  {
  var iduser = JSON.parse(localStorage.getItem('id'));
  var mitoken = localStorage.getItem('token');
  var $jsonData = JSON.stringify($eventObject);
    //alert('hola id'+mitoken);
    $.ajax({
        url: '/events/'+iduser,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
         headers: {"ACCESS_TOKEN":mitoken},

        //data: $eventsForm.serializeArray(),
        data: $jsonData,//JSON.stringify($d),//$eventsForm.serialize(),
        success: function (data){
            console.log(data);
             $('#msg').html('El evento se agrego correctamente!')
             //recargar();
             window.opener.location.href="dashboard.html";
             self.close();
        },
        error: function (data){
            console.log(data);
        }
    });
    }
});


{
  "Event":{
    "title": = "cumpleaños"
    "descripcion":= "cumpleaños de timmy"
    "date": = "11/10/2014"
  }
}


