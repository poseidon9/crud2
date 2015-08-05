package controllers;

import models.AccessToken;
import models.Photo;
import models.User;
import models.Event;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
import java.io.File;
import java.io.FileWriter;

/**
 * Created by aldo on 23/07/15.
 */
public class PhotoController extends Controller {

    public Result getAllPhotos(int userId, int eventId){
        if (!request().hasHeader("ACCESS_TOKEN")){
            return badRequest("ACCESS_TOKEN header is required.");
        }

        String token = request().getHeader("ACCESS_TOKEN");

        AccessToken accessToken = AccessToken.find.where()
                .eq("token", token)
                .findUnique();

        if (accessToken == null){
            return unauthorized("Invalid access token.");
        }

        User user = accessToken.getUser();
        Event event = Event.find.where()
                .eq("id", eventId)
                .findUnique();;

        if(!event.getGuest().contains(user)){
            return unauthorized("User not in this event.");
        }

       //List<Photo> photos = event.getPhotos();

   //     return ok(Json.toJson(events));

        //Photo photo = Json.fromJson(request().body().asJson(), Photo.class);
        //String base64 = photo.getBase64();
        //byte[] bytes = Base64.getDecoder().decode(base64);  //java.util.Base64
        return ok(); //return photo list
    }

    public Result uploadPhoto(int userId, int eventId){
        if (!request().hasHeader("ACCESS_TOKEN")){
            return badRequest("ACCESS_TOKEN header is required.");
        }

        String token = request().getHeader("ACCESS_TOKEN");

        AccessToken accessToken = AccessToken.find.where()
                .eq("token", token)
                .findUnique();

        if (accessToken == null){
            return unauthorized("Invalid access token.");
        }

        User user = accessToken.getUser();
        Event event = Event.find.where()
                .eq("id", eventId)
                .findUnique();;

        if(!event.getGuest().contains(user)){
            return unauthorized("User not in this event.");
        }

        Photo photo = Json.fromJson(request().body().asJson(), Photo.class);
        String extension = photo.getType();
        //verificar el tipo de foto: png jpg
        if (!(extension.equals("jpg") || extension.equals("png"))){
            return unauthorized("Invalid image type");
            photo.delete();
        }

        String base64 = photo.getBase64();
        byte[] bytes = Base64.getDecoder().decode(base64);        
        String random = UUID.randomUUID().toString();;//UUID
        String filename = random + "." + extension;
        photo.setUrl("/assets/photos/"+filename);

        try {
            File archivo = new File(filename);

            FileWriter escribir = new FileWriter(archivo, true);

            //Escribimos en el archivo con el metodo write
            escribir.write(bytes);

            //Cerramos la conexion
            escribir.close();
        }
        catch(Exception e) {
            return badRequest("Error while saving photo.");
            photo.delete();
        }

        event.setPhoto(Photo);


        //los bytes guardarlos en la carpeta public en una carpeta llamada photos, las fotos tendran un nombre aleatorio generado por UUID
        return ok();
    }
}
