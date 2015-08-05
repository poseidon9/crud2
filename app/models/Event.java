package models;

import com.avaje.ebean.Model;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.persistence.*;
import java.util.Date;
import java.util.List;


/**
 * Created by aldo on 07/07/15.
 */
@Entity
public class Event extends Model{


    @Id
    private Integer id;

    private String name;
    //anotation sql time,date,datetime
    @Temporal(TemporalType.DATE)// convetir de cadenas de fecha a objetos DATE
    @JsonFormat (shape=JsonFormat.Shape.STRING, pattern = "yyyy/mm/dd")
    private Date day;
    private String description;

    //cunado convierta a json el evento lo ignore
    @JsonIgnore
    @ManyToOne //1 usuario puede tener muchos eventos
    private User host;

    @JsonIgnore
    @ManyToMany
    private List<User> guest;

    @JsonIgnore
    @ManyToOne
    private List<Photo> photos;


    public User getHost() {
        return host;
    }

    public void setHost(User host) {
        this.host = host;
    }

    public List<User> getGuest() {
        return guest;
    }

    public void setGuest(List<User> guest) {
        this.guest = guest;
    }
    
    public List<Photo> getPhotos() {
        return photos;
    }

    public void setPhoto(List<Photo> photos) {
        this.photos = photos;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    // el finder solo lo uso para acceder a lso registros con consultas directas.

    public static Finder<Integer,Event> find= new Finder<>(Event.class);

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDay() {
        return day;
    }

    public void setDay(Date day) {
        this.day = day;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
