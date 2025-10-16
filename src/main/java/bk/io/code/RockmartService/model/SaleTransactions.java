package bk.io.code.RockmartService.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
@Table(name = "sale_transactions")
public class SaleTransactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sale_id")
    private Sale sale;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Product product;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private double total;
    private LocalDateTime date;
    // Inside the SalesItem class
    @PrePersist
    public void prePersist() {
        Product product = this.getProduct();
        int availableQuantity = product.getQuantity();
        int incomingQuantity = this.getQuantity();
        if (incomingQuantity <= availableQuantity) {
            product.setQuantity(product.getQuantity() - incomingQuantity);
            product.setSoldQuantity(product.getSoldQuantity() + incomingQuantity);
            ProductStock productStock = product.getProductStock();
            productStock.setQuantity(productStock.getQuantity() - incomingQuantity);
            product.setProductStock(productStock);
        }
    }
}
