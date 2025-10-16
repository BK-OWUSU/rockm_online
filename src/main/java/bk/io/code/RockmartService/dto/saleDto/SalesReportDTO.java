package bk.io.code.RockmartService.dto.saleDto;

import lombok.*;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SalesReportDTO {
    private String category;
    private int totalQuantity;
    private double totalAmount;
}
