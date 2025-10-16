package bk.io.code.RockmartService.services;


import bk.io.code.RockmartService.dto.productDto.EditProductDto;
import bk.io.code.RockmartService.dto.productDto.ProductDto;
import bk.io.code.RockmartService.dto.productDto.ProductStockDto;
import bk.io.code.RockmartService.dto.responses.CustomResponse;
import bk.io.code.RockmartService.model.Product;
import bk.io.code.RockmartService.model.ProductHistory;
import bk.io.code.RockmartService.model.ProductStock;
import bk.io.code.RockmartService.model.Users;
import bk.io.code.RockmartService.repositories.ProductHistoryRepository;
import bk.io.code.RockmartService.repositories.ProductRepository;
import bk.io.code.RockmartService.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductHistoryRepository productHistoryRepository;
    private final UserRepository userRepository;
    public List<Product> getAllProductsWithProductStock() {
        return productRepository.findAll();
    }

    public int getTotalAvailable() {
        List<Product> productList = productRepository.findAll();
        return productList.stream()
                .mapToInt(Product::getQuantity).sum();
    }

    public CustomResponse saveNewProduct(List<ProductDto> productDtoList) {
        for(ProductDto productDto: productDtoList){
            ProductStock productStock = new ProductStock();
            productStock.setQuantity(productDto.getQuantity());
            productStock.setRestockLevel(productDto.getRestockLevel());

            Product product = new Product();
            product.setName(productDto.getName());
            product.setCategory(productDto.getCategory());
            product.setPrice(productDto.getPrice());
            product.setQuantity(0);
            product.setSoldQuantity(0);
            product.setCreatedDate(LocalDateTime.now());
            productStock.setProduct(product);
            product.setProductStock(productStock);
            productRepository.save(product);
        }

        return CustomResponse
                .builder()
                .status(true)
                .message("Products saved successfully")
                .build();
    }

    public CustomResponse updateEditedProduct(EditProductDto editProductDto) {
        boolean isPresent = productRepository.existsById(editProductDto.getId());
        if (isPresent) {
            Product product = productRepository.findById(editProductDto.getId()).orElseThrow();
            String name = product.getName();
            product.setName(editProductDto.getName());
            product.setPrice(editProductDto.getPrice());
            product.setQuantity(editProductDto.getQuantity());
            product.getProductStock().setRestockLevel(editProductDto.getRestockLevel());
            product.getProductStock().setQuantity(editProductDto.getQuantity());
            productRepository.save(product);
            //updating product-History info
            ProductHistory productHistory = new ProductHistory();
            productHistory.setProductStock(product.getProductStock());
            productHistory.setOldQuantity(product.getQuantity());
            productHistory.setUpdateQuantity(editProductDto.getQuantity());
            productHistory.setNewQuantity(editProductDto.getQuantity());
            productHistory.setDate(LocalDateTime.now());
            //find user who made the update
            Users user = userRepository.findById(editProductDto.getUser()).orElseThrow();
            //Response after successful update
            productHistory.setUser(user);
            productHistoryRepository.save(productHistory);
            return CustomResponse
                    .builder().status(true).message(String.format("%s successfully updated", name)).build();
        }else {
            return CustomResponse
                    .builder().status(false).message(String.format("Error updating %s", editProductDto.getName())).build();
        }
    }

    public CustomResponse updateSingleProductQuantity(ProductStockDto productStockDto) {
        Product product = productRepository.findByIdAndName(productStockDto.getId(), productStockDto.getName());
        if(product == null) {
            return CustomResponse
                    .builder()
                    .status(false)
                    .message("Error updating product")
                    .build();
        }else {
            int stockQuantity = product.getQuantity();
            int newQuantity = stockQuantity + productStockDto.getQuantity();
            product.setQuantity(newQuantity);
            product.getProductStock().setQuantity(newQuantity);
            productRepository.save(product);
            //updating product-History info
            ProductHistory productHistory = new ProductHistory();
            productHistory.setProductStock(product.getProductStock());
            productHistory.setOldQuantity(stockQuantity);
            productHistory.setUpdateQuantity(productStockDto.getQuantity());
            productHistory.setNewQuantity(newQuantity);
            productHistory.setDate(LocalDateTime.now());
            //find user who made the update
            Users user = userRepository.findById(productStockDto.getUser()).orElseThrow();
            //Response after successful update
            productHistory.setUser(user);
            productHistoryRepository.save(productHistory);
            return CustomResponse
                    .builder()
                    .status(true)
                    .message(String.format("%s updated", productStockDto.getName()))
                    .build();
        }
    }

    public CustomResponse updateMultipleProductQuantity(List<ProductStockDto> productStockDtoList) {
        //find user who made the update
        int length = productStockDtoList.size();
        Users user = userRepository.findById(productStockDtoList.getFirst().getUser()).orElseThrow();
        for (ProductStockDto productStockDto : productStockDtoList) {
            Long id = productStockDto.getId();
            Product product = productRepository.findById(id).orElseThrow();
            int newQuantity = productStockDto.getQuantity();
            int stockQuantity = product.getQuantity();
            int incomingQuantity = newQuantity - stockQuantity;
            product.setQuantity(newQuantity);
            product.getProductStock().setQuantity(newQuantity);
            productRepository.save(product);
            //updating product-History info
            ProductHistory productHistory = new ProductHistory();
            productHistory.setProductStock(product.getProductStock());
            productHistory.setOldQuantity(stockQuantity);
            productHistory.setUpdateQuantity(incomingQuantity);
            productHistory.setNewQuantity(newQuantity);
            productHistory.setDate(LocalDateTime.now());
            productHistory.setUser(user);
            productHistoryRepository.save(productHistory);
        }
        return CustomResponse
                .builder()
                .status(true)
                .message(length + " product updated successfully")
                .build();
    }
}
