package bk.io.code.RockmartService.services;


import bk.io.code.RockmartService.dto.categoryDto.CategoryDto;
import bk.io.code.RockmartService.dto.categoryDto.CategoryEditDto;
import bk.io.code.RockmartService.dto.responses.CustomResponse;
import bk.io.code.RockmartService.model.Category;
import bk.io.code.RockmartService.repositories.CategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepo categoryRepo;

    public CustomResponse saveCategory(CategoryDto categoryDto){
        if (categoryDto.getName().isEmpty()) {
            return CustomResponse
                    .builder()
                    .status(false)
                    .message("Error saving Category")
                    .build();
        }else {
            var category = Category
                    .builder()
                    .name(categoryDto.getName().toUpperCase()).build();
            categoryRepo.save(category);
            return CustomResponse
                    .builder()
                    .status(true)
                    .message(String.format("Category %s saved successfully",categoryDto.getName()))
                    .build();
        }
    }
    public List<Category> getCategoryList() {
        return categoryRepo.findAll();
    }

    public CustomResponse deleteCategory(Long id){
        Category category = categoryRepo.findById(id).orElseThrow();
        String name = category.getName();
        categoryRepo.deleteById(id);
        return CustomResponse
                .builder()
                .message(String.format("Category %s deleted successfully", name))
                .status(true)
                .build();
    }

    public CustomResponse editCategory (CategoryEditDto editDto) {
        String name = editDto.getName().toUpperCase();
        Category category = categoryRepo.findByIdAndName(editDto.getId(), name);
        if (category != null) {
            category.setName(editDto.getNewName().toUpperCase());
            categoryRepo.save(category);
            return CustomResponse
                    .builder()
                    .status(true)
                    .message(String.format("%s Updated to %s", editDto.getName(),editDto.getNewName()))
                    .build();
        } else {
            return CustomResponse
                    .builder()
                    .status(false)
                    .message(String.format("Error updating %s to %s", editDto.getName(), editDto.getNewName()))
                    .build();
        }
    }


}
