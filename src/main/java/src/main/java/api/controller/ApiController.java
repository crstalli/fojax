package src.main.java.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ApiController {

    @RequestMapping(value = "/api*", method = RequestMethod.GET)
    public @ResponseBody String api(HttpServletRequest request) {
        return "Success";
    }

}
