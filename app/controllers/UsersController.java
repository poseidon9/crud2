package controllers;



import models.User;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import java.util.List;

/**
 * Created by aldo on 29/06/15.
 */
public class UsersController extends Controller {

    public Result createUser(){
        User user = Json.fromJson(request().body().asJson(), User.class);
        user.save();
        return ok(Json.toJson(user));
    }

    public Result getAllUsers(){
        List<User> users = User.find.all();
        return ok(Json.toJson(users));
    }

}
