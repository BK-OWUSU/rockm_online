package bk.io.code.RockmartService.repositories;


import bk.io.code.RockmartService.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByContact(String contact);
    boolean existsByContact(String contact);

    @Query("SELECT c, COUNT(s.id) AS saleCount FROM Sale s JOIN s.customer c GROUP BY c")
    List<Object[]> findAllWithSaleCount();
}
