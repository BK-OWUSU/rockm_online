package bk.io.code.RockmartService.dto.customerDto;
import bk.io.code.RockmartService.model.Customer;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerWithSaleCountDto {
    private Customer customer;
    private Long saleCount;
}
