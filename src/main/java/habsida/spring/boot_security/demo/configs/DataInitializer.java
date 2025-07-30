package habsida.spring.boot_security.demo.configs;

import habsida.spring.boot_security.demo.entity.Role;
import habsida.spring.boot_security.demo.entity.User;
import habsida.spring.boot_security.demo.service.RoleService;
import habsida.spring.boot_security.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {
    
    private final UserService userService;
    private final RoleService roleService;
    
    @Autowired
    public DataInitializer(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }
    
    @Override
    public void run(String... args) throws Exception {
        // Create roles if they don't exist
        Role userRole = roleService.getRoleByName("ROLE_USER");
        if (userRole == null) {
            userRole = new Role("ROLE_USER");
            roleService.saveRole(userRole);
        }
        
        Role adminRole = roleService.getRoleByName("ROLE_ADMIN");
        if (adminRole == null) {
            adminRole = new Role("ROLE_ADMIN");
            roleService.saveRole(adminRole);
        }
        
        // Create default admin user if doesn't exist
        User adminUser = userService.findByEmail("admin@admin");
        if (adminUser == null) {
            adminUser = new User("Admin", "Admin", 30, "admin@admin", "admin");
            Set<Role> adminRoles = new HashSet<>();
            adminRoles.add(adminRole);
            adminRoles.add(userRole); // Admin also has USER role
            adminUser.setRoles(adminRoles);
            userService.saveUser(adminUser);
        }
        
        // Create default regular user if doesn't exist
        User regularUser = userService.findByEmail("user@user");
        if (regularUser == null) {
            regularUser = new User("User", "User", 25, "user@user", "user");
            Set<Role> userRoles = new HashSet<>();
            userRoles.add(userRole);
            regularUser.setRoles(userRoles);
            userService.saveUser(regularUser);
        }
        
        System.out.println("Data initialization completed!");
        System.out.println("Default users created:");
        System.out.println("Admin: email=admin@admin, password=admin (ADMIN + USER roles)");
        System.out.println("User: email=user@user, password=user (USER role only)");
    }
} 