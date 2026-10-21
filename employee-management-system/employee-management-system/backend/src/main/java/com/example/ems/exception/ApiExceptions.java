package com.example.ems.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptions {

    public static class NotFound extends RuntimeException {
        public NotFound(String m) { super(m); }
    }

    public static class Conflict extends RuntimeException {
        public Conflict(String m) { super(m); }
    }

    @ExceptionHandler(NotFound.class)
    public ResponseEntity<Map<String, String>> notFound(NotFound e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
    }

    @ExceptionHandler(Conflict.class)
    public ResponseEntity<Map<String, String>> conflict(Conflict e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> invalid(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(f -> errors.put(f.getField(), f.getDefaultMessage()));
        return ResponseEntity.badRequest().body(Map.of("message", "Validation failed", "errors", errors));
    }
}
