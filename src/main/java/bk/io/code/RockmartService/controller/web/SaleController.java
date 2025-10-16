package bk.io.code.RockmartService.controller.web;

import bk.io.code.RockmartService.dto.cartDto.CartItemsDto;
import bk.io.code.RockmartService.dto.customerDto.CustomerTransactionDto;
import bk.io.code.RockmartService.dto.productDto.SoldProductDto;
import bk.io.code.RockmartService.dto.responses.CustomResponse;
import bk.io.code.RockmartService.dto.saleDto.SalesDateRangeDto;
import bk.io.code.RockmartService.dto.saleDto.SalesReportDTO;
import bk.io.code.RockmartService.services.SaleService;
import bk.io.code.RockmartService.services.SaleTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/sale")
@CrossOrigin
public class SaleController {
    private final SaleService saleService;
    private final SaleTransactionService transactionService;

    @PostMapping("/cart")
    public ResponseEntity<CustomResponse> sell(@RequestBody CartItemsDto cartItemsDto) {
       return ResponseEntity.ok(saleService.saveSales(cartItemsDto));
    }

    @GetMapping("/total_sale")
    public double getTotalSale() {
        return saleService.getTotalSale();
    }

    @GetMapping("/total_quantity")
    public double getTotal() {
        return transactionService.totalProductQuantitySold();
    }
    @GetMapping("/daily_report")
    public List<SalesReportDTO> dailySalesReport() {
        return transactionService.getDailySalesReport(LocalDate.now());
    }
    @PostMapping("/sale_range")
    public List<SalesReportDTO> getAllSaleBetweenDateRange(@RequestBody SalesDateRangeDto dateRangeDto) {
        return transactionService.findAllBySaleDateBetween(dateRangeDto);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/transact/count")
    public Long countSaleTransaction() {
        return transactionService.countSaleTransaction();
    };

    @GetMapping("/sale_trans")
    public ResponseEntity<List<CustomerTransactionDto>> getDailyTransaction() {
        return  ResponseEntity.ok(transactionService.getDailyTransactions());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/sale_trans/all")
    public ResponseEntity<List<CustomerTransactionDto>> getAllTransaction() {
        return  ResponseEntity.ok(transactionService.getAllSaleTransaction());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/sale_trans/date")
    public ResponseEntity<List<CustomerTransactionDto>> getDateTransaction(@RequestBody LocalDate date) {
        System.out.println(date);
        return  ResponseEntity.ok(transactionService.getDateSaleTransaction(date));
    }

    @GetMapping("/sold_products")
    public ResponseEntity<List<SoldProductDto>> getAllSoldProducts() {
        return ResponseEntity.ok(transactionService.getSoldProducts());
    }
}
