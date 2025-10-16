package bk.io.code.RockmartService.dto.saleDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SalesDateRangeDto {
    private LocalDate startDate;
    private LocalDate endDate;
}
