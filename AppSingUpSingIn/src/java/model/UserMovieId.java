/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserMovieId implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long idUser;

    private Integer idMovie;

    public UserMovieId() {
    }

    public UserMovieId(Long idUser, Integer idMovie) {
        this.idUser = idUser;
        this.idMovie = idMovie;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Integer getIdMovie() {
        return idMovie;
    }

    public void setIdMovie(Integer idMovie) {
        this.idMovie = idMovie;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUser, idMovie);
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }

        if (!(object instanceof UserMovieId)) {
            return false;
        }

        UserMovieId other = (UserMovieId) object;

        return Objects.equals(idUser, other.idUser)
                && Objects.equals(idMovie, other.idMovie);
    }
}

