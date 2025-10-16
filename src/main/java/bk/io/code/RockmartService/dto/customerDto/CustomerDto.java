package bk.io.code.RockmartService.dto.customerDto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerDto {
    private String name;
    private String email;
    private String contact;
}
