
package service;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import model.User;

@Stateless
@Path("model.user")
public class UserFacadeREST extends AbstractFacade<User> {

    @PersistenceContext(unitName = "AppSingUpSingInPU")
    private EntityManager em;

    public UserFacadeREST() {
        super(User.class);
    }

    // POST: registrar un usuario en la base de datos.
    @POST
    @Override
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(User entity) {
        super.create(entity);
    }

    // PUT: modificar un usuario existente.
    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Long id, User entity) {
        super.edit(entity);
    }

    // DELETE: eliminar un usuario.
    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        super.remove(super.find(id));
    }

    // GET: buscar un usuario por su ID.
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public User find(@PathParam("id") Long id) {
        return super.find(id);
    }

    // GET: comprobar si un correo electrónico ya está registrado.
    @GET
    @Path("email")
    @Produces(MediaType.TEXT_PLAIN)
    public boolean emailExists(@QueryParam("email") String email) {

        if (email == null || email.trim().isEmpty()) {
            return false;
        }

        Long count = em.createQuery(
                "SELECT COUNT(u) FROM User u "
                + "WHERE LOWER(u.email) = LOWER(:email)",
                Long.class)
                .setParameter("email", email.trim())
                .getSingleResult();

        return count > 0;
    }

    // GET: obtener todos los usuarios.
    @GET
    @Override
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<User> findAll() {
        return super.findAll();
    }

    // GET: obtener usuarios dentro de un rango.
    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<User> findRange(
            @PathParam("from") Integer from,
            @PathParam("to") Integer to) {

        return super.findRange(new int[]{from, to});
    }

    // GET: contar los usuarios registrados.
    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
}
