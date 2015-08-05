package models;

import com.avaje.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.ManyToOne;

/**
 * Created by aldo on 30/06/15.
 */
@Entity //java persistence
public class AccessToken extends Model {

    @Id
    private Integer id;
    private String token;
    @ManyToOne
    private User user;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }





    public static Finder<Integer,AccessToken> find= new Finder<>(AccessToken.class);


}
