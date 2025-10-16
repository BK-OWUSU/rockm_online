package bk.io.code.RockmartService.dto.productDto;
import lombok.*;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SoldProductDto {
    private Long id;
    private String name;
    private Double price;
    private Integer availableQuantity;
    private Integer soldQuantity;
}
