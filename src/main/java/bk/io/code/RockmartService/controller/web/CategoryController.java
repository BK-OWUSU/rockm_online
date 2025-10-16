package bk.io.code.RockmartService.controller.web;

import bk.io.code.RockmartService.dto.categoryDto.CategoryDto;
import bk.io.code.RockmartService.dto.categoryDto.CategoryEditDto;
import bk.io.code.RockmartService.dto.responses.CustomResponse;
import bk.io.code.RockmartService.model.Category;
import bk.io.code.RockmartService.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/category")
@CrossOrigin
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PreAuthorize("hasAnyAuthority('SALES_PERSON','ADMIN')")
    @GetMapping("/get")
    public List<Category> productCategories () {
        return categoryService.getCategoryList();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/save")
    public ResponseEntity<CustomResponse> saveCategory(@RequestBody CategoryDto categoryDto) {
        return ResponseEntity.ok(categoryService.saveCategory(categoryDto));
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/edit")
    public ResponseEntity<CustomResponse> editCategory(@RequestBody CategoryEditDto editDto) {
        return ResponseEntity.ok(categoryService.editCategory(editDto));
    }
}
