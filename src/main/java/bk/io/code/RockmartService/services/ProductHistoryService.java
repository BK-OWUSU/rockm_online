package bk.io.code.RockmartService.services;

import bk.io.code.RockmartService.dto.productDto.ProductHistoryDto;
import bk.io.code.RockmartService.dto.saleDto.SalesDateRangeDto;
import bk.io.code.RockmartService.repositories.ProductHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductHistoryService {
    private final ProductHistoryRepository historyRepository;
    public List<ProductHistoryDto> getDailyProductHistory() {
        List<Object[]> list = historyRepository.findProductHistoryByDate(LocalDate.now());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm a");
        return list.stream().map(
                row-> {
                    LocalDateTime dateTime = (LocalDateTime) row[4];
                    String formattedDate = dateTime.format(formatter);
                    return new ProductHistoryDto(
                            (String) row[0],
                            ((Number) row[1]).intValue(),
                            ((Number) row[2]).intValue(),
                            ((Number) row[3]).intValue(),
                            formattedDate,
                            (String) row[5]
                    );
                }).collect(Collectors.toList());
    }
    public List<ProductHistoryDto> getAllProductHistory() {
        List<Object[]> list = historyRepository.findAllProductHistory();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm a");
        return list.stream().map(
                row-> {
                    LocalDateTime dateTime = (LocalDateTime) row[4];
                    String formattedDate = dateTime.format(formatter);
                    return new ProductHistoryDto(
                            (String) row[0],
                            ((Number) row[1]).intValue(),
                            ((Number) row[2]).intValue(),
                            ((Number) row[3]).intValue(),
                            formattedDate,
                            (String) row[5]
                    );
                }).collect(Collectors.toList());
    }
    public List<ProductHistoryDto> getProductHistoryByDate(SalesDateRangeDto salesDateRangeDto) {
        List<Object[]> list = historyRepository.findProductHistoryByDate(salesDateRangeDto.getStartDate());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm a");
        return list.stream().map(
                row-> {
                    LocalDateTime dateTime = (LocalDateTime) row[4];
                    String formattedDate = dateTime.format(formatter);
                    return new ProductHistoryDto(
                            (String) row[0],
                            ((Number) row[1]).intValue(),
                            ((Number) row[2]).intValue(),
                            ((Number) row[3]).intValue(),
                            formattedDate,
                            (String) row[5]
                    );
                }).collect(Collectors.toList());
    }
}
