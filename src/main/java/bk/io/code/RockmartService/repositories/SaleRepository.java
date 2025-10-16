package bk.io.code.RockmartService.repositories;



import bk.io.code.RockmartService.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@EnableJpaRepositories
public interface SaleRepository extends JpaRepository<Sale,Long> {
    List<Sale> findAllByDate(LocalDate date);
    Long countByDate(LocalDate now);
}
