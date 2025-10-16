package bk.io.code.RockmartService.dto.responses;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class AuthenticationResponse {
    private String token;
}
