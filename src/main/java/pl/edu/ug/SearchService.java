package pl.edu.ug;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.time.Duration;

import static java.net.http.HttpResponse.BodyHandlers;

@Path("/photos")
public class SearchService {

    private static String URL = "https://api.unsplash.com/search/photos?query=%s&perPage=30&page=%s";
    private static String KEY = "VPeVpItnfrIKzty6dGNidtHVz0vGHvR7653ykSYUFVI";

    @GET
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    public Response search(
            @QueryParam("query") String query,
            @QueryParam("page") String page
    ) throws IOException, InterruptedException {

        if (query == null) {
            return Response
                    .status(400)
                    .entity(new Message("Bad request: ?query required"))
                    .build();
        }

        var client = HttpClient.newHttpClient();

        var request = HttpRequest
                .newBuilder()
                .uri(URI.create(String.format(URL, query, page)))
                .timeout(Duration.ofSeconds(2L))
                .header("Content-Type", "application/json")
                .header("Authorization", String.format("Client-ID %s", KEY))
                .GET()
                .build();

        var response = client.send(request, BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            return Response
                    .status(500)
                    .entity(new Message("Something went wrong!"))
                    .build();
        }

        var body = response.body();

        return Response
                .status(200)
                .header("Access-Control-Allow-Origin", "*")
                .entity(body)
                .build();
    }
}
