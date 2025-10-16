package bk.io.code.RockmartService.controller.web;

import bk.io.code.RockmartService.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Controller
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping(path = "/")
public class AppController {
    private final UserService userService;
    @GetMapping("/user/login")
    public String login() {
        return "login";
    }
    @PreAuthorize("hasAnyAuthority('SALES_PERSON','ADMIN')")
    @GetMapping("/user_dashboard")
    public String user_dashboard() {
        return "user_dashboard";
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin_dashboard")
    public String dashboard() {
        return "admin_dashboard";
    }

    @PreAuthorize("hasAnyAuthority('SALES_PERSON','ADMIN')")
    @GetMapping("/user/login/changePassword")
    public String changePassword() {
        return "changePassword";
    }
    @PreAuthorize("hasAnyAuthority('SALES_PERSON','ADMIN')")
    @PostMapping("/user/login/ps_first")
    public String changePasswordFirst(@RequestParam String username, @RequestParam String new_password) {
        String response = userService.changePasswordFirstTime(username, new_password);
        if (Objects.equals(response,"ADMIN")) {
            return "redirect:/admin_dashboard";
        }else if(Objects.equals(response,"SALES_PERSON")) {
            return "redirect:/user_dashboard";
        }else {
            return "redirect:/user/login/changePassword?error";
        }
    }

}
