package bk.io.code.RockmartService.dto.responses;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomResponse {
    private String message;
    private Boolean status;
}
