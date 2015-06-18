package src.main.java.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ConfigController {

    @RequestMapping(value = "/config*", method = RequestMethod.GET)
    public String api(HttpServletRequest request) {
        return "config";
    }

}
