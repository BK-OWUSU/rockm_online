package bk.io.code.RockmartService.repositories;


import bk.io.code.RockmartService.model.ProductStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface ProductStockRepository extends JpaRepository<ProductStock,Long> {
}
