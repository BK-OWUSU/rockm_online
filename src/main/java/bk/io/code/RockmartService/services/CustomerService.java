package bk.io.code.RockmartService.services;

import bk.io.code.RockmartService.dto.customerDto.CustomerDto;
import bk.io.code.RockmartService.dto.customerDto.CustomerUpdateDto;
import bk.io.code.RockmartService.dto.customerDto.CustomerWithSaleCountDto;
import bk.io.code.RockmartService.dto.responses.CustomResponse;
import bk.io.code.RockmartService.model.Customer;
import bk.io.code.RockmartService.repositories.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomResponse saveCustomer(CustomerDto customerDto) {
        Customer customer = getCustomer(customerDto);
        customerRepository.save(customer);
        return CustomResponse
                .builder()
                .status(true)
                .message(String.format("Customer %s saved successfully", customerDto.getName()))
                .build();
    }

    public CustomResponse updateCustomer(CustomerUpdateDto updateDto) {
        String email = updateDto.getEmail();
        String contact = updateDto.getContact();
        if (email.isEmpty()) {
            email = "no-email";
        }
        if (contact.isEmpty()) {
            contact = "no-contact";
        }
        if(customerRepository.existsById(updateDto.getId())) {
            Customer customer = customerRepository.findById(updateDto.getId()).orElseThrow();
            customer.setName(updateDto.getName());
            customer.setContact(contact);
            customer.setEmail(email);
            customerRepository.save(customer);
            return CustomResponse
                    .builder()
                    .status(true)
                    .message(String.format("%s updated Successfully",customer.getName()))
                    .build();
        } else {
            return CustomResponse
                    .builder()
                    .status(true)
                    .message("Error updating Details")
                    .build();
        }
    }

    public List<CustomerWithSaleCountDto> getAllCustomers() {
        List<Object[]> result = customerRepository.findAllWithSaleCount();
        List<CustomerWithSaleCountDto> customerDto = new ArrayList<>();
        for(Object[] row : result) {
            Customer customer = (Customer) row[0];
            Long saleCount = ((Number) row[1]).longValue();
            if (!customer.getName().equals("CUSTOMER")) {
                customerDto.add(new CustomerWithSaleCountDto(customer,saleCount));
            }
        }
        return customerDto;
    }

    private Customer getCustomer(CustomerDto customerDto) {
        Customer customer = new Customer();
        if (customerRepository.existsByContact(customerDto.getContact())){
            customer = customerRepository.findByContact(customerDto.getContact());
        }else {
            customer.setName(customerDto.getName());
            customer.setContact(customerDto.getContact());
            customer.setEmail(customerDto.getEmail());
            customerRepository.save(customer);
        }
        return customer;
    }
}
