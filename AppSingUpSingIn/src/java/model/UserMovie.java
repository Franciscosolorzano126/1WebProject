/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@Entity
@Table(name = "user_movie")
@XmlRootElement
public class UserMovie implements Serializable {

    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private UserMovieId id;

    public UserMovie() {
    }

    public UserMovie(UserMovieId id) {
        this.id = id;
    }

    public UserMovieId getId() {
        return id;
    }

    public void setId(UserMovieId id) {
        this.id = id;
    }
}

