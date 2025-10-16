package bk.io.code.RockmartService.services;



import bk.io.code.RockmartService.dto.customerDto.CustomerTransactionDto;
import bk.io.code.RockmartService.dto.productDto.SoldProductDto;
import bk.io.code.RockmartService.dto.saleDto.SalesDateRangeDto;
import bk.io.code.RockmartService.dto.saleDto.SalesReportDTO;
import bk.io.code.RockmartService.model.Customer;
import bk.io.code.RockmartService.model.SaleTransactions;
import bk.io.code.RockmartService.repositories.SaleRepository;
import bk.io.code.RockmartService.repositories.SaleTransactionsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SaleTransactionService {
    private final SaleTransactionsRepository transactionsRepository;
    private final SaleRepository saleRepository;
    public int totalProductQuantitySold(){
        List<SaleTransactions> transactionsList = transactionsRepository.findAllBySaleDate(LocalDate.now());
        return transactionsList
                .stream()
                .mapToInt(SaleTransactions::getQuantity).sum();
    }

    public List<SalesReportDTO> getDailySalesReport(LocalDate date) {
        List<Object[]> result = transactionsRepository.getSalesReportsByDate(date);
        return result.stream()
                .map(row -> new SalesReportDTO(
                        (String) row[0],
                        ((Number) row[1]).intValue(),
                        ((Number) row[2]).doubleValue()
                ))
                .collect(Collectors.toList());
    }
     public List<SalesReportDTO> findAllBySaleDateBetween(SalesDateRangeDto dateRangeDto) {
        List<Object[]> result = transactionsRepository.findAllBySaleDateBetween(dateRangeDto.getStartDate(), dateRangeDto.getEndDate());
        return result.stream()
                .map(row -> new SalesReportDTO(
                        (String) row[0],
                        ((Number) row[1]).intValue(),
                        ((Number) row[2]).doubleValue()
                ))
                .collect(Collectors.toList());
    }

    public Long countSaleTransaction() {
        return saleRepository.countByDate(LocalDate.now());
    };

    public List<CustomerTransactionDto> getDailyTransactions() {
        List<Object[]> list = transactionsRepository.getDailySaleTransaction(LocalDate.now());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm a");
        return list.stream().map(
                row-> {
                    LocalDateTime dateTime = (LocalDateTime) row[6];
                    String formattedDate = dateTime.format(formatter);
                    return new CustomerTransactionDto(
                            ((Number) row[0]).longValue(),
                            (Customer) row[1],
                            (String) row[2],
                            (String) row[3],
                            (String) row[4],
                            (String) row[5],
                            formattedDate,
                            (String) row[7]
                    );
                }).collect(Collectors.toList());
    }

    public List<CustomerTransactionDto> getAllSaleTransaction() {
        List<Object[]> list = transactionsRepository.getAllSaleTransaction();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm a");
        return list.stream().map(
                row-> {
                    LocalDateTime dateTime = (LocalDateTime) row[6];
                    String formattedDate = dateTime.format(formatter);
                    return new CustomerTransactionDto(
                            ((Number) row[0]).longValue(),
                            (Customer) row[1],
                            (String) row[2],
                            (String) row[3],
                            (String) row[4],
                            (String) row[5],
                            formattedDate,
                            (String) row[7]
                    );
                }).collect(Collectors.toList());
    }
    public List<CustomerTransactionDto> getDateSaleTransaction(LocalDate date) {
        List<Object[]> list = transactionsRepository.getDailySaleTransaction(date);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm a");
        return list.stream().map(
                row-> {
                    LocalDateTime dateTime = (LocalDateTime) row[6];
                    String formattedDate = dateTime.format(formatter);
                    return new CustomerTransactionDto(
                        ((Number) row[0]).longValue(),
                        (Customer) row[1],
                        (String) row[2],
                        (String) row[3],
                        (String) row[4],
                        (String) row[5],
                        formattedDate,
                        (String) row[7]
                );
    }).collect(Collectors.toList());
    }

    public List<SoldProductDto> getSoldProducts(){
        List<Object[]> result = transactionsRepository.getDailySoldProducts(LocalDate.now());
        return result.stream()
                .map(row -> new SoldProductDto(
                        ((Number) row[0]).longValue(),
                        (String) row[1],
                        ((Number) row[2]).doubleValue(),
                        ((Number) row[3]).intValue(),
                        ((Number) row[4]).intValue()
                )).collect(Collectors.toList());
    }

}
