package bk.io.code.RockmartService.dbInit;

import bk.io.code.RockmartService.model.Users;
import bk.io.code.RockmartService.model.enums.Role;
import bk.io.code.RockmartService.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class userInit {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initUser() {
        if (userRepository.count() == 0) {
            var user = Users.builder()
                    .firstname("Bismark")
                    .lastname("Owusu")
                    .username("user")
                    .password(passwordEncoder.encode("user"))
                    .email("bismarko416@gmail.com")
                    .role(Role.SALES_PERSON)
                    .isDefaultPasswordChanged(true)
                    .isEnabled(true)
                    .isAccountNonExpired(true)
                    .isAccountNonLocked(true)
                    .isCredentialsNonExpired(true)
                    .build();
            userRepository.save(user);

            var admin = Users.builder()
                    .firstname("Bismark")
                    .lastname("Owusu")
                    .username("admin")
                    .password(passwordEncoder.encode("admin"))
                    .email("bismarko416@gmail.com")
                    .role(Role.ADMIN)
                    .isDefaultPasswordChanged(true)
                    .isEnabled(true)
                    .isAccountNonExpired(true)
                    .isAccountNonLocked(true)
                    .isCredentialsNonExpired(true)
                    .build();
            userRepository.save(admin);

        }else {
            System.out.println("User mark already exist");
        }
    }
}
