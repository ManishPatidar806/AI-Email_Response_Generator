package com.email.writer.app.DTO;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class EmailRequest {

    @JsonProperty("originalEmail")
    private String emailContent;
    private String tone;
}
