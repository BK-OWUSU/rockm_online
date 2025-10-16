package bk.io.code.RockmartService.controller.web;

import bk.io.code.RockmartService.dto.customerDto.CustomerDto;
import bk.io.code.RockmartService.dto.customerDto.CustomerUpdateDto;
import bk.io.code.RockmartService.dto.customerDto.CustomerWithSaleCountDto;
import bk.io.code.RockmartService.dto.responses.CustomResponse;
import bk.io.code.RockmartService.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/customer")
public class CustomerController {
    private final CustomerService customerService;
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/save")
    public ResponseEntity<CustomResponse> saveCustomer (@RequestBody CustomerDto customerDto) {
        return ResponseEntity.ok(customerService.saveCustomer(customerDto));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/update")
    public ResponseEntity<CustomResponse> updateCustomer (@RequestBody CustomerUpdateDto updateDto) {
        return ResponseEntity.ok(customerService.updateCustomer(updateDto));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/get")
    public ResponseEntity<List<CustomerWithSaleCountDto>> getAllCustomers () {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }
}
