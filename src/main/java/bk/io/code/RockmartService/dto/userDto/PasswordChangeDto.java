package bk.io.code.RockmartService.dto.userDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PasswordChangeDto {
    private Long worker;
    private String currentPassword;
    private String newPassword;
}
