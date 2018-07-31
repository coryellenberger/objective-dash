package com.dashboard;

/**
 * Created by Cory Ellenberger on 7/30/2018.
 */
public class Response {

    private Status status;

    private Object value;

    private String message;

    protected Response(Status status, String message, Object value) {
        this.status = status;
        this.message = message;
        this.value = value;
    }

    public static Response success(String message) {
        return new Response(Status.SUCCESS, message, null);
    }

    public static Response success(String message, Object value) {
        return new Response(Status.SUCCESS, message, value);
    }

    public static Response success(Object value) {
        return new Response(Status.SUCCESS, "Success", value);
    }

    public Status getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public Object getValue() {
        return value;
    }
}
