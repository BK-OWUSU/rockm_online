package bk.io.code.RockmartService.repositories;


import bk.io.code.RockmartService.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface CategoryRepo extends JpaRepository<Category, Long> {
    Category findByIdAndName(Long id, String name);

}
