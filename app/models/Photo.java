package models;

import com.avaje.ebean.Model;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by aldo on 23/07/15.
 */
public class Photo extends Model {
    @Id
    private Integer id;

    private String title;
    private String description;
    private String base64;
    private String type;

    @Temporal(TemporalType.DATE)// convetir de cadenas de fecha a objetos DATE
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy/mm/dd")
    private Date uploadAt;

    @JsonIgnore
    private String url;

    public static Finder<Integer,Event> find= new Finder<>(Event.class);

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBase64() {
        return base64;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getUploadAt() {
        return uploadAt;
    }

    public void setUploadAt(Date uploadAt) {
        this.uploadAt = uploadAt;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    /*public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
*/
}
