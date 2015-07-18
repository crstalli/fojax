package src.main.java.controller.views;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.HandlerMapping;

@Controller
public class MainController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String main(HttpServletRequest request) {
        return "index";
    }

    @RequestMapping(value = "/config", method = RequestMethod.GET)
    public String configMain(HttpServletRequest request) {
        return "config";
    }

    @RequestMapping(value = "/config/**", method = RequestMethod.GET)
    public String config(HttpServletRequest request) {
        String restOfTheUrl = (String) request
                .getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
        restOfTheUrl = restOfTheUrl.substring(restOfTheUrl.indexOf("/config/")
                + "/config/".length());
        return "redirect:/config#/" + restOfTheUrl;
    }
}
