package bk.io.code.RockmartService.dto.cartDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto {
    private Long id;
    private int quantity;
}
