import { CourseSlides } from '../models/slide.model';

export const springBootSlides: CourseSlides = {
  category: 'springboot',
  slides: [
    {
      id: 1,
      topic: 'What is Spring Boot?',
      description: 'A comprehensive introduction to Spring Boot framework and its core concepts',
      content: [
        '# Spring Boot Overview',
        'Spring Boot is an opinionated framework built on top of the Spring Framework, designed to simplify the development of production-ready applications.',
        'It addresses the complexity of configuration in traditional Spring applications by providing smart defaults and auto-configuration.',
        '## Key Features',
        '* **Opinionated Defaults**: Spring Boot provides pre-configured settings for most Spring libraries and third-party dependencies, reducing the need for manual configuration.',
        '* **Standalone Applications**: Creates self-contained applications that can be run with a simple java -jar command, including an embedded server.',
        '* **Auto-Configuration**: Automatically configures your application based on the dependencies present in your classpath.',
        '* **Production-Ready Features**: Built-in metrics, health checks, and externalized configuration.',
        '## Core Components',
        '1. **Spring Boot Starters**',
        '   - Dependency descriptors that simplify Maven/Gradle configuration',
        '   - Curated dependencies for specific use cases',
        '   - Ensures compatibility between dependencies',
        '2. **Auto-configuration**',
        '   - Automatic Spring configuration based on classpath dependencies',
        '   - Conditional configuration based on presence/absence of beans',
        '   - Override capabilities for custom requirements'
      ],
      code: `// Minimal Spring Boot Application
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

/* The @SpringBootApplication annotation includes:
 * @Configuration: Tags the class as a source of bean definitions
 * @EnableAutoConfiguration: Enables Spring Boot's auto-configuration
 * @ComponentScan: Enables component scanning in the current package
 */`,
      language: 'java'
    },
    {
      id: 2,
      topic: 'Spring Boot Architecture and Core Principles',
      description: 'Deep dive into Spring Boot architecture, design principles, and key components',
      content: [
        `# Spring Boot Architecture

## 1. Core Container
The Spring Core Container is the foundation of the framework, providing:

* **Dependency Injection (DI) Container**
  - Manages application components and their lifecycle
  - Handles dependency wiring
  - Supports different scopes (singleton, prototype, etc.)

* **Bean Lifecycle Management**
  - Initialization and destruction callbacks
  - Post-processing capabilities
  - Scope management

* **Expression Language Support**
  - SpEL for dynamic resolution
  - Property access and method invocation
  - Collection manipulation

## 2. Auto-Configuration
Spring Boot's auto-configuration mechanism:

* Analyzes your classpath and existing configuration
* Automatically configures beans based on predefined conditions
* Allows override of default configurations when needed

## 3. Design Principles

### Convention over Configuration
* Sensible defaults reduce configuration needs
* Override capabilities for custom requirements
* Standardized project structure

### Opinionated Defaults
* Pre-configured settings for quick start
* Based on industry best practices
* Reduces decision fatigue

### Production-Ready
* Built-in monitoring and management
* External configuration support
* Metrics and health checks

### Standalone Nature
* Self-contained deployment units
* Simplified DevOps integration
* Embedded server support`
      ],
      code: `@Configuration
@EnableAutoConfiguration
public class ApplicationConfig {

    @Bean
    public DataSource dataSource() {
        return DataSourceBuilder.create()
            .url("jdbc:mysql://localhost:3306/mydb")
            .username("user")
            .password("password")
            .build();
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}`,
      language: 'java'
    },
    {
      id: 3,
      topic: 'Spring Boot Configuration',
      description: 'Understanding different ways to configure Spring Boot applications',
      content: [
        `# Spring Boot Configuration

## Configuration Types

### 1. Application Properties
* Properties files (application.properties)
* YAML files (application.yml)
* Environment variables
* Command-line arguments

### 2. Profile-based Configuration
* Environment-specific settings
* Multiple profile support
* Profile activation strategies

### 3. Externalized Configuration
Spring Boot uses a specific order to load properties:

1. Command-line arguments
2. SPRING_APPLICATION_JSON properties
3. ServletConfig init parameters
4. ServletContext init parameters
5. JNDI attributes from java:comp/env
6. Java System properties
7. OS environment variables
8. Profile-specific application properties

## Best Practices
* Use YAML for better readability
* Utilize profile-specific configurations
* Externalize sensitive information
* Use type-safe configuration properties
* Document configuration properties`
      ],
      code: `# Application properties example
spring:
  application:
    name: my-app
  
  # Database Configuration
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}
  
  # JPA Properties
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    
  # Custom Properties
  custom:
    feature-flags:
      new-ui: true
      beta-features: false
    cache:
      timeout: 3600
      size: 1000`,
      language: 'yaml'
    },
    {
      id: 4,
      topic: 'User Management - Domain Model',
      description: 'Implementing the user domain model with JPA',
      content: [
        `# User Management Implementation

## Domain Model Design

We'll create a robust user management system with:
* User registration and authentication
* Role-based access control
* Profile management
* Password encryption
* Email verification

### Entity Relationships
* User ↔ Role (Many-to-Many)
* User ↔ UserProfile (One-to-One)
* User ↔ Address (One-to-Many)

### Security Considerations
* Password encryption using BCrypt
* Token-based authentication
* Session management
* Account locking after failed attempts
* Password reset functionality`,
      ],
      code: `@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserProfile profile;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Address> addresses = new ArrayList<>();

    private boolean enabled = false;
    private boolean accountNonLocked = true;
    private int failedAttempts = 0;
    private LocalDateTime lockTime;
}

@Entity
@Table(name = "roles")
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private RoleType name;
}

@Entity
@Table(name = "user_profiles")
@Data
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String profilePicture;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
}`,
      language: 'java'
    },
    {
      id: 5,
      topic: 'User Management - Repository Layer',
      description: 'Implementing data access layer with Spring Data JPA',
      content: [
        `# Repository Layer Implementation

## Spring Data JPA Repositories

The repository layer provides:
* CRUD operations
* Custom query methods
* Pagination and sorting
* Specification-based filtering
* Query optimization

### Features
* Custom finder methods
* Native queries for complex operations
* Specification support for dynamic queries
* Auditing support
* Optimistic locking

### Best Practices
* Use interfaces over concrete classes
* Leverage query methods naming conventions
* Implement pagination for large datasets
* Use projections for optimized queries
* Cache frequently accessed data`,
      ],
      code: `@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.enabled = true")
    Optional<User> findActiveUserByEmail(@Param("email") String email);
    
    @Query(value = """
        SELECT u.* FROM users u
        JOIN user_roles ur ON u.id = ur.user_id
        JOIN roles r ON ur.role_id = r.id
        WHERE r.name = :roleName
        """, nativeQuery = true)
    List<User> findUsersByRole(@Param("roleName") String roleName);
    
    @Query("SELECT u FROM User u WHERE u.failedAttempts >= :maxAttempts")
    List<User> findLockedUsers(@Param("maxAttempts") int maxAttempts);
    
    @Modifying
    @Query("UPDATE User u SET u.failedAttempts = :attempts WHERE u.id = :id")
    void updateFailedAttempts(@Param("attempts") int attempts, @Param("id") Long id);
    
    Page<User> findByEnabledTrue(Pageable pageable);
}

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    List<UserProfile> findByPhoneNumberContaining(String phoneNumber);
    
    @Query("SELECT new com.example.dto.UserProfileDTO(" +
           "u.email, p.phoneNumber, p.dateOfBirth) " +
           "FROM UserProfile p JOIN p.user u")
    List<UserProfileDTO> findAllUserProfiles();
}

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleType name);
}`,
      language: 'java'
    },
    {
      id: 6,
      topic: 'User Management - Service Layer',
      description: 'Implementing business logic and service layer',
      content: [
        `# Service Layer Implementation

## Business Logic Layer

The service layer handles:
* Business logic implementation
* Transaction management
* Security rules
* Event publishing
* Integration with other services

### Key Features
* User registration flow
* Authentication process
* Password management
* Email verification
* Account locking/unlocking
* Profile management

### Best Practices
* Implement interface-based design
* Use DTOs for data transfer
* Handle business exceptions
* Implement proper validation
* Follow Single Responsibility Principle`,
      ],
      code: `@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final EventPublisher eventPublisher;

    @Override
    public UserDTO registerUser(UserRegistrationDTO registrationDTO) {
        // Validate input
        validateRegistrationInput(registrationDTO);

        // Check if user exists
        if (userRepository.existsByEmail(registrationDTO.getEmail())) {
            throw new UserAlreadyExistsException("Email already registered");
        }

        // Create user entity
        User user = User.builder()
            .email(registrationDTO.getEmail())
            .password(passwordEncoder.encode(registrationDTO.getPassword()))
            .firstName(registrationDTO.getFirstName())
            .lastName(registrationDTO.getLastName())
            .build();

        // Add default role
        Role userRole = roleRepository.findByName(RoleType.ROLE_USER)
            .orElseThrow(() -> new RoleNotFoundException("Default role not found"));
        user.getRoles().add(userRole);

        // Save user
        User savedUser = userRepository.save(user);

        // Send verification email
        emailService.sendVerificationEmail(savedUser);

        // Publish event
        eventPublisher.publishUserRegisteredEvent(savedUser);

        return UserMapper.toDTO(savedUser);
    }

    @Override
    public void verifyEmail(String token) {
        User user = validateAndGetUserFromToken(token);
        user.setEnabled(true);
        userRepository.save(user);
    }

    @Override
    public void resetPassword(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException("User not found"));

        String resetToken = generateResetToken(user);
        emailService.sendPasswordResetEmail(user, resetToken);
    }

    @Override
    public void updatePassword(String token, String newPassword) {
        User user = validateAndGetUserFromToken(token);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public void updateProfile(Long userId, UserProfileUpdateDTO profileDTO) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("User not found"));

        UserProfile profile = user.getProfile();
        if (profile == null) {
            profile = new UserProfile();
            profile.setUser(user);
        }

        profile.setPhoneNumber(profileDTO.getPhoneNumber());
        profile.setDateOfBirth(profileDTO.getDateOfBirth());
        profile.setBio(profileDTO.getBio());

        user.setProfile(profile);
        userRepository.save(user);
    }

    private void validateRegistrationInput(UserRegistrationDTO dto) {
        if (!isValidEmail(dto.getEmail())) {
            throw new InvalidInputException("Invalid email format");
        }
        if (!isValidPassword(dto.getPassword())) {
            throw new InvalidInputException("Password does not meet requirements");
        }
        // Additional validation as needed
    }
}`,
      language: 'java'
    },
    {
      id: 7,
      topic: 'REST Controllers - API Endpoints',
      description: 'Implementing RESTful API endpoints with Spring MVC',
      content: [
        `# REST API Implementation

## RESTful API Design

### API Structure
* Follow REST principles
* Use proper HTTP methods
* Implement proper status codes
* Version your APIs
* Use consistent naming conventions

### Features
* CRUD operations
* Request validation
* Response formatting
* Error handling
* API documentation

### Best Practices
* Use DTOs for request/response
* Implement proper validation
* Handle exceptions globally
* Document with OpenAPI/Swagger
* Implement HATEOAS for better discoverability`,
      ],
      code: `@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "User Management", description = "User management APIs")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping("/register")
    @Operation(summary = "Register new user")
    public ResponseEntity<UserDTO> registerUser(
            @Valid @RequestBody UserRegistrationDTO registrationDTO) {
        UserDTO userDTO = userService.registerUser(registrationDTO);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(userDTO);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.isCurrentUser(#id)")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        UserDTO userDTO = userService.getUserById(id);
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/{id}/profile")
    @Operation(summary = "Update user profile")
    @PreAuthorize("@userSecurity.isCurrentUser(#id)")
    public ResponseEntity<UserProfileDTO> updateProfile(
            @PathVariable Long id,
            @Valid @RequestBody UserProfileUpdateDTO profileDTO) {
        UserProfileDTO updatedProfile = userService.updateProfile(id, profileDTO);
        return ResponseEntity.ok(updatedProfile);
    }

    @PostMapping("/password-reset")
    @Operation(summary = "Request password reset")
    public ResponseEntity<Void> requestPasswordReset(
            @Valid @RequestBody PasswordResetRequestDTO requestDTO) {
        userService.resetPassword(requestDTO.getEmail());
        return ResponseEntity.accepted().build();
    }

    @GetMapping
    @Operation(summary = "Get all users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<UserDTO>> getAllUsers(
            @ParameterObject Pageable pageable,
            @RequestParam(required = false) String search) {
        Page<UserDTO> users = userService.getAllUsers(pageable, search);
        return ResponseEntity.ok(users);
    }
}`,
      language: 'java'
    },
    {
      id: 8,
      topic: 'Security Configuration - JWT Implementation',
      description: 'Implementing JWT-based authentication and authorization',
      content: [
        `# Security Implementation

## JWT Authentication

### Features
* Token-based authentication
* Role-based authorization
* Secure password handling
* Session management
* CORS configuration

### Security Measures
* Token expiration
* Refresh token mechanism
* Password encryption
* Request filtering
* Cross-Site Scripting (XSS) protection

### Implementation Steps
1. JWT Token generation
2. Authentication filter
3. Authorization configuration
4. Password encoding
5. Security context management`,
      ],
      code: `@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final UserService userService;
    private final JwtService jwtService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/api/v1/public/**").permitAll()
                .requestMatchers("/swagger-ui/**").permitAll()
                .requestMatchers("/v3/api-docs/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

@Service
@RequiredArgsConstructor
public class JwtService {
    @Value("\${jwt.secret-key}")
    private String secretKey;
    
    @Value("\${jwt.expiration}")
    private long jwtExpiration;
    
    @Value("\${jwt.refresh-token.expiration}")
    private long refreshExpiration;

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {
        return Jwts
            .builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
            .parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}`,
      language: 'java'
    },
    {
      id: 9,
      topic: 'First Spring Boot Application',
      description: 'Creating and understanding your first Spring Boot application',
      content: [
        'Basic project structure explanation',
        'Understanding the main application class',
        'Spring Boot annotations overview',
        'Running your first application',
        'Application properties introduction'
      ],
      code: `// Main Application Class
@SpringBootApplication  // Combines @Configuration, @EnableAutoConfiguration, and @ComponentScan
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

// Basic REST Controller
@RestController  // Combines @Controller and @ResponseBody
@RequestMapping("/api")  // Base URL for all endpoints in this controller
public class HelloController {
    
    @GetMapping("/hello")  // Handles HTTP GET requests
    public String sayHello() {
        return "Hello, Spring Boot!";
    }
    
    @GetMapping("/hello/{name}")  // Path variable example
    public String sayHelloTo(@PathVariable String name) {
        return String.format("Hello, %s!", name);
    }
}`,
      language: 'java'
    },
    {
      id: 10,
      topic: 'Spring Boot Project Structure',
      description: 'Detailed explanation of Spring Boot project organization and best practices',
      content: [
        'Standard project layout and package structure',
        'Important configuration files and their purposes',
        'Resource organization (static, templates, properties)',
        'Understanding the build configuration',
        'Common project components and their placement'
      ],
      code: `src
├── main
│   ├── java
│   │   └── com.example.demo
│   │       ├── DemoApplication.java         # Main application class
│   │       ├── config                       # Configuration classes
│   │       │   └── SecurityConfig.java
│   │       ├── controller                   # REST controllers
│   │       │   └── UserController.java
│   │       ├── model                        # Domain models
│   │       │   └── User.java
│   │       ├── repository                   # Data access layer
│   │       │   └── UserRepository.java
│   │       └── service                      # Business logic
│   │           └── UserService.java
│   └── resources
│       ├── application.yml                  # Application properties
│       ├── static                          # Static resources
│       └── templates                       # Template files
└── test                                    # Test classes
    └── java
        └── com.example.demo
            └── DemoApplicationTests.java`,
      language: 'plaintext'
    },
    {
      id: 11,
      topic: 'Spring Boot Core Annotations',
      description: 'Essential Spring Boot annotations and their usage',
      content: [
        'Component annotations for dependency injection',
        'Request mapping annotations for REST endpoints',
        'Configuration and bean definition annotations',
        'JPA and database-related annotations',
        'Cross-cutting concern annotations'
      ],
      code: `// Component Annotations
@Component       // Generic Spring-managed component
@Service         // Business logic layer
@Repository      // Data access layer
@Controller      // MVC Controller
@RestController  // REST Controller

// Configuration Example
@Configuration
public class AppConfig {
    @Bean  // Explicitly declare a Spring bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}

// REST Controller Example with Common Annotations
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired  // Constructor injection
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping  // Handle GET requests
    public List<User> getUsers(
        @RequestParam(required = false) String name,  // Query parameter
        @RequestHeader("Authorization") String token  // Header parameter
    ) {
        return userService.findUsers(name);
    }

    @PostMapping  // Handle POST requests
    @ResponseStatus(HttpStatus.CREATED)  // Set response status
    public User createUser(@Valid @RequestBody UserDTO user) {  // Request body validation
        return userService.createUser(user);
    }
}

// Entity Example with JPA Annotations
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Email  // Validation annotation
    @Column(unique = true)
    private String email;

    // Relationship example
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders;
}`,
      language: 'java'
    },
    {
      id: 12,
      topic: 'Application Properties and Profiles',
      description: 'Configuration management and environment-specific settings',
      content: [
        'Different types of configuration properties',
        'Environment-specific configurations using profiles',
        'Externalized configuration options',
        'Property binding and type-safe configuration',
        'Common application properties and their usage'
      ],
      code: `# application.yml - Common Properties
spring:
  application:
    name: demo-application
  
  # Database Configuration
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: \${DB_USERNAME}  # Environment variable
    password: \${DB_PASSWORD}
  
  # JPA Properties
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        
  # Profile-specific properties
  profiles:
    active: dev  # Active profile
    
# Server Configuration
server:
  port: 8080
  servlet:
    context-path: /api
    
# Custom Application Properties
app:
  security:
    jwt:
      secret: \${JWT_SECRET}
      expiration: 86400000  # 24 hours
  feature-flags:
    new-user-workflow: true
    
# Logging Configuration
logging:
  level:
    root: INFO
    com.example: DEBUG
    org.springframework: WARN
    
---
# Development Profile
spring:
  config:
    activate:
      on-profile: dev
  
  # H2 Database for development
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    
  # Enable H2 Console
  h2:
    console:
      enabled: true
      path: /h2-console

---
# Production Profile
spring:
  config:
    activate:
      on-profile: prod
  
  # Disable debug features
  jpa:
    show-sql: false
    
# Enhanced security for production
server:
  ssl:
    enabled: true
    key-store: classpath:keystore.p12
    key-store-password: \${KEYSTORE_PASSWORD}`,
      language: 'yaml'
    },
    {
      id: 13,
      topic: 'Setting Up Development Environment',
      description: 'Complete guide to setting up your Spring Boot development environment',
      content: [
        'Installing JDK and configuring JAVA_HOME',
        'Setting up IDE (IntelliJ IDEA/Eclipse)',
        'Installing Maven/Gradle',
        'Using Spring Initializr (start.spring.io)',
        'Understanding project structure and build files'
      ],
      code: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.1.0</version>
    </parent>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>`,
      language: 'xml'
    },
    {
      id: 14,
      topic: 'Spring Boot Configuration',
      description: 'Deep dive into Spring Boot configuration options and best practices',
      content: [
        'Understanding application.properties/yaml',
        'Profile-based configuration',
        'Externalized configuration',
        'Configuration properties classes',
        'Logging configuration'
      ],
      code: `# Application properties example
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: user
    password: password
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
  
logging:
  level:
    org.springframework: INFO
    com.example: DEBUG

server:
  port: 8080
  servlet:
    context-path: /api`,
      language: 'yaml'
    },
    {
      id: 15,
      topic: 'Dependency Injection & IoC',
      description: 'Understanding core Spring concepts of Dependency Injection and Inversion of Control',
      content: [
        'Dependency Injection principles',
        'Types of DI: Constructor, Setter, Field injection',
        'Component scanning',
        'Bean lifecycle and scopes',
        'Using @Autowired, @Component, @Service, @Repository'
      ],
      code: `@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;

    // Constructor injection (recommended)
    @Autowired
    public UserServiceImpl(UserRepository userRepository, 
                         EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    @Override
    public User createUser(User user) {
        User savedUser = userRepository.save(user);
        emailService.sendWelcomeEmail(user.getEmail());
        return savedUser;
    }
}`,
      language: 'java'
    },
    {
      id: 16,
      topic: 'RESTful Web Services',
      description: 'Building REST APIs with Spring Boot and implementing CRUD operations',
      content: [
        'REST principles and architecture',
        'HTTP methods and their usage',
        'Request/Response handling',
        'Path variables and Request parameters',
        'Response status codes and error handling'
      ],
      code: `@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(userService.getAllUsers(page, size));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) {
        User user = userService.createUser(userDTO);
        return ResponseEntity
            .created(URI.create("/api/v1/users/" + user.getId()))
            .body(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}`,
      language: 'java'
    },
    {
      id: 17,
      topic: 'Data Access with Spring Data JPA',
      description: 'Comprehensive guide to database operations using Spring Data JPA',
      content: [
        'JPA Entity mapping and relationships',
        'Repository pattern implementation',
        'JPQL and native queries',
        'Pagination and sorting',
        'Transaction management'
      ],
      code: `@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Email
    @Column(unique = true)
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders;

    // Getters, setters, constructors
}

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.name LIKE %:keyword%")
    List<User> searchByNameContaining(@Param("keyword") String keyword);
    
    @Modifying
    @Query("UPDATE User u SET u.status = :status WHERE u.lastLoginDate < :date")
    int updateInactiveUsers(@Param("status") String status, 
                           @Param("date") LocalDateTime date);
}`,
      language: 'java'
    },
    {
      id: 18,
      topic: 'Exception Handling & Validation',
      description: 'Implementing robust error handling and input validation',
      content: [
        'Global exception handling with @ControllerAdvice',
        'Custom exceptions and error responses',
        'Bean validation using Jakarta Validation',
        'Custom validation annotations',
        'Error response standardization'
      ],
      code: `@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
            ResourceNotFoundException ex, WebRequest request) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            request.getDescription(false),
            LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .collect(Collectors.toMap(
                FieldError::getField,
                FieldError::getDefaultMessage
            ));
        
        ErrorResponse error = new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            "Validation failed",
            errors,
            LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}`,
      language: 'java'
    },
    {
      id: 19,
      topic: 'Security Implementation',
      description: 'Implementing security features and JWT authentication',
      content: [
        'Spring Security configuration',
        'JWT token generation and validation',
        'Role-based access control (RBAC)',
        'Password encryption',
        'OAuth2 integration'
      ],
      code: `@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, 
                UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`,
      language: 'java'
    },
    {
      id: 20,
      topic: 'Testing Strategies',
      description: 'Comprehensive testing approaches for Spring Boot applications',
      content: [
        'Unit testing with JUnit 5',
        'Integration testing with @SpringBootTest',
        'Mocking with Mockito',
        'Testing REST APIs with TestRestTemplate',
        'Database testing with TestContainers'
      ],
      code: `@SpringBootTest
class UserServiceIntegrationTest {
    @Autowired
    private UserService userService;
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Container
    static PostgreSQLContainer<?> postgres = 
        new PostgreSQLContainer<>("postgres:14-alpine");
    
    @Test
    void whenCreateUser_thenUserIsSaved() {
        UserDTO userDTO = new UserDTO("John Doe", "john@example.com");
        
        ResponseEntity<User> response = restTemplate.postForEntity(
            "/api/v1/users",
            userDTO,
            User.class
        );
        
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().getEmail()).isEqualTo(userDTO.getEmail());
    }
}`,
      language: 'java'
    },
    {
      id: 21,
      topic: 'Microservices Architecture',
      description: 'Building and deploying microservices with Spring Cloud',
      content: [
        'Microservices principles and patterns',
        'Service discovery with Eureka',
        'API Gateway implementation',
        'Circuit breaker pattern',
        'Distributed tracing'
      ],
      code: `@SpringBootApplication
@EnableEurekaClient
@EnableCircuitBreaker
public class OrderServiceApplication {
    
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
    
    @CircuitBreaker(name = "paymentService")
    @GetMapping("/orders/{orderId}/payment")
    public PaymentDetails getPaymentDetails(@PathVariable String orderId) {
        return restTemplate.getForObject(
            "http://payment-service/payments/{orderId}",
            PaymentDetails.class,
            orderId
        );
    }
}`,
      language: 'java'
    },
    {
      id: 22,
      topic: 'API Documentation with OpenAPI/Swagger',
      description: 'Implementing comprehensive API documentation',
      content: [
        `# API Documentation

## OpenAPI/Swagger Implementation

### Key Components
* API Descriptions
* Request/Response Models
* Authentication Details
* Error Responses
* Example Payloads

### Best Practices
* Document all endpoints
* Include authentication details
* Provide example requests/responses
* Document error scenarios
* Use proper grouping and tags

### Implementation Steps
1. Configure OpenAPI
2. Add annotations
3. Define security schemes
4. Document models
5. Add examples`,
      ],
      code: `@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("E-Commerce API")
                .description("REST API for E-Commerce Application")
                .version("1.0.0")
                .contact(new Contact()
                    .name("Development Team")
                    .email("dev@example.com"))
                .license(new License()
                    .name("Apache 2.0")
                    .url("http://www.apache.org/licenses/LICENSE-2.0.html")))
            .servers(List.of(
                new Server().url("http://localhost:8080").description("Development server"),
                new Server().url("https://api.production.com").description("Production server")))
            .components(new Components()
                .securitySchemes(Map.of(
                    "bearerAuth", new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                        .description("JWT token authentication"))))
            .security(List.of(new SecurityRequirement().addList("bearerAuth")));
    }
}

@RestController
@RequestMapping("/api/v1/products")
@Tag(name = "Product Management", description = "APIs for managing products")
public class ProductController {
    @Operation(
        summary = "Create new product",
        description = "Creates a new product with the provided details"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "201",
            description = "Product created successfully",
            content = @Content(schema = @Schema(implementation = ProductDTO.class))
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid input",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))
        )
    })
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(
            @RequestBody @Valid ProductCreateDTO productDTO) {
        // Implementation
    }
}`,
      language: 'java'
    },
    {
      id: 23,
      topic: 'Deployment Configuration',
      description: 'Production deployment setup and configuration',
      content: [
        `# Deployment Configuration

## Production Deployment

### Environment Setup
* Configuration Management
* Environment Variables
* Logging Configuration
* Monitoring Setup
* Security Hardening

### Deployment Options
1. **Container-based Deployment**
   * Docker configuration
   * Kubernetes setup
   * Container orchestration
   * Resource management

2. **Cloud Deployment**
   * AWS/Azure/GCP setup
   * Auto-scaling
   * Load balancing
   * Database configuration

3. **Monitoring & Logging**
   * Actuator endpoints
   * Prometheus/Grafana
   * ELK Stack
   * Log aggregation`,
      ],
      code: `# Docker configuration
FROM eclipse-temurin:17-jdk-alpine as build
WORKDIR /workspace/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN ./mvnw install -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM eclipse-temurin:17-jre-alpine
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/target/dependency
COPY --from=build \${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build \${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build \${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","com.example.ecommerce.ECommerceApplication"]

# Application properties for production
spring:
  datasource:
    url: \${JDBC_DATABASE_URL}
    username: \${JDBC_DATABASE_USERNAME}
    password: \${JDBC_DATABASE_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
  redis:
    host: \${REDIS_HOST}
    port: \${REDIS_PORT}
    password: \${REDIS_PASSWORD}
  
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus
  metrics:
    tags:
      application: \${SPRING_APPLICATION_NAME}
    export:
      prometheus:
        enabled: true

logging:
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
  level:
    root: INFO
    com.example.ecommerce: DEBUG
    org.springframework: WARN

security:
  jwt:
    secret-key: \${JWT_SECRET_KEY}
    expiration: 86400000 # 24 hours
    refresh-token:
      expiration: 604800000 # 7 days`,
      language: 'yaml'
    },
    {
      id: 24,
      topic: 'Microservices Architecture',
      description: 'Implementing microservices with Spring Cloud',
      content: [
        `# Microservices Architecture

## Spring Cloud Components

### Core Services
1. **Service Discovery (Eureka)**
   * Service registration
   * Service discovery
   * Load balancing

2. **API Gateway (Spring Cloud Gateway)**
   * Route management
   * Load balancing
   * Security
   * Rate limiting

3. **Config Server**
   * Centralized configuration
   * Environment management
   * Secret management

4. **Circuit Breaker (Resilience4j)**
   * Fault tolerance
   * Fallback mechanisms
   * Bulkhead pattern

### Communication Patterns
* Synchronous (REST)
* Asynchronous (Event-driven)
* Message Queues
* Event Sourcing`,
      ],
      code: `@SpringBootApplication
@EnableDiscoveryClient
public class ProductServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }
}

# Gateway Configuration
spring:
  cloud:
    gateway:
      routes:
        - id: product-service
          uri: lb://product-service
          predicates:
            - Path=/api/v1/products/**
          filters:
            - name: CircuitBreaker
              args:
                name: productService
                fallbackUri: forward:/fallback/products
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/v1/orders/**
          filters:
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10
                redis-rate-limiter.burstCapacity: 20

@Configuration
public class CircuitBreakerConfig {
    @Bean
    public Customizer<Resilience4jCircuitBreakerFactory> defaultCustomizer() {
        return factory -> factory.configureDefault(id -> new CircuitBreakerConfig.Builder()
            .slidingWindowType(CircuitBreakerConfig.SlidingWindowType.COUNT_BASED)
            .slidingWindowSize(10)
            .failureRateThreshold(50)
            .waitDurationInOpenState(Duration.ofMillis(5000))
            .permittedNumberOfCallsInHalfOpenState(3)
            .recordExceptions(IOException.class, TimeoutException.class)
            .build());
    }
}

@Service
public class ProductService {
    private final RestTemplate restTemplate;
    
    @CircuitBreaker(name = "inventoryService", fallbackMethod = "getDefaultInventory")
    @RateLimiter(name = "inventoryService")
    @Bulkhead(name = "inventoryService")
    public InventoryResponse checkInventory(Long productId) {
        return restTemplate.getForObject(
            "http://inventory-service/api/v1/inventory/{productId}",
            InventoryResponse.class,
            productId
        );
    }
    
    public InventoryResponse getDefaultInventory(Long productId, Exception ex) {
        return new InventoryResponse(productId, 0, false);
    }
}`,
      language: 'java'
    },
        {
      id: 25,
      topic: 'Introduction to Spring Core',
      description: 'Understanding fundamental Spring concepts and principles',
      content: [
        "Spring Core Concepts:",
        "• Inversion of Control (IoC)",
        "• Dependency Injection (DI)",
        "• ApplicationContext",
        "• Bean Lifecycle",
        "• AOP (Aspect-Oriented Programming)",
        "",
        "Key Components:",
        "• Beans and Bean Factory",
        "• Component Scanning",
        "• Scopes (Singleton, Prototype)",
        "• Bean Lifecycle Callbacks"
      ],
      code: `// Basic Spring Bean
@Component
public class UserService {
    private final UserRepository userRepository;

    // Constructor Injection
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Bean Lifecycle Methods
    @PostConstruct
    public void init() {
        System.out.println("Bean initialized");
    }

    @PreDestroy
    public void cleanup() {
        System.out.println("Bean being destroyed");
    }
}

// AOP Example
@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Before " + joinPoint.getSignature().getName());
    }
}`,
      language: 'java'
    },
    {
      id: 26,
      topic: 'Spring Boot Fundamentals',
      description: 'Core concepts and features of Spring Boot',
      content: [
        "Spring Boot Features:",
        "• Auto-configuration",
        "• Standalone Applications",
        "• Embedded Servers",
        "• Starter Dependencies",
        "",
        "Key Annotations:",
        "• @SpringBootApplication",
        "• @Component, @Service, @Repository",
        "• @RestController, @Controller",
        "• @Configuration",
        "• @Value, @ConfigurationProperties"
      ],
      code: `@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }
}

@ConfigurationProperties(prefix = "app")
@Configuration
public class AppProperties {
    private String apiKey;
    private int maxConnections;
    private List<String> allowedOrigins;

    // Getters and setters
}`,
      language: 'java'
    },
    {
      id: 27,
      topic: 'Spring Boot Configuration',
      description: 'Understanding configuration options and profiles',
      content: [
        "Configuration Types:",
        "• application.properties/yml",
        "• Environment Variables",
        "• Command Line Arguments",
        "• Profile-based Configuration",
        "",
        "Key Concepts:",
        "• External Configuration",
        "• Profile Management",
        "• Configuration Properties",
        "• Relaxed Binding",
        "• Property Sources"
      ],
      code: `# application.yml
spring:
  profiles:
    active: dev
  
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

# Custom properties
app:
  security:
    jwt-secret: \${JWT_SECRET}
    token-expiration: 86400000
  
  feature-flags:
    new-ui: true
    beta-features: false

---
# Development profile
spring:
  config:
    activate:
      on-profile: dev
  
  h2:
    console:
      enabled: true
  
  datasource:
    url: jdbc:h2:mem:testdb

---
# Production profile
spring:
  config:
    activate:
      on-profile: prod
  
  jpa:
    show-sql: false`,
      language: 'yaml'
    },
    {
      id: 28,
      topic: 'Building RESTful APIs',
      description: 'Creating REST endpoints and handling HTTP requests',
      content: [
        "REST Concepts:",
        "• HTTP Methods (GET, POST, PUT, DELETE)",
        "• Request Mapping",
        "• Path Variables",
        "• Request Parameters",
        "• Request/Response Bodies",
        "",
        "Implementation:",
        "• @RestController",
        "• @RequestMapping",
        "• @PathVariable, @RequestParam",
        "• @RequestBody",
        "• ResponseEntity"
      ],
      code: `@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(userService.getUsers(name, page, size));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) {
        User user = userService.createUser(userDTO);
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(user.getId())
            .toUri();
        return ResponseEntity.created(location).body(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}`,
      language: 'java'
    },
    {
      id: 29,
      topic: 'Database Integration with Spring Data JPA',
      description: 'Working with databases using JPA and Hibernate',
      content: [
        "JPA Concepts:",
        "• Entity Mapping",
        "• Relationships (One-to-One, One-to-Many, Many-to-Many)",
        "• JpaRepository",
        "• JPQL and Native Queries",
        "",
        "Features:",
        "• Automatic Query Methods",
        "• Custom Queries",
        "• Pagination and Sorting",
        "• Transaction Management",
        "• Auditing"
      ],
      code: `@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Email
    @Column(unique = true)
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.name LIKE %:name%")
    List<User> searchByName(@Param("name") String name);
    
    @Query(value = """
        SELECT u.* FROM users u
        JOIN user_roles ur ON u.id = ur.user_id
        JOIN roles r ON ur.role_id = r.id
        WHERE r.name = :roleName
        """, nativeQuery = true)
    List<User> findByRole(@Param("roleName") String roleName);
}`,
      language: 'java'
    },
    {
      id: 30,
      topic: 'Spring Security Implementation',
      description: 'Implementing authentication and authorization',
      content: [
        "Security Concepts:",
        "• Authentication",
        "• Authorization",
        "• JWT Implementation",
        "• Method Security",
        "",
        "Features:",
        "• User Details Service",
        "• Password Encoding",
        "• Role-based Access Control",
        "• Security Filters",
        "• CORS Configuration"
      ],
      code: `@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, 
                UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Service
    public class JwtService {
        @Value("\${app.security.jwt-secret}")
        private String secretKey;

        public String generateToken(UserDetails userDetails) {
            return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
        }
    }
}`,
      language: 'java'
    },
    {
      id: 31,
      topic: 'Testing in Spring Boot',
      description: 'Unit and integration testing strategies',
      content: [
        "Testing Types:",
        "• Unit Testing",
        "• Integration Testing",
        "• Mock MVC Testing",
        "• Service Testing",
        "",
        "Tools & Frameworks:",
        "• JUnit 5",
        "• Mockito",
        "• @SpringBootTest",
        "• TestRestTemplate",
        "• AssertJ"
      ],
      code: `@SpringBootTest
class UserServiceIntegrationTest {
    @Autowired
    private UserService userService;
    
    @MockBean
    private UserRepository userRepository;
    
    @Test
    void whenCreateUser_thenUserIsSaved() {
        // Arrange
        UserDTO userDTO = new UserDTO("John", "john@example.com");
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        
        when(userRepository.save(any(User.class))).thenReturn(user);
        
        // Act
        User savedUser = userService.createUser(userDTO);
        
        // Assert
        assertThat(savedUser.getName()).isEqualTo(userDTO.getName());
        verify(userRepository).save(any(User.class));
    }
}

@WebMvcTest(UserController.class)
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserService userService;
    
    @Test
    void whenGetUser_thenReturnUser() throws Exception {
        User user = new User();
        user.setId(1L);
        user.setName("John");
        
        when(userService.getUser(1L)).thenReturn(Optional.of(user));
        
        mockMvc.perform(get("/api/v1/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("John"));
    }
}`,
      language: 'java'
    },
    {
      id: 32,
      topic: 'Building and Deployment',
      description: 'Building, packaging, and deploying Spring Boot applications',
      content: [
        "Build Tools:",
        "• Maven Configuration",
        "• Gradle Setup",
        "• Dependencies Management",
        "• Resource Filtering",
        "",
        "Deployment:",
        "• JAR Packaging",
        "• Docker Containerization",
        "• Environment Configuration",
        "• CI/CD Pipeline Setup",
        "• Cloud Deployment"
      ],
      code: `# Maven configuration
<project>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.1.0</version>
    </parent>
    
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>

# Dockerfile
FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=target/*.jar
COPY \${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

# Docker Compose
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/mydb
    depends_on:
      - db
  
  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password`,
      language: 'yaml'
    },
    {
      id: 33,
      topic: 'Additional Tools and Features',
      description: 'Essential tools and features for Spring Boot development',
      content: [
        "Development Tools:",
        "• Spring Boot DevTools",
        "• Lombok",
        "• Actuator",
        "• Swagger/OpenAPI",
        "",
        "Advanced Features:",
        "• Custom Actuator Endpoints",
        "• API Documentation",
        "• Monitoring and Metrics",
        "• Caching",
        "• Async Processing"
      ],
      code: `// Swagger/OpenAPI Configuration
@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Application API")
                .version("1.0")
                .description("API Documentation"));
    }
}

// Actuator Custom Endpoint
@Component
@Endpoint(id = "features")
public class FeaturesEndpoint {
    private Map<String, Boolean> features = new HashMap<>();
    
    @ReadOperation
    public Map<String, Boolean> features() {
        return features;
    }
    
    @WriteOperation
    public void configureFeature(@Selector String name, boolean enabled) {
        features.put(name, enabled);
    }
}

// Async Service Method
@Service
public class AsyncService {
    @Async
    public CompletableFuture<User> fetchUserAsync(Long id) {
        return CompletableFuture.supplyAsync(() -> {
            // Simulate long running task
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        });
    }
}`,
      language: 'java'
    },
    {
      id: 34,
      topic: 'Introduction to Spring Cloud',
      description: 'Overview of Spring Cloud and microservices',
      content: [
        "Spring Cloud Components:",
        "• Service Discovery (Eureka)",
        "• API Gateway",
        "• Config Server",
        "• Circuit Breaker",
        "",
        "Microservices Concepts:",
        "• Service Communication",
        "• Load Balancing",
        "• Distributed Configuration",
        "• Resilience Patterns",
        "• Monitoring"
      ],
      code: `@SpringBootApplication
@EnableDiscoveryClient
public class ServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceApplication.class, args);
    }
}

// API Gateway Configuration
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
          filters:
            - name: CircuitBreaker
              args:
                name: userService
                fallbackUri: forward:/fallback
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**

// Circuit Breaker
@CircuitBreaker(name = "userService", fallbackMethod = "getUserFallback")
public User getUser(Long id) {
        return restTemplate.getForObject(
        "http://user-service/api/users/" + id,
        User.class
        );
    }
    
public User getUserFallback(Long id, Exception ex) {
    return new User(); // Return default user
}`,
      language: 'java'
    }
  ]
}; 