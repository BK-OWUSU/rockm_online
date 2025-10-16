package bk.io.code.RockmartService.dto.productDto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductStockDto {
    private Long id;
    private String name;
    private int quantity;
    private long user;
}
