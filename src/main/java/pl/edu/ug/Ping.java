package pl.edu.ug;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/api")
public class Ping {

    @GET
    @Path("/ping")
    public Response ping() {
        return Response
                .ok()
                .entity("pong")
                .build();
    }
}
