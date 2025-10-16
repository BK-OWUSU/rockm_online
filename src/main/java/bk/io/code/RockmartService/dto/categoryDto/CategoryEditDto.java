package bk.io.code.RockmartService.dto.categoryDto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CategoryEditDto {
    private Long id;
    private String name;
    private String newName;
}
