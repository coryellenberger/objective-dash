package com.dashboard;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

/**
 * Created by Cory Ellenberger on 7/30/2018.
 */
@RequestMapping("/api/example")
@RestController
public class ExampleController {

    @RequestMapping(method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public Response index() {
        ArrayList<String> resp = new ArrayList<>();
        resp.add("ABC");
        resp.add("123");
        resp.add("XYZ");
        resp.add("789");
        return Response.success("Example Controller", resp);
    }
}
