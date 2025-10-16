package bk.io.code.RockmartService.configuration;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final AuthenticationProvider authenticationProvider;
    private final String[] allowedResources = {
            "/css/**",
            "/img/**",
            "/script/**",
            "/product/**"
    };
    private final String[] adminEndpoints = {
            "/admin_dashboard",
            "/api/users/admin/**",
            "/api/customer/admin/**",
            "/api/admin/**",
    };
    @Bean
    SecurityFilterChain chain (HttpSecurity http) throws  Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(c->c.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(req -> req
                        .requestMatchers("/user_dashboard","/api/users/change_password").hasAnyAuthority("SALES_PERSON","ADMIN")
                        .requestMatchers(adminEndpoints).hasAuthority("ADMIN")
                        .requestMatchers(allowedResources).permitAll()
                        .anyRequest().authenticated())
                .formLogin(fm-> fm
                        .loginPage("/user/login").permitAll()
                        .successHandler(customSuccessfulLoginHandler()))
                .logout(lg-> lg
                        .logoutUrl("/logout").permitAll()
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .deleteCookies("JSESSIONID"))
                .sessionManagement(ses->ses
                        .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                        .invalidSessionUrl("/logout")
                        .maximumSessions(1)
                        .maxSessionsPreventsLogin(false))
                .authenticationProvider(authenticationProvider);
        return http.build();
    }

    @Bean
    CustomSuccessfulLoginHandler customSuccessfulLoginHandler() {
        return new CustomSuccessfulLoginHandler();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource () {
        org.springframework.web.cors.CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
