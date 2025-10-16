package bk.io.code.RockmartService.controller.web;

import bk.io.code.RockmartService.model.Product;
import bk.io.code.RockmartService.services.ProductStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/stock")
@CrossOrigin
public class ProductStockController {
private final ProductStockService productStockService;
    @GetMapping("/notify")
    public List<Product> getRestockLevelNotification() {
        return productStockService.getRestockNotification();
    }
}
