package src.main.java.controller.api.exceptions;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import src.main.java.error.ErrorResource;
import src.main.java.error.FieldErrorResource;
import src.main.java.exception.InvalidRequestException;

@ControllerAdvice(annotations = RestController.class)
public class FojaxExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ InvalidRequestException.class })
    protected ResponseEntity<Object> handleInvalidRequest(Exception e,
            WebRequest request) {
        InvalidRequestException ire = (InvalidRequestException) e;
        List<FieldErrorResource> fieldErrorResources = new ArrayList<FieldErrorResource>();

        List<FieldError> fieldErrors = ire.getErrors().getFieldErrors();
        for (FieldError fieldError : fieldErrors) {
            FieldErrorResource fieldErrorResource = new FieldErrorResource();
            fieldErrorResource.setResource(fieldError.getObjectName());
            fieldErrorResource.setField(fieldError.getField());
            fieldErrorResource.setCode(fieldError.getCode());
            fieldErrorResource.setMessage(fieldError.getDefaultMessage());
            fieldErrorResources.add(fieldErrorResource);
        }

        ErrorResource error = new ErrorResource(
                HttpStatus.BAD_REQUEST.toString(), ire.getMessage());
        error.setFieldErrors(fieldErrorResources);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return handleExceptionInternal(e, error, headers,
                HttpStatus.UNPROCESSABLE_ENTITY, request);
    }

}
