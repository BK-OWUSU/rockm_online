package bk.io.code.RockmartService.repositories;


import bk.io.code.RockmartService.model.SaleTransactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@EnableJpaRepositories
public interface SaleTransactionsRepository extends JpaRepository<SaleTransactions, Long> {
    List<SaleTransactions> findAllBySaleDate(LocalDate date);
    @Query("SELECT c.name, SUM(st.quantity), SUM(st.quantity * st.product.price) " +
            "FROM SaleTransactions st " +
            "JOIN st.product p " +
            "JOIN p.category c " +
            "WHERE st.sale.date = :date " +
            "GROUP BY c.name")
    List<Object[]> getSalesReportsByDate(@Param("date") LocalDate date);

    @Query("SELECT c.name, SUM(st.quantity), SUM(st.quantity * st.product.price) " +
            "FROM SaleTransactions st " +
            "JOIN st.product p " +
            "JOIN p.category c " +
            "WHERE st.sale.date BETWEEN :startDate AND :endDate " +
            "GROUP BY c.name")
    List<Object[]> findAllBySaleDateBetween(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query(
            "SELECT st.sale.id, st.customer, " +
                    "STRING_AGG(p.name, ', ') AS products, " +
                    "STRING_AGG(CAST(st.quantity AS STRING), ', ') AS quantities, " +
                    "STRING_AGG(CAST(p.price AS STRING), ', ') AS productPrice, " +
                    "STRING_AGG(CAST(st.total AS STRING), ', ') AS totals, " +
                    "MIN(st.date) AS date, " +
                    "st.sale.user.username AS user " +
                    "FROM SaleTransactions st " +
                    "JOIN st.customer c " +
                    "JOIN st.product p " +
                    "JOIN st.sale s " +
                    "WHERE st.sale.date = :date " +
                    "GROUP BY st.sale.id, st.customer, st.sale.user.username " +
                    "ORDER BY st.sale.id"
    )
    List<Object[]> getDailySaleTransaction(@Param("date") LocalDate date);

    @Query(
            "SELECT st.sale.id, st.customer, " +
                    "STRING_AGG(p.name, ', ') AS products, " +
                    "STRING_AGG(CAST(st.quantity AS STRING), ', ') AS quantities, " +
                    "STRING_AGG(CAST(p.price AS STRING), ', ') AS productPrice, " +
                    "STRING_AGG(CAST(st.total AS STRING), ', ') AS totals, " +
                    "MIN(st.date) AS date, " +
                    "st.sale.user.username AS user " +
                    "FROM SaleTransactions st " +
                    "JOIN st.customer c " +
                    "JOIN st.product p " +
                    "JOIN st.sale s " +
                    "GROUP BY st.sale.id, st.customer, st.sale.user.username " +
                    "ORDER BY st.sale.id"
    )
    List<Object[]> getAllSaleTransaction();

    @Query(
            "SELECT st.product.id, " +
                    "st.product.name, " +
                    "st.product.price, " +
                    "st.product.quantity AS availableQuantity, " +
                    "SUM(st.quantity) AS soldQuantity " +
                    "FROM SaleTransactions st " +
                    "JOIN st.product p " +
                    "JOIN st.sale s " +
                    "WHERE st.sale.date = :date " +
                    "GROUP BY st.product " +
                    "ORDER BY st.product.id"
    )
    List<Object[]> getDailySoldProducts(@Param("date") LocalDate date);
}
