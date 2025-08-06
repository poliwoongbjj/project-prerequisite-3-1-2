package habsida.spring.boot_security.demo.controller;

import habsida.spring.boot_security.demo.entity.User;
import habsida.spring.boot_security.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String adminPage() {
        return "all_users";
    }

    @GetMapping("/user")
    public String adminUserProfile(Authentication authentication, Model model) {
        String username = authentication.getName();
        User user = userService.findByEmailWithRoles(username);
        model.addAttribute("user", user);
        return "admin_user";
    }

    @GetMapping("/users")
    public String listUsers() {
        return "all_users";
    }

    @GetMapping("/users/new")
    public String newUserForm() {
        return "add_user";
    }

    @GetMapping("/users/{id}/edit")
    public String editUserForm(@PathVariable Long id) {
        return "all_users"; // The edit form is handled by JavaScript
    }
} 