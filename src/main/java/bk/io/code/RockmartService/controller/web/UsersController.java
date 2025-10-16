package bk.io.code.RockmartService.controller.web;

import bk.io.code.RockmartService.dto.responses.CustomResponse;
import bk.io.code.RockmartService.dto.userDto.PasswordChangeDto;
import bk.io.code.RockmartService.dto.userDto.RegisterUserDto;
import bk.io.code.RockmartService.dto.userDto.UsersDto;
import bk.io.code.RockmartService.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UsersController {
    private final UserService userService;

    @PreAuthorize("hasAnyAuthority('SALES_PERSON','ADMIN')")
    @PutMapping("/change_password")
    public ResponseEntity<CustomResponse> changePassword(@RequestBody PasswordChangeDto passwordChangeDto){
        return ResponseEntity.ok(userService.changePassword(passwordChangeDto));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/register")
    public ResponseEntity<CustomResponse> registerNewUser (@RequestBody RegisterUserDto registerUserDto) {
        return ResponseEntity.ok(userService.registerUser(registerUserDto));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/get_all")
    public List<UsersDto> getAllUsers() {
        return userService.getAllUsers();
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/edit")
    public ResponseEntity<CustomResponse> saveEditedUsers(@RequestBody UsersDto usersDto) {
        return ResponseEntity.ok(userService.saveEditedUsers(usersDto));
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/reset/{id}")
    public ResponseEntity<CustomResponse> resetUserAccountPassword(@PathVariable Long id) {
        return ResponseEntity.ok(userService.resetUserAccountPassword(id));
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/delete/{id}")
    public ResponseEntity<CustomResponse> deleteUserAccount(@PathVariable Long id) {
        return ResponseEntity.ok(userService.deleteUserAccount(id));
    }

}
