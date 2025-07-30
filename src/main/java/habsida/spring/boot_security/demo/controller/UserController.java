package habsida.spring.boot_security.demo.controller;

import habsida.spring.boot_security.demo.entity.User;
import habsida.spring.boot_security.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String userHome(Authentication authentication, Model model) {
        String username = authentication.getName();
        User user = userService.findByEmail(username);
        model.addAttribute("user", user);
        return "user_user";
    }
} 