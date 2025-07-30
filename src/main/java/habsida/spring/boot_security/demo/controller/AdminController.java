package habsida.spring.boot_security.demo.controller;

import habsida.spring.boot_security.demo.entity.Role;
import habsida.spring.boot_security.demo.entity.User;
import habsida.spring.boot_security.demo.service.RoleService;
import habsida.spring.boot_security.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String adminPage(Model model) {
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("allRoles", roleService.getAllRoles());
        return "all_users";
    }

    @GetMapping("/user")
    public String adminUserProfile(Authentication authentication, Model model) {
        String username = authentication.getName();
        User user = userService.findByEmail(username);
        model.addAttribute("user", user);
        return "admin_user";
    }

    @GetMapping("/users")
    public String listUsers(Model model) {
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("allRoles", roleService.getAllRoles());
        return "all_users";
    }

    @GetMapping("/users/new")
    public String newUserForm(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("allRoles", roleService.getAllRoles());
        return "add_user";
    }

    @PostMapping("/users")
    public String createUser(@ModelAttribute User user, @RequestParam(required = false) List<Long> roleIds, Model model) {
        // Validate that at least one role is selected
        if (roleIds == null || roleIds.isEmpty()) {
            model.addAttribute("user", user);
            model.addAttribute("allRoles", roleService.getAllRoles());
            model.addAttribute("roleError", "At least one role must be selected");
            return "add_user";
        }
        
        Set<Role> roles = new HashSet<>();
        for (Long roleId : roleIds) {
            Role role = roleService.getRoleById(roleId);
            if (role != null) {
                roles.add(role);
            }
        }
        user.setRoles(roles);
        
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/users/{id}/edit")
    public String editUserForm(@PathVariable Long id, Model model) {
        User user = userService.getUserById(id);
        if (user != null) {
            model.addAttribute("user", user);
            model.addAttribute("allRoles", roleService.getAllRoles());
            return "all_users"; // The edit form is in the modal on all_users.html
        }
        return "redirect:/admin";
    }

    @PostMapping("/users/{id}")
    public String updateUser(@PathVariable Long id, @ModelAttribute User user, 
                           @RequestParam(required = false) List<Long> roleIds, Model model) {
        user.setId(id);
        
        // Validate that at least one role is selected
        if (roleIds == null || roleIds.isEmpty()) {
            model.addAttribute("user", user);
            model.addAttribute("allRoles", roleService.getAllRoles());
            model.addAttribute("roleError", "At least one role must be selected");
            return "all_users"; // The edit form is in the modal on all_users.html
        }
        
        Set<Role> roles = new HashSet<>();
        for (Long roleId : roleIds) {
            Role role = roleService.getRoleById(roleId);
            if (role != null) {
                roles.add(role);
            }
        }
        user.setRoles(roles);
        
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @PostMapping("/users/{id}/delete")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
} 