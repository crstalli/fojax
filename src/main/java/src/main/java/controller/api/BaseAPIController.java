package src.main.java.controller.api;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;

import src.main.java.controller.BaseController;

@Controller
public class BaseAPIController extends BaseController {
    protected Logger logger = Logger.getLogger(this.getClass());

}
