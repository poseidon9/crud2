package models;

/**
 * Created by aldo on 25/06/15.
 */
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.avaje.ebean.Model;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


@Entity
public class User extends  Model {
    @Id
    private Integer id;
    private String name;
    private String email;
    private String password;
    private String password2;

    //le agregamos una lista de eventos
    @JsonIgnore
    @ManyToMany(mappedBy = "guest")
    private List<Event>events;


    public static Finder<Integer,User> find= new Finder<>(User.class);

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }


    public String getPassword2() {
        return password2;
    }

    public void setPassword2(String password2) {
        this.password2 = password2;
    }


    //public static Finder<Integer, org.h2.engine.User>find=new Finder<Integer, org.h2.engine.User>()

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}
