# Spring Boot Security Demo

This project demonstrates a comprehensive Spring Security implementation with UserDetails and GrantedAuthority interfaces, featuring role-based access control, database-backed authentication, and a modern web interface with enhanced validation and security features.

## Features

- **User Authentication**: Database-backed user authentication with BCrypt password encoding
- **Role-Based Access Control**: Users can have multiple roles (USER, ADMIN) with proper role hierarchy
- **Admin Panel**: Full CRUD operations for user management with role assignment (Admin only)
- **User Dashboard**: Personal user information display with role badges
- **Modern UI**: Professional, responsive design with consistent styling
- **Secure Logout**: Enhanced logout with session invalidation and cookie cleanup
- **Role Management**: Visual role badges and flexible role assignment
- **Role Validation**: Required role assignment with client and server-side validation
- **Enhanced Security**: Multiple layers of validation and security measures

## Technology Stack

- Spring Boot 2.6.2
- Spring Security 5
- Spring Data JPA with transaction management
- MySQL Database (or H2 for development)
- Thymeleaf Templates with Spring Security 5 dialect
- Maven

## Project Structure

```
src/main/java/habsida/spring/boot_security/demo/
├── configs/
│   ├── WebSecurityConfig.java          # Enhanced security configuration
│   ├── SuccessUserHandler.java         # Role-based login success handler
│   └── DataInitializer.java           # Database initialization with role hierarchy
├── controller/
│   ├── MainController.java            # Main page controller
│   ├── UserController.java            # User page controller with authentication injection
│   └── AdminController.java           # Admin CRUD controller with role validation
├── entity/
│   ├── User.java                      # User entity (implements UserDetails)
│   └── Role.java                      # Role entity (implements GrantedAuthority)
├── repository/
│   ├── UserRepository.java            # User data access
│   └── RoleRepository.java            # Role data access
└── service/
    ├── UserService.java               # User business logic with password handling
    ├── RoleService.java               # Role business logic with transaction management
    └── UserDetailsServiceImpl.java    # Custom UserDetailsService
```

## Database Configuration

The application supports both MySQL and H2 databases. Update the database credentials in `application.properties`:

### MySQL Configuration
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/spring_security_demo?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

### H2 Configuration (Development)
```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
```

## Default Users

The application automatically creates two users on startup with proper role hierarchy:

1. **Admin User**:
   - Username: `admin`
   - Password: `admin`
   - Roles: `ROLE_ADMIN` + `ROLE_USER` (inherits user privileges)

2. **Regular User**:
   - Username: `user`
   - Password: `user`
   - Role: `ROLE_USER`

## Access Control

- **Public Access**: `/`, `/index` (login page with feature list)
- **Admin Only**: `/admin/**` (all admin operations with role management)
- **User & Admin**: `/user/**` (user dashboard with role badges)
- **Authentication Required**: All other pages

## Running the Application

1. Ensure your database is running and accessible
2. Update database credentials in `application.properties` if needed
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
4. Access the application at `http://localhost:8080`

## Key Implementation Details

### Enhanced Security Features
- **BCrypt Password Encoding**: Secure password hashing
- **Session Management**: Complete session invalidation on logout
- **Cookie Cleanup**: JSESSIONID removal for enhanced security
- **CSRF Protection**: Built-in CSRF protection
- **Role-Based Redirects**: Custom login success handler
- **Role Validation**: Required role assignment with multiple validation layers

### Role Requirement Validation
- **Server-Side Validation**: Controller-level validation ensuring at least one role is selected
- **Client-Side Validation**: JavaScript validation for immediate user feedback
- **Visual Indicators**: Red asterisk (*) marking required role fields
- **Error Handling**: Clear error messages when validation fails
- **Form Persistence**: User data preserved when validation fails

### UserDetails Interface
The `User` entity implements `UserDetails` interface, providing:
- User authentication information
- Account status (enabled, non-expired, non-locked)
- Authorities (roles) with proper collection handling
- Database constraints for data integrity

### GrantedAuthority Interface
The `Role` entity implements `GrantedAuthority` interface, defining:
- User permissions and roles
- Authority-based access control
- Proper equals/hashCode implementation for collections
- Database constraints (unique, non-null)

### Transaction Management
- **RoleService**: Class-level `@Transactional` with read-only optimizations
- **UserService**: Proper password handling for updates
- **Data Consistency**: Proper transaction boundaries

### Modern UI Features
- **Responsive Design**: Mobile-friendly layouts
- **Role Badges**: Visual role indicators
- **Consistent Styling**: Unified button system
- **Professional Layout**: Clean, modern design
- **Interactive Elements**: Hover effects and transitions
- **Validation Feedback**: Clear error messages and visual indicators

### CRUD Operations
Admin users can perform full CRUD operations on users with role management:
- **Create**: Add new users with required role assignment
- **Read**: View all users in a professional table
- **Update**: Edit existing user information and roles
- **Delete**: Remove users with confirmation dialogs

## Security Features

- **Password Encryption**: BCrypt password hashing
- **Session Security**: Complete session invalidation
- **Cookie Security**: Explicit cookie cleanup
- **Role-Based Authorization**: Granular access control
- **Secure Logout**: Enhanced logout functionality
- **Data Integrity**: Database constraints and validation
- **Transaction Safety**: Proper transaction management
- **Role Validation**: Multi-layer role requirement validation
- **Form Security**: POST-based delete operations with CSRF protection

## UI/UX Improvements

- **Professional Design**: Modern, clean interface
- **Role Visualization**: Visual role badges
- **Responsive Layout**: Mobile-friendly design
- **Consistent Navigation**: Unified button styling
- **User Feedback**: Confirmation dialogs and clear messaging
- **Accessibility**: Proper semantic HTML and styling
- **Validation UX**: Immediate feedback and clear error messages
- **Required Field Indicators**: Visual cues for mandatory fields

## Development Features

- **Console Output**: Data initialization feedback
- **Error Handling**: Graceful error management
- **Code Organization**: Well-structured, maintainable code
- **Best Practices**: Spring Security and JPA best practices
- **Extensibility**: Easy to add new features and roles
- **Validation Layers**: Client and server-side validation
- **Security Best Practices**: Proper CSRF protection and secure operations

## Latest Enhancements

### Role Requirement Implementation
- **Multi-Layer Validation**: Both client-side JavaScript and server-side controller validation
- **User Experience**: Immediate feedback with JavaScript alerts and form error messages
- **Data Integrity**: Ensures all users have at least one role assigned
- **Visual Feedback**: Red asterisks and error messages for required fields

### Enhanced Security
- **POST-based Delete**: Secure delete operations using POST requests
- **Confirmation Dialogs**: User confirmation before destructive operations
- **Form Validation**: Comprehensive validation for user creation and updates
- **Error Handling**: Graceful handling of validation failures

### Improved User Interface
- **Professional Forms**: Clean, modern form design with validation
- **Consistent Styling**: Unified button and form styling
- **Responsive Design**: Mobile-friendly layouts
- **Accessibility**: Proper semantic HTML and ARIA labels 