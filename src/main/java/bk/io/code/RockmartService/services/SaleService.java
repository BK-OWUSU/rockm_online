package bk.io.code.RockmartService.services;

import bk.io.code.RockmartService.dto.cartDto.CartItemsDto;
import bk.io.code.RockmartService.dto.responses.CustomResponse;
import bk.io.code.RockmartService.model.*;
import bk.io.code.RockmartService.repositories.CustomerRepository;
import bk.io.code.RockmartService.repositories.ProductRepository;
import bk.io.code.RockmartService.repositories.SaleRepository;
import bk.io.code.RockmartService.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class SaleService {
    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepo;
    private final CustomerRepository customerRepository;
    public CustomResponse saveSales(CartItemsDto saleDto) {
        //Finding and inserting/updating customer
        Customer customer = getCustomer(saleDto.getCustomerName(), saleDto.getCustomerContact());
        //creating new sale
        Sale sale = new Sale();
        sale.setDate(LocalDate.now());
        //Sales total Amount
        sale.setTotalAmount(saleDto.getTotalAmount());
        //Setting user
        Users user = userRepo.findById(saleDto.getWorker()).orElseThrow();
        sale.setUser(user);
        //setting sale customer
        sale.setCustomer(customer);

        int num = saleDto.getCartItems().size();
        for (int i = 0; i < num; i++ ) {
                Product product = productRepository.findById(saleDto.getCartItems().get(i).getId()).orElseThrow();
                double productPrice = product.getPrice();
                int incomeQuantity  = saleDto.getCartItems().get(i).getQuantity();
                SaleTransactions transaction = new SaleTransactions();
                transaction.setSale(sale);
                transaction.setProduct(product);
                transaction.setQuantity(incomeQuantity);
                transaction.setTotal(incomeQuantity * productPrice);
                transaction.setCustomer(customer);
                transaction.setDate(LocalDateTime.now());
                sale.getSaleItems().add(transaction);
        }
        saleRepository.save(sale);
        return CustomResponse
                .builder()
                .status(true)
                .message("Transaction completed successfully")
                .build();
    }

    public double getTotalSale() {
        List<Sale> saleList = saleRepository.findAllByDate(LocalDate.now());
        return saleList
                .stream()
                .mapToDouble(Sale::getTotalAmount).sum();
    }

    private Customer getCustomer(String name, String contact) {
        Customer customer = new Customer();
        if (customerRepository.existsByContact(contact)){
            customer = customerRepository.findByContact(contact);
        }else {
            if (name.isEmpty()) {
                name = "CUSTOMER";
            }
            if (contact.isEmpty()) {
                contact = "no-contact";
            }
            customer.setName(name);
            customer.setContact(contact);
            customer.setEmail("no-email");
            customerRepository.save(customer);
        }
        return customer;
    }
}
