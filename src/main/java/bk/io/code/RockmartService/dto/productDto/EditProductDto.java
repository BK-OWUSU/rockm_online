package bk.io.code.RockmartService.dto.productDto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EditProductDto {
    private Long id;
    private String name;
    private double price;
    private int quantity;
    private int restockLevel;
    private long user;
}
