import { CourseSlides } from "../models/slide.model"

export const typescriptSlides: CourseSlides = {
  category: 'typescript',
  slides: [
    {
      id: 1,
      topic: 'Introduction to TypeScript',
      description: 'Understanding TypeScript fundamentals and project setup',
      content: [`# Introduction to TypeScript

## What is TypeScript?
* Superset of JavaScript
* Adds static typing to JavaScript
* Compiles to plain JavaScript
* Better tooling and IDE support
* Catch errors early in development

## Project Setup
* Installing TypeScript
* Configuring project
* Understanding compilation
* Basic tooling`],
      code: `# Initialize project
npm init -y

# Install TypeScript and development tools
npm install typescript --save-dev
npm install vite @vitejs/plugin-react --save-dev

# Initialize TypeScript configuration
npx tsc --init

# Create project structure
src/
  ├── models/      # Type definitions
  ├── services/    # Business logic
  ├── utils/       # Helper functions
  └── main.ts      # Entry point`,
      language: 'bash'
    },
    {
      id: 2,
      topic: 'Basic TypeScript Configuration',
      description: 'Setting up TypeScript compiler options',
      content: [`# TypeScript Configuration

## Key Compiler Options
* Target ECMAScript version
* Module system
* Strict type checking
* Output directory
* Source maps`],
      code: `// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}

// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    sourcemap: true
  }
});`,
      language: 'json'
    },
    {
      id: 3,
      topic: 'Basic Types in TypeScript',
      description: 'Understanding fundamental TypeScript types',
      content: [`# TypeScript Types

## Basic Types
* string, number, boolean
* array, tuple
* enum, any, void
* null and undefined
* Type inference
* Union types`],
      code: `// Basic type annotations
let title: string = "Todo App";
let count: number = 0;
let isComplete: boolean = false;

// Arrays and tuples
let todos: string[] = ["Learn TypeScript", "Build Todo App"];
let statusTuple: [string, boolean] = ["In Progress", false];

// Enum for todo priority
enum Priority {
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH"
}

// Union types
type Status = "pending" | "completed" | "archived";
let todoStatus: Status = "pending";

// Type inference
let inferred = "TypeScript"; // Type: string
let numbers = [1, 2, 3];     // Type: number[]

// Function with type annotations
function addTodo(title: string, priority: Priority = Priority.Medium): void {
  console.log(\`Adding todo: \${title} with priority: \${priority}\`);
}

// Using the types
addTodo("Learn TypeScript", Priority.High);
todoStatus = "completed"; // Valid
todoStatus = "invalid";   // Error: Type '"invalid"' is not assignable to type 'Status'`,
      language: 'typescript'
    },
    {
      id: 4,
      topic: 'Interfaces and Type Definitions',
      description: 'Creating interfaces for Todo app',
      content: [`# Interfaces in TypeScript

## Key Concepts
* Interface declaration
* Optional properties
* Readonly properties
* Extending interfaces
* Type aliases vs interfaces`],
      code: `// Todo interface definition
interface Todo {
  id: number;
  title: string;
  description?: string;  // Optional property
  completed: boolean;
  priority: Priority;
  readonly createdAt: Date;  // Readonly property
}

// Extended interface
interface TodoWithTags extends Todo {
  tags: string[];
}

// Type alias for todo filters
type TodoFilter = {
  status?: Status;
  priority?: Priority;
  search?: string;
}

// Implementation
class TodoList {
  private todos: Todo[] = [];

  addTodo(todo: Omit<Todo, 'id' | 'createdAt'>): Todo {
    const newTodo: Todo = {
      ...todo,
      id: Date.now(),
      createdAt: new Date()
    };
    
    this.todos.push(newTodo);
    return newTodo;
  }

  getTodos(filter?: TodoFilter): Todo[] {
    let filtered = [...this.todos];
    
    if (filter?.status) {
      filtered = filtered.filter(todo => 
        todo.completed === (filter.status === 'completed')
      );
    }
    
    if (filter?.priority) {
      filtered = filtered.filter(todo => 
        todo.priority === filter.priority
      );
    }
    
    return filtered;
  }
}

// Usage
const todoList = new TodoList();

const todo = todoList.addTodo({
  title: "Learn TypeScript",
  description: "Study interfaces and types",
  completed: false,
  priority: Priority.High
});

const highPriorityTodos = todoList.getTodos({
  priority: Priority.High
});`,
      language: 'typescript'
    },
    {
      id: 5,
      topic: 'Classes and OOP in TypeScript',
      description: 'Object-Oriented Programming with TypeScript',
      content: [`# Classes in TypeScript

## Key Concepts
* Class declaration
* Access modifiers
* Constructor and properties
* Methods and inheritance
* Abstract classes
* Implementing interfaces`],
      code: `// TodoManager class implementation
abstract class BaseManager<T> {
  protected items: T[] = [];

  abstract add(item: T): void;
  abstract remove(id: number): boolean;
  
  getAll(): T[] {
    return [...this.items];
  }
}

class TodoManager extends BaseManager<Todo> {
  private static instance: TodoManager;
  
  private constructor() {
    super();
    // Load from localStorage
    this.loadTodos();
  }

  static getInstance(): TodoManager {
    if (!TodoManager.instance) {
      TodoManager.instance = new TodoManager();
    }
    return TodoManager.instance;
  }

  add(todo: Omit<Todo, 'id' | 'createdAt'>): void {
    const newTodo: Todo = {
      ...todo,
      id: Date.now(),
      createdAt: new Date()
    };
    
    this.items.push(newTodo);
    this.saveTodos();
  }

  remove(id: number): boolean {
    const initialLength = this.items.length;
    this.items = this.items.filter(todo => todo.id !== id);
    const removed = initialLength > this.items.length;
    
    if (removed) {
      this.saveTodos();
    }
    return removed;
  }

  update(id: number, updates: Partial<Todo>): boolean {
    const todo = this.items.find(t => t.id === id);
    if (!todo) return false;

    Object.assign(todo, updates);
    this.saveTodos();
    return true;
  }

  private loadTodos(): void {
    const stored = localStorage.getItem('todos');
    if (stored) {
      this.items = JSON.parse(stored);
    }
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.items));
  }
}

// Usage
const manager = TodoManager.getInstance();

manager.add({
  title: "Learn OOP in TypeScript",
  description: "Study classes and inheritance",
  completed: false,
  priority: Priority.High
});`,
      language: 'typescript'
    },
    {
      id: 6,
      topic: 'Modules and Project Structure',
      description: 'Organizing TypeScript code with modules',
      content: [`# TypeScript Modules

## Key Concepts
* ES Modules syntax
* Module organization
* Barrel exports
* Module resolution
* Circular dependencies`],
      code: `// src/models/todo.ts
export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
}

export enum Priority {
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH"
}

export type TodoFilter = {
  status?: "pending" | "completed" | "archived";
  priority?: Priority;
  search?: string;
}

// src/services/todo-service.ts
import { Todo, TodoFilter, Priority } from '../models/todo';

export class TodoService {
  private static instance: TodoService;
  private todos: Todo[] = [];

  static getInstance(): TodoService {
    if (!TodoService.instance) {
      TodoService.instance = new TodoService();
    }
    return TodoService.instance;
  }

  // ... implementation
}

// src/utils/storage.ts
export class StorageUtil {
  static save<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static load<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}

// src/index.ts
import { TodoService } from './services/todo-service';
import { Priority } from './models/todo';

const todoService = TodoService.getInstance();

// Add a new todo
todoService.add({
  title: "Learn TypeScript Modules",
  priority: Priority.High,
  completed: false
});`,
      language: 'typescript'
    },
    {
      id: 7,
      topic: 'DOM Integration',
      description: 'Working with the DOM in TypeScript',
      content: [`# TypeScript and DOM

## Key Concepts
* Type definitions for DOM
* Event handling
* Generic types with DOM
* Form handling
* Custom events`],
      code: `// src/ui/todo-ui.ts
class TodoUI {
  private todoList: HTMLUListElement;
  private todoInput: HTMLInputElement;
  private todoService: TodoService;

  constructor() {
    this.todoService = TodoService.getInstance();
    this.initializeElements();
    this.bindEvents();
    this.render();
  }

  private initializeElements(): void {
    this.todoList = document.querySelector<HTMLUListElement>('#todo-list')!;
    this.todoInput = document.querySelector<HTMLInputElement>('#todo-input')!;
    
    if (!this.todoList || !this.todoInput) {
      throw new Error('Required elements not found');
    }
  }

  private bindEvents(): void {
    // Form submission
    const form = document.querySelector<HTMLFormElement>('#todo-form');
    form?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Todo item events
    this.todoList.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const todoId = target.closest('[data-todo-id]')?.getAttribute('data-todo-id');
      
      if (!todoId) return;

      if (target.matches('.delete-btn')) {
        this.handleDelete(Number(todoId));
      } else if (target.matches('.toggle-btn')) {
        this.handleToggle(Number(todoId));
      }
    });
  }

  private handleSubmit(): void {
    const title = this.todoInput.value.trim();
    if (!title) return;

    this.todoService.add({
      title,
      priority: Priority.Medium,
      completed: false
    });

    this.todoInput.value = '';
    this.render();
  }

  private handleDelete(id: number): void {
    this.todoService.remove(id);
    this.render();
  }

  private handleToggle(id: number): void {
    const todo = this.todoService.getTodoById(id);
    if (todo) {
      this.todoService.update(id, { completed: !todo.completed });
      this.render();
    }
  }

  private render(): void {
    const todos = this.todoService.getAll();
    this.todoList.innerHTML = todos
      .map(todo => this.createTodoElement(todo))
      .join('');
  }

  private createTodoElement(todo: Todo): string {
    return \`
      <li class="todo-item \${todo.completed ? 'completed' : ''}" 
          data-todo-id="\${todo.id}">
        <input type="checkbox" 
               class="toggle-btn"
               \${todo.completed ? 'checked' : ''}>
        <span class="title">\${todo.title}</span>
        <span class="priority \${todo.priority.toLowerCase()}">
          \${todo.priority}
        </span>
        <button class="delete-btn">Delete</button>
      </li>
    \`;
  }
}

// Initialize UI
new TodoUI();`,
      language: 'typescript'
    },
    {
      id: 8,
      topic: 'Error Handling & Type Guards',
      description: 'Advanced error handling and type safety in TypeScript',
      content: [`# Error Handling & Type Safety

## Key Concepts
* Custom error types
* Type guards
* Null checking
* Error boundaries
* Type assertions`],
      code: `// src/utils/errors.ts
class TodoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TodoError';
  }
}

class ValidationError extends TodoError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Type guards
interface TodoResponse {
  data?: Todo[];
  error?: string;
}

function isTodoResponse(response: unknown): response is TodoResponse {
  return typeof response === 'object' && response !== null &&
    (Array.isArray((response as TodoResponse).data) ||
     typeof (response as TodoResponse).error === 'string');
}

// Error handling in service
class TodoService {
  async fetchTodos(): Promise<Todo[]> {
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      
      if (!isTodoResponse(data)) {
        throw new TodoError('Invalid response format');
      }
      
      if (data.error) {
        throw new TodoError(data.error);
      }
      
      return data.data ?? [];
    } catch (error) {
      if (error instanceof TodoError) {
        throw error;
      }
      throw new TodoError('Failed to fetch todos');
    }
  }

  validateTodo(todo: Partial<Todo>): asserts todo is Todo {
    if (!todo.title?.trim()) {
      throw new ValidationError('Title is required');
    }
    if (todo.priority && !Object.values(Priority).includes(todo.priority)) {
      throw new ValidationError('Invalid priority');
    }
  }
}

// Usage with error handling
class TodoUI {
  async loadTodos(): Promise<void> {
    try {
      const todos = await this.todoService.fetchTodos();
      this.render(todos);
    } catch (error) {
      if (error instanceof ValidationError) {
        this.showValidationError(error.message);
      } else if (error instanceof TodoError) {
        this.showError(error.message);
      } else {
        this.showError('An unexpected error occurred');
      }
    }
  }
}`,
      language: 'typescript'
    },
    {
      id: 9,
      topic: 'Testing TypeScript Code',
      description: 'Unit testing and integration testing in TypeScript',
      content: [`# Testing TypeScript Applications

## Key Concepts
* Jest configuration
* Test types
* Mocking
* Assertion types
* Test coverage`],
      code: `// src/__tests__/todo-service.test.ts
import { TodoService } from '../services/todo-service';
import { Priority } from '../models/todo';

describe('TodoService', () => {
  let todoService: TodoService;

  beforeEach(() => {
    todoService = TodoService.getInstance();
    localStorage.clear();
  });

  describe('addTodo', () => {
    it('should add a new todo', () => {
      const todo = {
        title: 'Test Todo',
        priority: Priority.Medium,
        completed: false
      };

      todoService.add(todo);
      const todos = todoService.getAll();

      expect(todos).toHaveLength(1);
      expect(todos[0]).toMatchObject({
        ...todo,
        id: expect.any(Number),
        createdAt: expect.any(Date)
      });
    });

    it('should throw validation error for empty title', () => {
      expect(() => {
        todoService.add({
          title: '',
          priority: Priority.Low,
          completed: false
        });
      }).toThrow('Title is required');
    });
  });

  describe('persistence', () => {
    it('should save todos to localStorage', () => {
      const todo = {
        title: 'Test Todo',
        priority: Priority.High,
        completed: false
      };

      todoService.add(todo);
      
      // Recreate service to test loading
      const newService = TodoService.getInstance();
      const todos = newService.getAll();

      expect(todos).toHaveLength(1);
      expect(todos[0].title).toBe(todo.title);
    });
  });
});

// src/__tests__/todo-ui.test.ts
import { TodoUI } from '../ui/todo-ui';
import { fireEvent, screen } from '@testing-library/dom';

describe('TodoUI', () => {
  let todoUI: TodoUI;
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = \`
      <form id="todo-form">
        <input id="todo-input" type="text">
        <button type="submit">Add</button>
      </form>
      <ul id="todo-list"></ul>
    \`;
    document.body.appendChild(container);
    todoUI = new TodoUI();
  });

  afterEach(() => {
    document.body.removeChild(container);
    localStorage.clear();
  });

  it('should add new todo when form is submitted', () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.submit(screen.getByRole('form'));

    const todoItem = screen.getByText('New Todo');
    expect(todoItem).toBeInTheDocument();
  });

  it('should toggle todo completion', () => {
    // Add a todo first
    todoUI.addTodo({
      title: 'Test Todo',
      priority: Priority.Medium,
      completed: false
    });

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const todoItem = screen.getByText('Test Todo')
      .closest('.todo-item');
    expect(todoItem).toHaveClass('completed');
  });
});`,
      language: 'typescript'
    },
    {
      id: 10,
      topic: 'Advanced TypeScript Features',
      description: 'Advanced type system features and patterns',
      content: [`# Advanced TypeScript

## Key Concepts
* Generics
* Decorators
* Utility Types
* Mapped Types
* Conditional Types`],
      code: `// Generic Repository Pattern
interface Repository<T extends { id: number }> {
  find(id: number): T | undefined;
  save(item: T): void;
  delete(id: number): boolean;
  query(predicate: (item: T) => boolean): T[];
}

// Method Decorator for Performance Logging
function measurePerformance(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const start = performance.now();
    const result = await originalMethod.apply(this, args);
    const end = performance.now();
    
    console.log(\`\${propertyKey} took \${end - start}ms\`);
    return result;
  };
}

// Advanced Types
type TodoKeys = keyof Todo;
type ReadonlyTodo = Readonly<Todo>;
type PartialTodo = Partial<Todo>;
type TodoWithoutId = Omit<Todo, 'id'>;
type TodoPreview = Pick<Todo, 'title' | 'priority'>;

// Conditional Types
type AsyncReturnType<T extends (...args: any) => any> = 
  T extends (...args: any) => Promise<infer R> ? R : never;

// Implementation
class TodoRepository implements Repository<Todo> {
  @measurePerformance
  async find(id: number): Promise<Todo | undefined> {
    return this.todos.find(todo => todo.id === id);
  }

  @measurePerformance
  async query(predicate: (todo: Todo) => boolean): Promise<Todo[]> {
    return this.todos.filter(predicate);
  }

  // Type-safe query builder
  where<K extends TodoKeys>(
    key: K,
    value: Todo[K]
  ): (todo: Todo) => boolean {
    return (todo: Todo) => todo[key] === value;
  }
}

// Usage
const repo = new TodoRepository();
const highPriorityTodos = await repo.query(
  repo.where('priority', Priority.High)
);`,
      language: 'typescript'
    },
    {
      id: 11,
      topic: 'Final Todo App Implementation',
      description: 'Putting it all together with best practices',
      content: [`# Complete Todo Application

## Implementation
* Full application structure
* State management
* Event handling
* Persistence
* Error handling`],
      code: `// src/main.ts
import { TodoApp } from './app';
import { TodoService } from './services/todo-service';
import { TodoRepository } from './repositories/todo-repository';
import { LocalStorageAdapter } from './adapters/storage-adapter';

// Dependency injection setup
const storage = new LocalStorageAdapter();
const repository = new TodoRepository(storage);
const service = new TodoService(repository);
const app = new TodoApp(service);

// Initialize app
app.initialize();

// src/app.ts
export class TodoApp {
  private ui: TodoUI;
  private errorHandler: ErrorHandler;

  constructor(private todoService: TodoService) {
    this.errorHandler = new ErrorHandler();
    this.ui = new TodoUI(todoService, this.errorHandler);
  }

  initialize(): void {
    // Register error handlers
    window.onerror = this.errorHandler.handleGlobalError;
    window.onunhandledrejection = this.errorHandler.handleUnhandledRejection;

    // Initialize UI
    this.ui.mount();

    // Load initial data
    this.loadInitialData();
  }

  private async loadInitialData(): Promise<void> {
    try {
      await this.todoService.loadTodos();
      this.ui.render();
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}

// src/ui/components/todo-list.ts
export class TodoList extends Component {
  private items: Todo[] = [];

  constructor(
    private service: TodoService,
    private errorHandler: ErrorHandler
  ) {
    super('#todo-list');
    this.bindEvents();
  }

  @measurePerformance
  async render(): Promise<void> {
    try {
      this.items = await this.service.getTodos();
      this.element.innerHTML = this.items
        .map(todo => this.renderTodoItem(todo))
        .join('');
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  private renderTodoItem(todo: Todo): string {
    return \`
      <li class="todo-item \${todo.completed ? 'completed' : ''}" 
          data-todo-id="\${todo.id}">
        <div class="todo-content">
          <input type="checkbox" 
                 \${todo.completed ? 'checked' : ''}
                 aria-label="Toggle todo completion">
          <span class="title">\${this.escapeHtml(todo.title)}</span>
        </div>
        <div class="todo-actions">
          <span class="priority \${todo.priority.toLowerCase()}">
            \${todo.priority}
          </span>
          <button class="edit-btn" aria-label="Edit todo">
            Edit
          </button>
          <button class="delete-btn" aria-label="Delete todo">
            Delete
          </button>
        </div>
      </li>
    \`;
  }

  private bindEvents(): void {
    this.element.addEventListener('click', this.handleClick.bind(this));
  }

  @errorBoundary
  private async handleClick(event: Event): Promise<void> {
    const target = event.target as HTMLElement;
    const todoId = this.getTodoId(target);
    
    if (!todoId) return;

    if (target.matches('.delete-btn')) {
      await this.handleDelete(todoId);
    } else if (target.matches('.edit-btn')) {
      await this.handleEdit(todoId);
    } else if (target.matches('input[type="checkbox"]')) {
      await this.handleToggle(todoId);
    }
  }
}`,
      language: 'typescript'
    },
    {
      id: 12,
      topic: 'Production Best Practices',
      description: 'Best practices for production TypeScript applications',
      content: [`# Production Best Practices

## Key Areas
* Code organization
* Performance optimization
* Security considerations
* Error handling
* Deployment preparation`],
      code: `// src/config/constants.ts
export const CONFIG = {
  api: {
    baseUrl: process.env.API_URL || '/api',
    timeout: 5000
  },
  storage: {
    prefix: 'todo_app_',
    version: '1.0'
  },
  security: {
    maxRequestSize: 1024 * 1024, // 1MB
    allowedOrigins: ['https://api.example.com']
  }
} as const;

// src/utils/performance.ts
export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map();

  static trackMetric(name: string, value: number): void {
    const metrics = this.metrics.get(name) || [];
    metrics.push(value);
    this.metrics.set(name, metrics);
  }

  static getAverageMetric(name: string): number {
    const metrics = this.metrics.get(name) || [];
    return metrics.reduce((a, b) => a + b, 0) / metrics.length;
  }
}

// src/utils/security.ts
export class SecurityUtil {
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '')
      .trim()
      .slice(0, CONFIG.security.maxRequestSize);
  }

  static validateOrigin(origin: string): boolean {
    return CONFIG.security.allowedOrigins.includes(origin);
  }
}

// src/services/api-service.ts
export class ApiService {
  private static instance: ApiService;
  private controller: AbortController;

  @retry(3)
  async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    this.controller = new AbortController();
    
    try {
      const response = await fetch(\`\${CONFIG.api.baseUrl}\${endpoint}\`, {
        ...options,
        signal: this.controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers
        }
      });

      if (!response.ok) {
        throw new ApiError(response.statusText, response.status);
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error', 500);
    }
  }

  abort(): void {
    this.controller?.abort();
  }
}`,
      language: 'typescript'
    },
    {
      id: 13,
      topic: 'Performance Optimization',
      description: 'Optimizing TypeScript applications for production',
      content: [`# Performance Optimization

## Key Areas
* Bundle optimization
* Code splitting
* Memory management
* Virtual scrolling
* Performance monitoring`],
      code: `// src/utils/performance/virtual-list.ts
class VirtualList<T> {
  private container: HTMLElement;
  private itemHeight = 50;
  private visibleItems = 10;
  private scrollTop = 0;
  private items: T[] = [];

  constructor(containerId: string) {
    this.container = document.getElementById(containerId)!;
    this.setupScroll();
  }

  setItems(items: T[]): void {
    this.items = items;
    this.render();
  }

  private setupScroll(): void {
    this.container.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        this.scrollTop = this.container.scrollTop;
        this.render();
      });
    });
  }

  private render(): void {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = Math.min(
      startIndex + this.visibleItems,
      this.items.length
    );

    const visibleItems = this.items
      .slice(startIndex, endIndex)
      .map(item => this.renderItem(item));

    this.container.innerHTML = \`
      <div style="height: \${this.items.length * this.itemHeight}px;">
        <div style="transform: translateY(\${startIndex * this.itemHeight}px)">
          \${visibleItems.join('')}
        </div>
      </div>
    \`;
  }

  private renderItem(item: T): string {
    // Implement your item rendering logic
    return \`<div style="height: \${this.itemHeight}px">\${JSON.stringify(item)}</div>\`;
  }
}

// src/utils/performance/lazy-loading.ts
const lazyLoad = async <T>(
  factory: () => Promise<T>,
  fallback: T
): Promise<T> => {
  try {
    return await factory();
  } catch (error) {
    console.error('Lazy loading failed:', error);
    return fallback;
  }
};

// Usage in TodoApp
class TodoApp {
  private virtualList: VirtualList<Todo>;
  
  async initialize(): void {
    // Lazy load advanced features
    const advancedFeatures = await lazyLoad(
      () => import('./features/advanced'),
      { enabled: false }
    );

    // Setup virtual list for large datasets
    this.virtualList = new VirtualList<Todo>('todo-container');
    this.virtualList.setItems(await this.todoService.getAll());
  }
}`,
      language: 'typescript'
    },
    {
      id: 14,
      topic: 'Deployment & CI/CD',
      description: 'Deployment strategies and continuous integration',
      content: [`# Deployment & CI/CD

## Key Areas
* Build optimization
* Environment configuration
* CI/CD pipeline
* Docker containerization
* Monitoring setup`],
      code: `// vite.config.ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    target: 'es2015',
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        todo: resolve(__dirname, 'src/features/todo/index.ts')
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          todo: ['./src/features/todo']
        }
      }
    }
  }
});

// Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Test
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Docker build
        run: docker build -t todo-app .
      
      - name: Deploy
        if: github.ref == 'refs/heads/main'
        run: |
          echo \${{ secrets.DOCKER_PASSWORD }} | docker login -u \${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push todo-app`,
      language: 'yaml'
    },
    {
      id: 15,
      topic: 'Documentation & Best Practices',
      description: 'Documentation and maintainability best practices',
      content: [`# Documentation & Best Practices

## Key Areas
* Code documentation
* API documentation
* Style guides
* Project structure
* Contribution guidelines`],
      code: `// src/types/todo.ts
/**
 * Represents a Todo item in the application.
 * @interface Todo
 */
export interface Todo {
  /** Unique identifier for the todo item */
  id: number;
  
  /** The title or description of the todo */
  title: string;
  
  /** Optional detailed description */
  description?: string;
  
  /** Whether the todo is completed */
  completed: boolean;
  
  /** Priority level of the todo */
  priority: Priority;
  
  /** Creation timestamp */
  readonly createdAt: Date;
}

// src/docs/CONTRIBUTING.md
# Contributing to Todo App

## Development Setup
\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
\`\`\`

## Code Style
- Follow the TypeScript style guide
- Use meaningful variable names
- Write unit tests for new features
- Document public APIs

## Pull Request Process
1. Create a feature branch
2. Update documentation
3. Add tests
4. Submit PR

// src/docs/API.md
# Todo API Documentation

## Endpoints

### GET /api/todos
Retrieves all todos.

Response:
\`\`\`typescript
interface TodoResponse {
  items: Todo[];
  total: number;
}
\`\`\`

### POST /api/todos
Creates a new todo.

Request Body:
\`\`\`typescript
interface CreateTodoRequest {
  title: string;
  description?: string;
  priority: Priority;
}
\`\`\`

// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jsdoc'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsdoc/recommended'
  ],
  rules: {
    'jsdoc/require-jsdoc': ['error', {
      publicOnly: true,
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true,
        ArrowFunctionExpression: false
      }
    }]
  }
};`,
      language: 'typescript'
    }
  ]
}; 