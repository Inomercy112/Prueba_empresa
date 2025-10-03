package com.prueba.back.dto;

public record ControllerResponse(String message, Object data, int status) {
}
