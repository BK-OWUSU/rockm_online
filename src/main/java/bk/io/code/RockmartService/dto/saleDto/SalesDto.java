package bk.io.code.RockmartService.dto.saleDto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class SalesDto {
    private Long id;
    private int soldQuantity;
}
