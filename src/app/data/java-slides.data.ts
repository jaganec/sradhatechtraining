import { CourseSlides } from "../models/slide.model"

export const javaSlides: CourseSlides = {
  category: 'java',
  slides: [
    {
      id: 1,
      topic: 'Introduction to Java',
      description: 'Understanding Java fundamentals and setup',
      content: [`# Java Development Fundamentals

## What is Java?
* Object-oriented programming language
* Platform independent ("Write Once, Run Anywhere")
* Strongly typed and compiled
* Rich ecosystem and libraries
* Enterprise-grade applications

## Development Setup
* Installing JDK
* Setting up IDE (IntelliJ/Eclipse)
* Understanding classpath
* Basic project structure`],
      code: `// First Java Program
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java Developer!");
    }
}

// Project Structure
src/
  ├── main/
  │   ├── java/          # Source code
  │   │   └── com/bank/
  │   └── resources/     # Configuration files
  └── test/
      └── java/          # Test code

// pom.xml (Maven configuration)
<project>
    <groupId>com.bank</groupId>
    <artifactId>account-management</artifactId>
    <version>1.0.0</version>
    
    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.8.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>`,
      language: 'java'
    },
    {
      id: 2,
      topic: 'Java Basics - Types and Control Flow',
      description: 'Core Java concepts and programming constructs',
      content: [`# Java Basics

## Key Concepts
* Data Types
* Variables and Constants
* Operators
* Control Flow
* Arrays and Loops`],
      code: `// Data Types and Variables
public class JavaBasics {
    public static void main(String[] args) {
        // Primitive types
        int accountNumber = 12345;
        double balance = 1000.50;
        boolean isActive = true;
        char accountType = 'S';  // Savings

        // Reference types
        String customerName = "John Doe";
        Integer wrappedNumber = Integer.valueOf(accountNumber);
        
        // Constants
        final double INTEREST_RATE = 0.05;
        
        // Arrays
        int[] transactionAmounts = new int[10];
        String[] accountTypes = {"Savings", "Checking", "Investment"};
        
        // Control Flow
        if (balance > 1000) {
            System.out.println("Premium Account");
        } else {
            System.out.println("Standard Account");
        }
        
        // Switch Statement
        switch (accountType) {
            case 'S':
                System.out.println("Savings Account");
                break;
            case 'C':
                System.out.println("Checking Account");
                break;
            default:
                System.out.println("Unknown Account Type");
        }
        
        // Loops
        for (String type : accountTypes) {
            System.out.println("Account Type: " + type);
        }
        
        int i = 0;
        while (i < transactionAmounts.length) {
            transactionAmounts[i] = i * 100;
            i++;
        }
        
        // Enhanced for loop with conditional
        for (int amount : transactionAmounts) {
            if (amount > 500) {
                System.out.println("Large transaction: " + amount);
                continue;
            }
            System.out.println("Regular transaction: " + amount);
        }
    }
}`,
      language: 'java'
    },
    {
      id: 3,
      topic: 'Object-Oriented Programming',
      description: 'Classes, Objects, and OOP principles',
      content: [`# Object-Oriented Programming

## Key Concepts
* Classes and Objects
* Inheritance
* Polymorphism
* Encapsulation
* Abstraction
* Interfaces`],
      code: `// Bank Account Management System - Core Classes

// Abstract base class
public abstract class Account {
    protected String accountNumber;
    protected double balance;
    protected Customer owner;
    
    public Account(String accountNumber, Customer owner) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.balance = 0.0;
    }
    
    // Abstract method - different implementation for different account types
    public abstract double calculateInterest();
    
    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Invalid deposit amount");
        }
        this.balance += amount;
    }
    
    public void withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Invalid withdrawal amount");
        }
        if (amount > balance) {
            throw new InsufficientFundsException("Insufficient funds");
        }
        this.balance -= amount;
    }
}

// Concrete implementation
public class SavingsAccount extends Account {
    private double interestRate;
    
    public SavingsAccount(String accountNumber, Customer owner, double interestRate) {
        super(accountNumber, owner);
        this.interestRate = interestRate;
    }
    
    @Override
    public double calculateInterest() {
        return balance * interestRate;
    }
}

// Interface definition
public interface TransactionLogger {
    void logTransaction(String accountNumber, String type, double amount);
    List<Transaction> getTransactionHistory(String accountNumber);
}

// Implementation class
public class DatabaseTransactionLogger implements TransactionLogger {
    @Override
    public void logTransaction(String accountNumber, String type, double amount) {
        // Implementation to log to database
        String sql = "INSERT INTO transactions (account_number, type, amount) VALUES (?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, accountNumber);
            pstmt.setString(2, type);
            pstmt.setDouble(3, amount);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            throw new DatabaseException("Failed to log transaction", e);
        }
    }
    
    @Override
    public List<Transaction> getTransactionHistory(String accountNumber) {
        List<Transaction> transactions = new ArrayList<>();
        String sql = "SELECT * FROM transactions WHERE account_number = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, accountNumber);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                transactions.add(new Transaction(
                    rs.getString("type"),
                    rs.getDouble("amount"),
                    rs.getTimestamp("transaction_date")
                ));
            }
        } catch (SQLException e) {
            throw new DatabaseException("Failed to retrieve transactions", e);
        }
        return transactions;
    }
}`,
      language: 'java'
    },
    {
      id: 4,
      topic: 'Collections Framework',
      description: 'Working with Java Collections',
      content: [`# Java Collections Framework

## Key Concepts
* List, Set, Map interfaces
* ArrayList and LinkedList
* HashSet and TreeSet
* HashMap and TreeMap
* Collections utility class
* Generics with collections`],
      code: `// Bank Account Management System - Collections Usage

// Using Lists for transaction history
public class TransactionHistory {
    private List<Transaction> transactions;
    
    public TransactionHistory() {
        this.transactions = new ArrayList<>();
    }
    
    public void addTransaction(Transaction transaction) {
        transactions.add(transaction);
    }
    
    public List<Transaction> getRecentTransactions(int limit) {
        return transactions.stream()
            .sorted((t1, t2) -> t2.getDate().compareTo(t1.getDate()))
            .limit(limit)
            .collect(Collectors.toList());
    }
}

// Using Maps for account management
public class BankAccountManager {
    private Map<String, Account> accounts;
    
    public BankAccountManager() {
        this.accounts = new HashMap<>();
    }
    
    public void addAccount(Account account) {
        accounts.put(account.getAccountNumber(), account);
    }
    
    public Account getAccount(String accountNumber) {
        return accounts.get(accountNumber);
    }
    
    // Get accounts by type using streams
    public List<Account> getAccountsByType(Class<? extends Account> type) {
        return accounts.values().stream()
            .filter(type::isInstance)
            .collect(Collectors.toList());
    }
    
    // Get high-value accounts
    public Set<Account> getHighValueAccounts(double minimumBalance) {
        return accounts.values().stream()
            .filter(account -> account.getBalance() >= minimumBalance)
            .collect(Collectors.toSet());
    }
}

// Using Set for unique customer tracking
public class CustomerRegistry {
    private Set<Customer> customers;
    
    public CustomerRegistry() {
        // TreeSet with custom comparator for sorting
        this.customers = new TreeSet<>((c1, c2) -> 
            c1.getLastName().compareTo(c2.getLastName()));
    }
    
    public void registerCustomer(Customer customer) {
        customers.add(customer);
    }
    
    public List<Customer> searchCustomers(String lastName) {
        return customers.stream()
            .filter(c -> c.getLastName().startsWith(lastName))
            .collect(Collectors.toList());
    }
}`,
      language: 'java'
    },
    {
      id: 5,
      topic: 'Exception Handling',
      description: 'Error handling and custom exceptions',
      content: [`# Exception Handling

## Key Concepts
* Try-catch blocks
* Custom exceptions
* Exception hierarchy
* Resource management
* Best practices`],
      code: `// Custom Exceptions
public class InsufficientFundsException extends RuntimeException {
    private final double requestedAmount;
    private final double availableBalance;
    
    public InsufficientFundsException(double requested, double available) {
        super(String.format("Insufficient funds: requested %.2f, available %.2f",
            requested, available));
        this.requestedAmount = requested;
        this.availableBalance = available;
    }
    
    public double getRequestedAmount() { return requestedAmount; }
    public double getAvailableBalance() { return availableBalance; }
}

public class AccountNotFoundException extends RuntimeException {
    public AccountNotFoundException(String accountNumber) {
        super("Account not found: " + accountNumber);
    }
}

// Exception handling in service layer
public class TransactionService {
    private final AccountRepository accountRepo;
    private final TransactionLogger logger;
    
    public void transfer(String fromAccount, String toAccount, double amount) {
        Account source = null;
        Account target = null;
        
        try {
            // Load accounts
            source = accountRepo.findById(fromAccount)
                .orElseThrow(() -> new AccountNotFoundException(fromAccount));
            target = accountRepo.findById(toAccount)
                .orElseThrow(() -> new AccountNotFoundException(toAccount));
            
            // Perform transfer
            synchronized (source) {
                synchronized (target) {
                    if (source.getBalance() < amount) {
                        throw new InsufficientFundsException(
                            amount, source.getBalance());
                    }
                    source.withdraw(amount);
                    target.deposit(amount);
                }
            }
            
            // Log transaction
            logger.logTransfer(fromAccount, toAccount, amount);
            
        } catch (AccountNotFoundException | InsufficientFundsException e) {
            // Business exceptions - propagate up
            throw e;
        } catch (Exception e) {
            // Unexpected errors - wrap in custom exception
            throw new TransactionFailedException(
                "Transfer failed: " + e.getMessage(), e);
        }
    }
}

// Resource management with try-with-resources
public class DatabaseBackup {
    public void backupTransactions(String filename) {
        String sql = "SELECT * FROM transactions";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery();
             BufferedWriter writer = new BufferedWriter(
                 new FileWriter(filename))) {
            
            while (rs.next()) {
                String line = String.format("%s,%s,%.2f,%s",
                    rs.getString("account_number"),
                    rs.getString("type"),
                    rs.getDouble("amount"),
                    rs.getTimestamp("transaction_date"));
                writer.write(line);
                writer.newLine();
            }
            
        } catch (SQLException e) {
            throw new DatabaseException("Database backup failed", e);
        } catch (IOException e) {
            throw new FileOperationException("Failed to write backup file", e);
        }
    }
}`,
      language: 'java'
    },
    {
      id: 6,
      topic: 'JDBC and Database Integration',
      description: 'Working with databases using JDBC',
      content: [`# JDBC Database Integration

## Key Concepts
* Database connections
* CRUD operations
* Prepared statements
* Transaction management
* Connection pooling`],
      code: `// Database Configuration
public class DatabaseConfig {
    private static final String URL = "jdbc:mysql://localhost:3306/bankdb";
    private static final String USER = "admin";
    private static final String PASSWORD = "secret";
    
    private static ComboPooledDataSource dataSource;
    
    static {
        try {
            dataSource = new ComboPooledDataSource();
            dataSource.setDriverClass("com.mysql.cj.jdbc.Driver");
            dataSource.setJdbcUrl(URL);
            dataSource.setUser(USER);
            dataSource.setPassword(PASSWORD);
            
            // Connection pool settings
            dataSource.setMinPoolSize(5);
            dataSource.setMaxPoolSize(20);
            dataSource.setMaxIdleTime(300);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to initialize database", e);
        }
    }
    
    public static Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }
}

// Account Repository Implementation
public class JdbcAccountRepository implements AccountRepository {
    private static final String INSERT_ACCOUNT = 
        "INSERT INTO accounts (account_number, type, balance, owner_id) " +
        "VALUES (?, ?, ?, ?)";
    
    private static final String UPDATE_BALANCE = 
        "UPDATE accounts SET balance = ? WHERE account_number = ?";
    
    private static final String SELECT_BY_ID = 
        "SELECT * FROM accounts WHERE account_number = ?";
    
    @Override
    public void save(Account account) {
        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(INSERT_ACCOUNT)) {
            
            pstmt.setString(1, account.getAccountNumber());
            pstmt.setString(2, account.getClass().getSimpleName());
            pstmt.setDouble(3, account.getBalance());
            pstmt.setLong(4, account.getOwner().getId());
            
            pstmt.executeUpdate();
            
        } catch (SQLException e) {
            throw new DatabaseException("Failed to save account", e);
        }
    }
    
    @Override
    public void updateBalance(String accountNumber, double newBalance) {
        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(UPDATE_BALANCE)) {
            
            pstmt.setDouble(1, newBalance);
            pstmt.setString(2, accountNumber);
            
            int updated = pstmt.executeUpdate();
            if (updated == 0) {
                throw new AccountNotFoundException(accountNumber);
            }
            
        } catch (SQLException e) {
            throw new DatabaseException("Failed to update balance", e);
        }
    }
    
    @Override
    public Optional<Account> findById(String accountNumber) {
        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(SELECT_BY_ID)) {
            
            pstmt.setString(1, accountNumber);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToAccount(rs));
                }
                return Optional.empty();
            }
            
        } catch (SQLException e) {
            throw new DatabaseException("Failed to find account", e);
        }
    }
    
    private Account mapResultSetToAccount(ResultSet rs) throws SQLException {
        String type = rs.getString("type");
        String accountNumber = rs.getString("account_number");
        double balance = rs.getDouble("balance");
        long ownerId = rs.getLong("owner_id");
        
        Customer owner = customerRepository.findById(ownerId)
            .orElseThrow(() -> new RuntimeException("Owner not found"));
        
        Account account = switch (type) {
            case "SavingsAccount" -> new SavingsAccount(accountNumber, owner);
            case "CheckingAccount" -> new CheckingAccount(accountNumber, owner);
            default -> throw new IllegalStateException("Unknown account type: " + type);
        };
        
        account.setBalance(balance);
        return account;
    }
}`,
      language: 'java'
    },
    {
      id: 7,
      topic: 'Multi-threading and Concurrency',
      description: 'Concurrent programming in Java',
      content: [`# Multi-threading & Concurrency

## Key Concepts
* Thread creation and lifecycle
* Synchronization
* Thread pools
* Locks and atomic operations
* Concurrent collections`],
      code: `// Thread-safe transaction processing
public class TransactionProcessor {
    private final ExecutorService executorService;
    private final BlockingQueue<Transaction> transactionQueue;
    private final AtomicInteger processedCount;
    
    public TransactionProcessor(int threadPoolSize) {
        this.executorService = Executors.newFixedThreadPool(threadPoolSize);
        this.transactionQueue = new LinkedBlockingQueue<>();
        this.processedCount = new AtomicInteger(0);
    }
    
    public void submitTransaction(Transaction transaction) {
        transactionQueue.offer(transaction);
    }
    
    public void startProcessing() {
        int processorCount = Runtime.getRuntime().availableProcessors();
        
        for (int i = 0; i < processorCount; i++) {
            executorService.submit(this::processTransactions);
        }
    }
    
    private void processTransactions() {
        while (!Thread.currentThread().isInterrupted()) {
            try {
                Transaction transaction = transactionQueue.take();
                processTransaction(transaction);
                processedCount.incrementAndGet();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
    }
    
    private void processTransaction(Transaction transaction) {
        // Using ReentrantLock for fine-grained locking
        ReentrantLock sourceLock = getLockForAccount(transaction.getSourceAccount());
        ReentrantLock targetLock = getLockForAccount(transaction.getTargetAccount());
        
        try {
            // Acquire locks in ordered manner to prevent deadlocks
            if (sourceLock.tryLock(1, TimeUnit.SECONDS)) {
                try {
                    if (targetLock.tryLock(1, TimeUnit.SECONDS)) {
                        try {
                            // Perform the transfer
                            Account source = accountRepository.findById(
                                transaction.getSourceAccount()).orElseThrow();
                            Account target = accountRepository.findById(
                                transaction.getTargetAccount()).orElseThrow();
                            
                            source.withdraw(transaction.getAmount());
                            target.deposit(transaction.getAmount());
                            
                            // Log successful transaction
                            transactionLogger.logSuccess(transaction);
                        } finally {
                            targetLock.unlock();
                        }
                    } else {
                        // Handle lock acquisition timeout
                        transactionLogger.logTimeout(transaction);
                    }
                } finally {
                    sourceLock.unlock();
                }
            } else {
                // Handle lock acquisition timeout
                transactionLogger.logTimeout(transaction);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            transactionLogger.logError(transaction, e);
        }
    }
}

// Concurrent account balance monitoring
public class AccountMonitor {
    private final ConcurrentHashMap<String, DoubleAdder> balanceChanges;
    private final ScheduledExecutorService scheduler;
    
    public AccountMonitor() {
        this.balanceChanges = new ConcurrentHashMap<>();
        this.scheduler = Executors.newScheduledThreadPool(1);
        
        // Schedule periodic balance reporting
        scheduler.scheduleAtFixedRate(
            this::reportBalanceChanges,
            0, 1, TimeUnit.MINUTES
        );
    }
    
    public void recordBalanceChange(String accountId, double change) {
        balanceChanges.computeIfAbsent(accountId, k -> new DoubleAdder())
            .add(change);
    }
    
    private void reportBalanceChanges() {
        balanceChanges.forEach((accountId, adder) -> {
            double totalChange = adder.sum();
            if (Math.abs(totalChange) > 1000) {
                System.out.printf("High activity on account %s: %.2f%n",
                    accountId, totalChange);
            }
        });
    }
}`,
      language: 'java'
    },
    {
      id: 8,
      topic: 'Functional Programming and Streams',
      description: 'Modern Java functional features',
      content: [`# Functional Programming

## Key Concepts
* Lambda expressions
* Stream API
* Optional class
* Method references
* Functional interfaces`],
      code: `// Transaction analysis using streams
public class TransactionAnalyzer {
    public record TransactionSummary(
        double totalAmount,
        double averageAmount,
        Transaction largest,
        long count
    ) {}
    
    public TransactionSummary analyzeTransactions(List<Transaction> transactions) {
        return transactions.stream()
            .collect(Collectors.teeing(
                Collectors.summarizingDouble(Transaction::getAmount),
                Collectors.maxBy(Comparator.comparing(Transaction::getAmount)),
                (stats, maxTransaction) -> new TransactionSummary(
                    stats.getSum(),
                    stats.getAverage(),
                    maxTransaction.orElse(null),
                    stats.getCount()
                )
            ));
    }
    
    public Map<String, List<Transaction>> categorizeTransactions(
            List<Transaction> transactions) {
        return transactions.stream()
            .collect(Collectors.groupingBy(
                transaction -> {
                    double amount = transaction.getAmount();
                    return amount < 100 ? "SMALL" :
                           amount < 1000 ? "MEDIUM" : "LARGE";
                },
                Collectors.toList()
            ));
    }
    
    public List<Account> findHighValueAccounts(List<Account> accounts) {
        return accounts.stream()
            .filter(account -> account.getBalance() > 10000)
            .sorted(Comparator.comparing(Account::getBalance).reversed())
            .limit(10)
            .collect(Collectors.toList());
    }
    
    public Optional<Transaction> findLargestTransaction(
            String accountId,
            LocalDate startDate,
            LocalDate endDate) {
        return transactionRepository.findByAccountId(accountId).stream()
            .filter(t -> {
                LocalDate transactionDate = t.getDate().toLocalDate();
                return !transactionDate.isBefore(startDate) &&
                       !transactionDate.isAfter(endDate);
            })
            .max(Comparator.comparing(Transaction::getAmount));
    }
}

// Functional account processing
public class AccountProcessor {
    private final Map<String, Consumer<Account>> accountProcessors = Map.of(
        "AUDIT", this::auditAccount,
        "INTEREST", this::calculateInterest,
        "REPORT", this::generateReport
    );
    
    public void processAccounts(List<Account> accounts, String operation) {
        Consumer<Account> processor = accountProcessors.get(operation);
        if (processor == null) {
            throw new IllegalArgumentException("Unknown operation: " + operation);
        }
        
        accounts.parallelStream()
            .forEach(processor);
    }
    
    public Map<Customer, Double> calculateTotalBalances(List<Account> accounts) {
        return accounts.stream()
            .collect(Collectors.groupingBy(
                Account::getOwner,
                Collectors.mapping(
                    Account::getBalance,
                    Collectors.reducing(0.0, Double::sum)
                )
            ));
    }
}`,
      language: 'java'
    },
    {
      id: 9,
      topic: 'Design Patterns',
      description: 'Common design patterns in Java',
      content: [`# Design Patterns

## Key Patterns
* Singleton Pattern
* Factory Pattern
* Strategy Pattern
* Observer Pattern
* Builder Pattern
* Repository Pattern`],
      code: `// Singleton Pattern with Double-Checked Locking
public class TransactionManager {
    private static volatile TransactionManager instance;
    private final TransactionRepository repository;
    
    private TransactionManager() {
        this.repository = new TransactionRepository();
    }
    
    public static TransactionManager getInstance() {
        if (instance == null) {
            synchronized (TransactionManager.class) {
                if (instance == null) {
                    instance = new TransactionManager();
                }
            }
        }
        return instance;
    }
}

// Factory Pattern
public interface AccountFactory {
    Account createAccount(String accountNumber, Customer customer);
}

public class SavingsAccountFactory implements AccountFactory {
    @Override
    public Account createAccount(String accountNumber, Customer customer) {
        return new SavingsAccount(accountNumber, customer);
    }
}

public class CheckingAccountFactory implements AccountFactory {
    @Override
    public Account createAccount(String accountNumber, Customer customer) {
        return new CheckingAccount(accountNumber, customer);
    }
}

// Strategy Pattern
public interface InterestCalculationStrategy {
    double calculateInterest(double balance);
}

public class SavingsInterestStrategy implements InterestCalculationStrategy {
    private final double rate;
    
    public SavingsInterestStrategy(double rate) {
        this.rate = rate;
    }
    
    @Override
    public double calculateInterest(double balance) {
        return balance * rate;
    }
}

// Observer Pattern
public interface AccountObserver {
    void onBalanceChanged(String accountId, double newBalance);
}

public class Account {
    private List<AccountObserver> observers = new ArrayList<>();
    
    public void addObserver(AccountObserver observer) {
        observers.add(observer);
    }
    
    protected void notifyBalanceChanged() {
        for (AccountObserver observer : observers) {
            observer.onBalanceChanged(accountNumber, balance);
        }
    }
}

// Builder Pattern
public class TransactionBuilder {
    private String id;
    private String sourceAccount;
    private String targetAccount;
    private double amount;
    private LocalDateTime timestamp;
    private String description;
    
    public TransactionBuilder withId(String id) {
        this.id = id;
        return this;
    }
    
    public TransactionBuilder from(String sourceAccount) {
        this.sourceAccount = sourceAccount;
        return this;
    }
    
    public TransactionBuilder to(String targetAccount) {
        this.targetAccount = targetAccount;
        return this;
    }
    
    public TransactionBuilder amount(double amount) {
        this.amount = amount;
        return this;
    }
    
    public Transaction build() {
        return new Transaction(
            id, sourceAccount, targetAccount, 
            amount, timestamp, description
        );
    }
}`,
      language: 'java'
    },
    {
      id: 10,
      topic: 'Testing with JUnit and Mockito',
      description: 'Unit testing and mocking in Java',
      content: [`# Testing in Java

## Key Concepts
* Unit Testing with JUnit
* Mocking with Mockito
* Test Fixtures
* Test Coverage
* Integration Testing`],
      code: `// Account Service Test
@ExtendWith(MockitoExtension.class)
public class AccountServiceTest {
    @Mock
    private AccountRepository accountRepository;
    
    @Mock
    private TransactionLogger transactionLogger;
    
    @InjectMocks
    private AccountService accountService;
    
    @Test
    void transferFunds_WithSufficientBalance_ShouldSucceed() {
        // Arrange
        Account sourceAccount = new SavingsAccount("123", new Customer());
        sourceAccount.deposit(1000.0);
        
        Account targetAccount = new SavingsAccount("456", new Customer());
        
        when(accountRepository.findById("123"))
            .thenReturn(Optional.of(sourceAccount));
        when(accountRepository.findById("456"))
            .thenReturn(Optional.of(targetAccount));
        
        // Act
        accountService.transferFunds("123", "456", 500.0);
        
        // Assert
        assertEquals(500.0, sourceAccount.getBalance());
        assertEquals(500.0, targetAccount.getBalance());
        verify(transactionLogger).logTransfer(
            eq("123"), eq("456"), eq(500.0)
        );
    }
    
    @Test
    void transferFunds_WithInsufficientBalance_ShouldThrowException() {
        // Arrange
        Account sourceAccount = new SavingsAccount("123", new Customer());
        sourceAccount.deposit(100.0);
        
        when(accountRepository.findById("123"))
            .thenReturn(Optional.of(sourceAccount));
        
        // Act & Assert
        assertThrows(InsufficientFundsException.class, () -> 
            accountService.transferFunds("123", "456", 500.0)
        );
        
        verify(transactionLogger, never())
            .logTransfer(anyString(), anyString(), anyDouble());
    }
}

// Integration Test
@SpringBootTest
public class AccountIntegrationTest {
    @Autowired
    private AccountService accountService;
    
    @Autowired
    private AccountRepository accountRepository;
    
    @Test
    @Transactional
    void createAndTransferFunds_ShouldUpdateBalances() {
        // Arrange
        Customer customer = new Customer("John", "Doe");
        Account savings = accountService.createAccount(
            "SAVINGS", customer, 1000.0
        );
        Account checking = accountService.createAccount(
            "CHECKING", customer, 0.0
        );
        
        // Act
        accountService.transferFunds(
            savings.getAccountNumber(),
            checking.getAccountNumber(),
            500.0
        );
        
        // Assert
        Account updatedSavings = accountRepository
            .findById(savings.getAccountNumber())
            .orElseThrow();
        Account updatedChecking = accountRepository
            .findById(checking.getAccountNumber())
            .orElseThrow();
        
        assertEquals(500.0, updatedSavings.getBalance());
        assertEquals(500.0, updatedChecking.getBalance());
    }
}`,
      language: 'java'
    },
    {
      id: 11,
      topic: 'Spring Boot Integration',
      description: 'Building REST APIs with Spring Boot',
      content: [`# Spring Boot Integration

## Key Concepts
* REST Controllers
* Dependency Injection
* Security Configuration
* Exception Handling
* Data JPA Integration`],
      code: `// REST Controller
@RestController
@RequestMapping("/api/accounts")
@Tag(name = "Account Management", description = "APIs for managing bank accounts")
public class AccountController {
    private final AccountService accountService;
    
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }
    
    @PostMapping
    @Operation(summary = "Create new account")
    public ResponseEntity<AccountDTO> createAccount(
            @Valid @RequestBody CreateAccountRequest request) {
        Account account = accountService.createAccount(
            request.getType(),
            request.getCustomerId(),
            request.getInitialDeposit()
        );
        return ResponseEntity.ok(AccountDTO.from(account));
    }
    
    @PostMapping("/{accountId}/transfer")
    @Operation(summary = "Transfer funds between accounts")
    public ResponseEntity<TransferResponse> transfer(
            @PathVariable String accountId,
            @Valid @RequestBody TransferRequest request) {
        Transaction transaction = accountService.transferFunds(
            accountId,
            request.getTargetAccount(),
            request.getAmount()
        );
        return ResponseEntity.ok(TransferResponse.from(transaction));
    }
    
    @GetMapping("/{accountId}/balance")
    @Operation(summary = "Get account balance")
    public ResponseEntity<BalanceResponse> getBalance(
            @PathVariable String accountId) {
        Account account = accountService.getAccount(accountId);
        return ResponseEntity.ok(new BalanceResponse(
            account.getBalance(),
            account.getLastUpdated()
        ));
    }
}

// Security Configuration
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/accounts/**").authenticated()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt())
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .build();
    }
}

// JPA Repository
@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    List<Account> findByCustomerId(Long customerId);
    
    @Query("SELECT a FROM Account a WHERE a.balance > :minBalance")
    List<Account> findHighValueAccounts(@Param("minBalance") double minBalance);
    
    @Modifying
    @Query("UPDATE Account a SET a.balance = :newBalance WHERE a.id = :accountId")
    int updateBalance(@Param("accountId") String accountId, 
                     @Param("newBalance") double newBalance);
}`,
      language: 'java'
    },
    {
      id: 12,
      topic: 'Documentation and API Design',
      description: 'API documentation and design best practices',
      content: [`# API Documentation

## Key Areas
* OpenAPI/Swagger
* API Versioning
* Error Responses
* Rate Limiting
* API Security`],
      code: `// OpenAPI Configuration
@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI bankingAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Banking API")
                .version("1.0.0")
                .description("API for Banking System")
                .contact(new Contact()
                    .name("API Support")
                    .email("api@bank.com")))
            .components(new Components()
                .addSecuritySchemes("bearer-jwt", new SecurityScheme()
                    .type(SecurityScheme.Type.HTTP)
                    .scheme("bearer")
                    .bearerFormat("JWT")));
    }
}

// API Response Models
@Schema(description = "Account creation request")
public record CreateAccountRequest(
    @NotNull @Schema(description = "Type of account")
    AccountType type,
    
    @NotNull @Schema(description = "Customer ID")
    Long customerId,
    
    @Positive @Schema(description = "Initial deposit amount")
    double initialDeposit
) {}

// Global Exception Handler
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleAccountNotFound(
            AccountNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            "ACCOUNT_NOT_FOUND",
            ex.getMessage(),
            HttpStatus.NOT_FOUND.value()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(InsufficientFundsException.class)
    public ResponseEntity<ErrorResponse> handleInsufficientFunds(
            InsufficientFundsException ex) {
        ErrorResponse error = new ErrorResponse(
            "INSUFFICIENT_FUNDS",
            ex.getMessage(),
            HttpStatus.BAD_REQUEST.value()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}

// Rate Limiting Configuration
@Configuration
public class RateLimitConfig {
    @Bean
    public KeyResolver userKeyResolver() {
        return exchange -> Mono.just(
            exchange.getRequest()
                .getHeaders()
                .getFirst("X-API-KEY")
        );
    }
    
    @Bean
    public RateLimiter rateLimiter() {
        return RateLimiter.builder()
            .replenishRate(10)
            .burstCapacity(20)
            .build();
    }
}`,
      language: 'java'
    },
    {
      id: 13,
      topic: 'Production Deployment',
      description: 'Deploying Java applications to production',
      content: [`# Production Deployment

## Key Areas
* Application Packaging
* Environment Configuration
* Monitoring & Logging
* Performance Tuning
* Container Deployment`],
      code: `// Application Properties
spring:
  datasource:
    url: jdbc:postgresql://\${DB_HOST}:5432/bankdb
    username: \${DB_USER}
    password: \${DB_PASSWORD}
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
  
  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        jdbc:
          batch_size: 50
  
  cache:
    type: redis
    redis:
      host: \${REDIS_HOST}
      port: 6379

logging:
  level:
    root: INFO
    com.bank: DEBUG
  pattern:
    console: "%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"

management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus
  metrics:
    tags:
      application: banking-service

# Dockerfile
FROM eclipse-temurin:17-jdk-alpine as builder
WORKDIR /app
COPY . .
RUN ./gradlew build -x test

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# Docker Compose
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DB_HOST=db
      - DB_USER=admin
      - DB_PASSWORD=secret
      - REDIS_HOST=cache
    depends_on:
      - db
      - cache
  
  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=bankdb
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=secret
    volumes:
      - pgdata:/var/lib/postgresql/data
  
  cache:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:`,
      language: 'yaml'
    }
  ]
}; 