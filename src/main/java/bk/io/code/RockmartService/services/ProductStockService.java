package bk.io.code.RockmartService.services;


import bk.io.code.RockmartService.model.Product;
import bk.io.code.RockmartService.model.ProductStock;
import bk.io.code.RockmartService.repositories.ProductRepository;
import bk.io.code.RockmartService.repositories.ProductStockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductStockService {

    private final ProductStockRepository stockRepo;
    private final ProductRepository productRepository;

    public List<ProductStock> getAllStock() {
        return stockRepo.findAll();
    }

    public List<Product> getRestockNotification() {
        List<Product> productList = productRepository.findAll();
        List<Product> notificationList = new ArrayList<>();
        for (Product product : productList) {
            int restockLevel = product.getProductStock().getRestockLevel();
            int availableQuantity = product.getQuantity();
            if (restockLevel >= availableQuantity) {
                notificationList.add(product);
            }
        }
        return notificationList;
    }

}
