package bk.io.code.RockmartService.services;


import bk.io.code.RockmartService.dto.responses.CustomResponse;
import bk.io.code.RockmartService.dto.userDto.PasswordChangeDto;
import bk.io.code.RockmartService.dto.userDto.RegisterUserDto;
import bk.io.code.RockmartService.dto.userDto.UsersDto;
import bk.io.code.RockmartService.model.Users;
import bk.io.code.RockmartService.model.enums.Role;
import bk.io.code.RockmartService.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomResponse changePassword(PasswordChangeDto passwordChangeDto) {
        Users user = userRepository.findById(passwordChangeDto.getWorker()).orElseThrow();
        String encodedPassword = user.getPassword();
        String currentPassword = passwordChangeDto.getCurrentPassword();
        boolean isMatched = passwordEncoder.matches(currentPassword, encodedPassword);
        if (isMatched) {
            user.setPassword(passwordEncoder.encode(passwordChangeDto.getNewPassword()));
            userRepository.save(user);
            List<UsersDto> result = getAllUsers();
            System.out.println(result);
            return CustomResponse
                    .builder()
                    .status(true)
                    .message("Password changed successfully")
                    .build();
        } else  {
            return CustomResponse
                    .builder()
                    .status(false)
                    .message("Incorrect password!!")
                    .build();
        }
    }

    public CustomResponse registerUser(RegisterUserDto registerUserDto) {
        if(!userRepository.existsByUsername(registerUserDto.getUsername())) {
            final String email = registerUserDto.getUsername()+ "@rockmart";
            final String username = registerUserDto.getUsername();
            var user = Users.builder()
                    .firstname(registerUserDto.getFirstname())
                    .lastname(registerUserDto.getLastname())
                    .username(registerUserDto.getUsername())
                    .email(email)
                    .role(getRole(registerUserDto.getRole()))
                    .password(passwordEncoder.encode(username+ "@rockmart"))//default password for users
                    .isAccountNonLocked(true)
                    .isAccountNonExpired(true)
                    .isCredentialsNonExpired(true)
                    .isEnabled(true)
                    .isDefaultPasswordChanged(false)
                    .build();
            userRepository.save(user);
            return CustomResponse
                    .builder()
                    .status(true)
                    .message(String.format("%s registered successfully", registerUserDto.getUsername()))
                    .build();
        }else {
            return CustomResponse
                    .builder()
                    .status(false)
                    .message(String.format("Username %s is already taken", registerUserDto.getUsername()))
                    .build();
        }
    }


    private Role getRole(String role) {
        if (Objects.equals("Sales-Person", role)) {
            return Role.SALES_PERSON;
        } else if (Objects.equals("Admin", role)) {
            return Role.ADMIN;
        } else return null;
    }


    public List<UsersDto> getAllUsers() {
        List<Users> result = userRepository.findAll();
        return result
                .stream()
                .map(user -> new UsersDto(
                        user.getId(),
                        user.getFirstname(),
                        user.getLastname(),
                        user.getUsername(),
                        user.getEmail(),
                        changeRoleEnumToString(user.getRole())
                )
        ).collect(Collectors.toList());
    }

    private String changeRoleEnumToString(Role role) {
        if (role == Role.SALES_PERSON) {
            return "Sales-Person";
        } else if (role == Role.ADMIN) {
            return "Admin";
        } else return null;
    }

    public CustomResponse saveEditedUsers(UsersDto usersDto) {
        if (userRepository.existsById(usersDto.getId())) {
            Users user = userRepository.findById(usersDto.getId()).orElseThrow();
            user.setFirstname(usersDto.getFirstname());
            user.setLastname(usersDto.getLastname());
            user.setUsername(usersDto.getUsername());
            user.setEmail(usersDto.getEmail());
            user.setRole(getRole(usersDto.getRole()));
            userRepository.save(user);
            return CustomResponse
                    .builder()
                    .status(true)
                    .message(String.format("User %s updated Successfully",user.getUsername()))
                    .build();
        }else {
            return CustomResponse
                    .builder()
                    .status(false)
                    .message("User not found")
                    .build();
        }
    }

    public CustomResponse resetUserAccountPassword(Long id) {
        if (userRepository.existsById(id)) {
            Users user = userRepository.findById(id).orElseThrow();
            final String username = user.getUsername();
            user.setPassword(passwordEncoder.encode(username + "@rockmart"));//default password for users;
            user.setDefaultPasswordChanged(false);
            userRepository.save(user);
            userRepository.save(user);
            return CustomResponse
                    .builder()
                    .status(true)
                    .message(String.format("%s account reset successful", user.getUsername()))
                    .build();
        }else {
            return CustomResponse
                    .builder()
                    .status(false)
                    .message("Error resetting account!!!")
                    .build();
        }
    }


    public CustomResponse deleteUserAccount(Long id) {
        if (userRepository.existsById(id)) {
            Users user = userRepository.findById(id).orElseThrow();
            String username = user.getUsername();
            userRepository.delete(user);
            return CustomResponse
                    .builder()
                    .status(true)
                    .message(String.format("%s's account deleted successfully", username))
                    .build();
        }else {
            return CustomResponse
                    .builder()
                    .status(false)
                    .message("User not found")
                    .build();
        }
    }

    public String changePasswordFirstTime(String username, String new_password) {
        if (new_password.length() < 8) {
            return null;
        }
        Users user = userRepository.findByUsername(username).orElseThrow();
        String role = String.valueOf(user.getRole());
        user.setPassword(passwordEncoder.encode(new_password));
        user.setDefaultPasswordChanged(true);
        userRepository.save(user);
        return role;
    }

}
