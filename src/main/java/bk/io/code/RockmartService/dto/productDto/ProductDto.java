package bk.io.code.RockmartService.dto.productDto;



import bk.io.code.RockmartService.model.Category;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductDto {
    private String name;
    private Category category;
    private double price;
    private int quantity;
    private int restockLevel;
}
