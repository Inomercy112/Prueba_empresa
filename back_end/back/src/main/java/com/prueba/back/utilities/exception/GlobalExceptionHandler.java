package com.prueba.back.utilities.exception;

import com.prueba.back.dto.ControllerResponse;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ControllerResponse> handleDatabaseException(DataAccessException ex) {
        ControllerResponse response = new ControllerResponse(
                "Database error: " + ex.getMostSpecificCause().getMessage(),
                null, // no hay data en caso de error
                HttpStatus.INTERNAL_SERVER_ERROR.value()
        );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }
}
