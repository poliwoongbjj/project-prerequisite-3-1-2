# Spring Boot Security Demo - Bootstrap Redesign

This project demonstrates a comprehensive Spring Security implementation with UserDetails and GrantedAuthority interfaces, featuring role-based access control, database-backed authentication, and a modern Bootstrap-based web interface with enhanced validation and security features.

## Features

- **Email-Based Authentication**: Users authenticate using their email address instead of username
- **User Authentication**: Database-backed user authentication with BCrypt password encoding
- **Role-Based Access Control**: Users can have multiple roles (USER, ADMIN) with proper role hierarchy
- **Admin Panel**: Full CRUD operations for user management with role assignment (Admin only)
- **User Dashboard**: Personal user information display with role badges
- **Modern Bootstrap UI**: Professional, responsive design using Bootstrap 5.3.0
- **Secure Logout**: Enhanced logout with session invalidation and cookie cleanup
- **Role Management**: Visual role badges and flexible role assignment
- **Role Validation**: Required role assignment with client and server-side validation
- **Enhanced Security**: Multiple layers of validation and security measures
- **Modal-Based Interface**: Edit and delete operations using Bootstrap modals

## Technology Stack

- Spring Boot 2.6.2
- Spring Security 5
- Spring Data JPA with transaction management
- MySQL Database (or H2 for development)
- Thymeleaf Templates with Spring Security 5 dialect
- Bootstrap 5.3.0 for modern UI
- Maven

## Project Structure

```
src/main/java/habsida/spring/boot_security/demo/
├── configs/
│   ├── WebSecurityConfig.java          # Enhanced security configuration
│   ├── SuccessUserHandler.java         # Role-based login success handler
│   └── DataInitializer.java           # Database initialization with role hierarchy
├── controller/
│   ├── HomeController.java            # Home page redirect controller
│   ├── LoginController.java           # Login page controller
│   ├── UserController.java            # User page controller with authentication injection
│   └── AdminController.java           # Admin CRUD controller with role validation
├── entity/
│   ├── User.java                      # User entity (implements UserDetails)
│   └── Role.java                      # Role entity (implements GrantedAuthority)
├── repository/
│   ├── UserRepository.java            # User data access with email-based queries
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
spring.datasource.url=jdbc:mysql://localhost:3306/spring_security_demo?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=create-drop
```

### H2 Configuration (Development)
```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=create-drop
```

## Default Users

The application automatically creates two users on startup with proper role hierarchy:

1. **Admin User**:
   - Email: `admin@admin`
   - Password: `admin`
   - Roles: `ROLE_ADMIN` + `ROLE_USER` (inherits user privileges)

2. **Regular User**:
   - Email: `user@user`
   - Password: `user`
   - Role: `ROLE_USER`

## Access Control

- **Public Access**: `/`, `/login` (login page with Bootstrap styling)
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

### Email-Based Authentication
- **User Entity**: Uses email as the primary identifier for authentication
- **UserDetails Implementation**: `getUsername()` method returns email address
- **Repository Layer**: `findByEmail()` method for user lookup
- **Service Layer**: Updated to use email-based authentication
- **Login Form**: Email input field with proper validation

### Enhanced Security Features
- **BCrypt Password Encoding**: Secure password hashing
- **Session Management**: Complete session invalidation on logout
- **Cookie Cleanup**: JSESSIONID removal for enhanced security
- **CSRF Protection**: Built-in CSRF protection
- **Role-Based Redirects**: Custom login success handler
- **Role Validation**: Required role assignment with multiple validation layers

### Modern Bootstrap UI
- **Bootstrap 5.3.0**: Latest Bootstrap framework for responsive design
- **Professional Layout**: Clean, modern interface with consistent styling
- **Modal Dialogs**: Edit and delete operations using Bootstrap modals
- **Responsive Design**: Mobile-friendly layouts and components
- **Navigation**: Sidebar navigation with active state indicators
- **Form Styling**: Bootstrap form components with validation states

### Role Requirement Validation
- **Server-Side Validation**: Controller-level validation ensuring at least one role is selected
- **Client-Side Validation**: JavaScript validation for immediate user feedback
- **Visual Indicators**: Error messages and validation feedback
- **Error Handling**: Clear error messages when validation fails
- **Form Persistence**: User data preserved when validation fails

### UserDetails Interface
The `User` entity implements `UserDetails` interface, providing:
- User authentication information using email as username
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

### CRUD Operations
Admin users can perform full CRUD operations on users with role management:
- **Create**: Add new users with required role assignment using dedicated form
- **Read**: View all users in a professional Bootstrap table
- **Update**: Edit existing user information and roles using modal dialogs
- **Delete**: Remove users with confirmation dialogs in modals

## Security Features

- **Email-Based Authentication**: Users authenticate using email addresses
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

- **Bootstrap 5.3.0**: Modern, responsive framework
- **Professional Design**: Clean, modern interface with consistent styling
- **Modal-Based Operations**: Edit and delete operations using Bootstrap modals
- **Role Visualization**: Visual role badges and indicators
- **Responsive Layout**: Mobile-friendly design
- **Consistent Navigation**: Unified button styling and navigation
- **User Feedback**: Confirmation dialogs and clear messaging
- **Accessibility**: Proper semantic HTML and ARIA labels
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

### Email-Based Authentication System
- **User Entity Updates**: Modified to use email as primary identifier
- **Repository Layer**: Updated to use `findByEmail()` method
- **Service Layer**: Modified authentication logic for email-based login
- **Login Interface**: Updated login form to use email input field
- **UserDetails Implementation**: `getUsername()` now returns email address

### Bootstrap 5.3.0 Integration
- **Modern UI Framework**: Latest Bootstrap version for responsive design
- **Professional Styling**: Clean, modern interface with consistent components
- **Modal Dialogs**: Edit and delete operations using Bootstrap modals
- **Responsive Navigation**: Sidebar navigation with active state management
- **Form Components**: Bootstrap form styling with validation states

### Enhanced User Interface
- **Login Page**: Modern Bootstrap-styled login form
- **Admin Panel**: Professional admin interface with tabbed navigation
- **User Dashboard**: Clean user information display
- **Modal Operations**: Inline edit and delete operations using modals
- **Consistent Design**: Unified styling across all pages

### Improved User Experience
- **Streamlined Navigation**: Clear navigation with active state indicators
- **Visual Feedback**: Role badges and status indicators
- **Form Validation**: Client and server-side validation with clear error messages
- **Responsive Design**: Mobile-friendly layouts and components
- **Professional Layout**: Clean, modern design with proper spacing and typography 