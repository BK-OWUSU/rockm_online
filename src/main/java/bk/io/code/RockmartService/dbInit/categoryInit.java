package bk.io.code.RockmartService.dbInit;

import bk.io.code.RockmartService.model.Category;
import bk.io.code.RockmartService.repositories.CategoryRepo;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class categoryInit {
    private final CategoryRepo categoryRepo;

    @PostConstruct
    public void initCategory() {
        var count = categoryRepo.count();

        if (count > 0) {
            System.out.println(count + " categories are present");
        }else {
            var riceBase = Category.builder().name("Rice Base").build();
            var pastries = Category.builder().name("Pastries").build();
            var drinks = Category.builder().name("Drinks").build();
            var water = Category.builder().name("Water").build();

            categoryRepo.save(riceBase);
            categoryRepo.save(pastries);
            categoryRepo.save(drinks);
            categoryRepo.save(water);
        }

    }
}
