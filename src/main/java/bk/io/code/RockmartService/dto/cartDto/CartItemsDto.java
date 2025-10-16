package bk.io.code.RockmartService.dto.cartDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CartItemsDto {
    private List<CartItemDto> cartItems;
    private double totalAmount;
    private Long worker;
    private String customerName;
    private String customerContact;
}
