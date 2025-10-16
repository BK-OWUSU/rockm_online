package bk.io.code.RockmartService.dto.productDto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductHistoryDto {
    private String product;
    private int oldQuantity;
    private int updateQuantity;
    private int newQuantity;
    private String date;
    private String user;
}
