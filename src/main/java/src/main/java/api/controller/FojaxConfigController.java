package src.main.java.api.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import src.main.java.controller.api.BaseAPIController;
import src.main.java.model.Endpoint;

@Controller
public class FojaxConfigController extends BaseAPIController {

    @RequestMapping(value = "/fojax/endpoints", method = RequestMethod.GET)
    public @ResponseBody List<Endpoint> getEndpoints(HttpServletRequest request) {
        List<Endpoint> l = new ArrayList<Endpoint>();
        l.add(new Endpoint());
        return l;
    }

}
