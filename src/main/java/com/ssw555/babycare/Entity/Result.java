package com.ssw555.babycare.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Result<T> {

    private int code;

    private String msg;

    private T data;




}
