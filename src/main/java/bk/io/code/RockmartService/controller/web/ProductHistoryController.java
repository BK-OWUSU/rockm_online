package bk.io.code.RockmartService.controller.web;


import bk.io.code.RockmartService.dto.productDto.ProductHistoryDto;
import bk.io.code.RockmartService.dto.saleDto.SalesDateRangeDto;
import bk.io.code.RockmartService.services.ProductHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/product_history")
public class ProductHistoryController {
    private final ProductHistoryService productHistoryService;

    @GetMapping("/admin/get_all")
    public ResponseEntity<List<ProductHistoryDto>> getAllProductHistory () {
        return ResponseEntity.ok(productHistoryService.getAllProductHistory());
    }
    @GetMapping("/admin/get_daily")
    public ResponseEntity<List<ProductHistoryDto>> getDailyProductHistory () {
        return ResponseEntity.ok(productHistoryService.getDailyProductHistory());
    }
    @PostMapping("/admin/get_by_date")
    public ResponseEntity<List<ProductHistoryDto>> getProductHistoryByDate (@RequestBody SalesDateRangeDto dateRangeDto) {
        return ResponseEntity.ok(productHistoryService.getProductHistoryByDate(dateRangeDto));
    }
}
