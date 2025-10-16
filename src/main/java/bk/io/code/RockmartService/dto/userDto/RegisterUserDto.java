package bk.io.code.RockmartService.dto.userDto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RegisterUserDto {
    private String firstname;
    private String lastname;
    private String username;
    private String role;
}
