var $formUpdate = $('#formBookUpdate');
var baseURL = document.URL;
var bookId = baseURL.substring(baseURL.lastIndexOf('=') + 1);

$().ready(function (){
    $.ajax({
        type: 'GET',
        url: '/books/' + bookId,
        success: function (books){
            console.log(books);
            document.getElementById("txtNameU").value = books.name;
            document.getElementById("txtISBNU").value = books.isbn;
            document.getElementById("txtEditorialU").value = books.editorial;
            document.getElementById("txtAuthorU").value = books.author;
        },

        error: function (books){
            console.log(books);
        }
    });
});

$formUpdate.submit(function(event) {
    event.preventDefault();
    //alert('hola');
    var $bookObject = new Object();
    $bookObject.name = document.getElementById("txtNameU").value;
    $bookObject.isbn = document.getElementById("txtISBNU").value;
    $bookObject.editorial = document.getElementById("txtEditorialU").value;
    $bookObject.author = document.getElementById("txtAuthorU").value;
    var $jsonData = JSON.stringify($bookObject);
    $.ajax({
        url: '/books/' + bookId,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        //data: $booksForm.serializeArray(),
        data: $jsonData,//JSON.stringify($d),//$booksForm.serialize(),
        success: function (data){
            console.log(data);
            //recargar();
        },
        error: function (data){
            console.log(data);
        }
    });
});