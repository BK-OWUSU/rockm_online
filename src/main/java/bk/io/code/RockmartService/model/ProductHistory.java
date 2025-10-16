package bk.io.code.RockmartService.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
@Table(name = "product_history")
public class ProductHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "product_stock_id")
    private ProductStock productStock;
    private Integer oldQuantity;
    private Integer updateQuantity;
    private Integer newQuantity;
    private LocalDateTime date;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;
}
