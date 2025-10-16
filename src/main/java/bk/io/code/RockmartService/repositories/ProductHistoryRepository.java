package bk.io.code.RockmartService.repositories;

import bk.io.code.RockmartService.model.ProductHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@EnableJpaRepositories
public interface ProductHistoryRepository extends JpaRepository<ProductHistory, Long> {
    @Query(
            "SELECT p.name AS product, " +
                    "ph.oldQuantity, " +
                    "ph.updateQuantity, " +
                    "ph.newQuantity, " +
                    "ph.date, " +
                    "u.username AS user " +
                    "FROM ProductHistory ph " +
                    "JOIN ph.productStock ps " +
                    "JOIN ps.product p " +
                    "JOIN ph.user u " +
                    "ORDER BY ph.date"
    )
    List<Object[]> findAllProductHistory();

    @Query(
            "SELECT p.name AS product, " +
                    "ph.oldQuantity, " +
                    "ph.updateQuantity, " +
                    "ph.newQuantity, " +
                    "ph.date, " +
                    "u.username AS user " +
                    "FROM ProductHistory ph " +
                    "JOIN ph.productStock ps " +
                    "JOIN ps.product p " +
                    "JOIN ph.user u " +
                    "WHERE DATE(ph.date) = :date " +
                    "ORDER BY ph.date"
    )
    List<Object[]> findProductHistoryByDate(@Param("date") LocalDate date);
}
