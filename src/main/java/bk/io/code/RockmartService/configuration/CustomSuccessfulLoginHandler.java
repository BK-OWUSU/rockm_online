package bk.io.code.RockmartService.configuration;

import bk.io.code.RockmartService.model.Users;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Objects;


public class CustomSuccessfulLoginHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        AuthenticationSuccessHandler.super.onAuthenticationSuccess(request, response, chain, authentication);
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Users user = (Users) authentication.getPrincipal();
        boolean isDefaultPasswordChanged = user.isDefaultPasswordChanged();
        String username = user.getUsername();
        String role = String.valueOf(user.getRole());
        if (isDefaultPasswordChanged) {
            if (Objects.equals(role,"SALES_PERSON")) {
                response.sendRedirect("/user_dashboard");
            }else if (Objects.equals(role,"ADMIN")) {
                response.sendRedirect("/admin_dashboard");
            }else {
                response.sendRedirect("/login?error");
            }
        }else {
            response.sendRedirect("/user/login/changePassword?username="+username);
        }
    }
}
