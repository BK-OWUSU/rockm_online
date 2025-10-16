package bk.io.code.RockmartService.controller.web;

import bk.io.code.RockmartService.dto.productDto.EditProductDto;
import bk.io.code.RockmartService.dto.productDto.ProductDto;
import bk.io.code.RockmartService.dto.productDto.ProductStockDto;
import bk.io.code.RockmartService.dto.responses.CustomResponse;
import bk.io.code.RockmartService.model.Product;
import bk.io.code.RockmartService.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/product")
@CrossOrigin
public class ProductController {
    private final ProductService productService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/save_new")
    public ResponseEntity<CustomResponse> saveNewProduct(@RequestBody List<ProductDto> productDto) {
        return ResponseEntity.ok(productService.saveNewProduct(productDto));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/stock/update_edit")
    public ResponseEntity<CustomResponse> updateEditedProduct(@RequestBody EditProductDto editProductDto) {
        return ResponseEntity.ok(productService.updateEditedProduct(editProductDto));
    }
    @PreAuthorize("hasAnyAuthority('SALES_PERSON','ADMIN')")
    @GetMapping("/get_all")
    public ResponseEntity<List<Product>> getAllProductsWithProductStock() {
        List<Product> productList = productService.getAllProductsWithProductStock();
        return ResponseEntity.ok(productList);
    }
    @PreAuthorize("hasAnyAuthority('SALES_PERSON','ADMIN')")
    @GetMapping("/get_available")
    public ResponseEntity<Integer> getAllAvailableProduct() {
        return ResponseEntity.ok(productService.getTotalAvailable());
    }

    @PreAuthorize("hasAnyAuthority('SALES_PERSON','ADMIN')")
    @PutMapping("/stock/update_one")
    public ResponseEntity<CustomResponse> updateSingleProductQuantity(@RequestBody ProductStockDto productStockDto) {
        return ResponseEntity.ok(productService.updateSingleProductQuantity(productStockDto));
    }
    @PreAuthorize("hasAnyAuthority('SALES_PERSON','ADMIN')")
    @PutMapping("/stock/update_batch")
    public ResponseEntity<CustomResponse> updateMultipleProductQuantity(@RequestBody List<ProductStockDto> productStockListDto) {
       return ResponseEntity.ok(productService.updateMultipleProductQuantity(productStockListDto));
    }
}
