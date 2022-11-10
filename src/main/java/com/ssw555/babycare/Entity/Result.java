package com.ssw555.babycare.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Result<T> {

    private int code;

    private String msg;

    private T data;



    public static Result success(String msg, Object data) {
        return new Result(200,msg,data);
    }

    public static Result success(String msg) {
        return new Result(200,msg,null);
    }

    public static Result fail(int code, String msg) {
        return new Result(code, msg, null);
    }
}
