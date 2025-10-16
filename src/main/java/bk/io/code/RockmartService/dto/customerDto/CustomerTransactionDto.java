package bk.io.code.RockmartService.dto.customerDto;

import bk.io.code.RockmartService.model.Customer;
import lombok.*;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerTransactionDto {
    private Long saleId;
    private Customer customer;
    private String productName;
    private String quantity;
    private String productPrice;
    private String totalTransaction;
    private String date;
    private String user;
}
