package controllers;
import models.AccessToken;
import models.Credentials;
import models.User;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.List;
import java.util.UUID;

/**
 * Created by aldo on 30/06/15.
 */
public class AccessTokenController extends Controller {

    public Result generateAccess()
    {

       Credentials credentials = Json.fromJson(request().body().asJson(), Credentials.class);

       // User user = Json.fromJson(request().body().asJson(), User.class);


        User user=User.find.where().eq("email", credentials.getEmail()).eq("password", credentials.getPassword()).findUnique();
        if (user==null)
        {
            return unauthorized();

        }
        AccessToken accessToken= new AccessToken();
        String token= UUID.randomUUID().toString();

        accessToken.setToken(token);
        accessToken.setUser(user);
        accessToken.save();

        return created(Json.toJson(accessToken));
        //return ok(Json.toJson(accessToken));

    }

    public Result getAllTokens(){
        List<AccessToken> tokens = AccessToken.find.all();
        return ok(Json.toJson(tokens));
    }
}
