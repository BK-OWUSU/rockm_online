package bk.io.code.RockmartService.model;

import bk.io.code.RockmartService.model.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Entity
@Table(name = "users")
public class Users implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String username;
    private String password;
    @Enumerated(EnumType.ORDINAL)
    private Role role;
    private boolean isAccountNonExpired;
    private boolean isAccountNonLocked;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;
    private boolean isDefaultPasswordChanged;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }
    @Override
    public String getPassword() {
        return password;
    }
    @Override
    public String getUsername() {
        return username;
    }
    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }
    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }
    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

}
