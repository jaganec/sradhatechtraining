import { CourseSlides } from "../models/slide.model"

export const reactSlides: CourseSlides = {
  category: 'react',
  slides: [
    {
      id: 1,
      topic: 'Modern React Development',
      description: 'Introduction to React and modern development setup',
      content: [`# Modern React Development

## What is React?
* JavaScript library for building user interfaces
* Component-based architecture
* Virtual DOM for efficient rendering
* Declarative approach
* Rich ecosystem

## Modern Development Stack
* Vite for build tooling
* ESLint & Prettier for code quality
* React Router for navigation
* State management with hooks/context
* Component libraries (MUI, etc.)

## Why Vite?
* Lightning fast HMR
* Optimized build process
* Better developer experience
* Modern features out of the box`],
      code: `# Create new project
npm create vite@latest my-shop -- --template react

# Install dependencies
cd my-shop
npm install

# Add essential packages
npm install react-router-dom @tanstack/react-query
npm install @mui/material @emotion/react @emotion/styled
npm install prop-types eslint prettier

# Development tools
npm install -D vitest jsdom @testing-library/react
npm install -D @vitejs/plugin-react

# Start development
npm run dev`,
      language: 'bash'
    },
    {
      id: 2,
      topic: 'Project Structure & Best Practices',
      description: 'Setting up a scalable React project structure',
      content: [`# Project Structure & Best Practices

## Modern Project Structure
* Feature-based organization
* Shared components
* Custom hooks
* Service layer
* Type checking with PropTypes

## Best Practices
* Component composition
* Custom hooks for logic
* Error boundaries
* Lazy loading
* Performance optimization`],
      code: `// Project structure
src/
  ├── components/        # Shared/common components
  │   ├── ui/           # Basic UI components
  │   └── layout/       # Layout components
  ├── features/         # Feature-based modules
  │   ├── products/     # Product feature
  │   ├── cart/         # Shopping cart
  │   └── checkout/     # Checkout process
  ├── hooks/            # Custom hooks
  ├── services/         # API/external services
  ├── utils/            # Utility functions
  ├── constants/        # Constants/config
  └── App.js           # Root component

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    globals: true
  }
});

// src/components/ui/Button.js
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  variant = 'primary',
  onClick,
  disabled = false 
}) => {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default Button;`,
      language: 'jsx'
    },
    {
      id: 3,
      topic: 'Components and Props',
      description: 'Understanding React components and props',
      content: [`# Components & Props

## Concepts Covered
* Functional Components
* Props passing
* Component composition
* Props destructuring
* Children prop
* PropTypes`],
      code: `// Basic Component
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};

// Props Destructuring
const UserCard = ({ name, email, avatar }) => {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};

// Component Composition
const Layout = ({ children, sidebar }) => {
  return (
    <div className="layout">
      <nav className="sidebar">{sidebar}</nav>
      <main className="content">{children}</main>
    </div>
  );
};

// PropTypes Example
import PropTypes from 'prop-types';

const Button = ({ label, onClick, variant = 'primary' }) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger'])
};`,
      language: 'jsx'
    },
    {
      id: 4,
      topic: 'State and Events',
      description: 'Managing state and handling events',
      content: [`# State & Events

## Concepts Covered
* useState hook
* Event handling
* State updates
* Form handling
* Controlled components`],
      code: `// State and Events Example
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};

// Form Handling
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};`,
      language: 'jsx'
    },
    {
      id: 5,
      topic: 'Effects and Lifecycle',
      description: 'Understanding effects and component lifecycle',
      content: [`# Effects & Lifecycle

## Concepts Covered
* useEffect hook
* Dependency array
* Cleanup functions
* API calls
* Side effects
* Common patterns`],
      code: `// Effects Example
import { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

// Cleanup Example
const Timer = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    // Cleanup function
    return () => clearInterval(timer);
  }, []); // Empty dependency array = run once

  return <div>Count: {count}</div>;
};

// Window Event Example
const WindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      Width: {size.width}, Height: {size.height}
    </div>
  );
};`,
      language: 'jsx'
    },
    {
      id: 6,
      topic: 'Suspense and Error Boundaries',
      description: 'Advanced React patterns for loading and error handling',
      content: [`# Suspense and Error Boundaries

## Key Concepts
* Data fetching with Suspense
* Error boundary patterns
* Loading states
* Code splitting
* Route-based lazy loading`],
      code: `// src/components/ErrorBoundary.js
import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to error service
    console.error('Error caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div role="alert" className="error-container">
          <h2>Something went wrong</h2>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.element
};

// App.js - Implementation
import { Suspense, lazy } from 'react';

// Lazy-loaded components
const ProductList = lazy(() => import('./features/products/ProductList'));
const ProductDetails = lazy(() => import('./features/products/ProductDetails'));
const Cart = lazy(() => import('./features/cart/Cart'));

const LoadingFallback = () => (
  <div className="loading-container">
    <CircularProgress />
    <p>Loading...</p>
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

// ProductDetails.js - Using Suspense for data fetching
const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, error } = useSuspenseQuery(
    ['product', id],
    () => fetchProduct(id)
  );

  if (error) throw error; // Error boundary will catch this

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCartButton product={product} />
    </div>
  );
};`,
      language: 'jsx'
    },
    {
      id: 7,
      topic: 'Performance Optimization',
      description: 'Optimizing React application performance',
      content: [`# Performance Optimization

## Techniques Covered
* Component memoization
* Hook optimization
* Bundle splitting
* Render optimization
* Performance monitoring`],
      code: `// src/components/ProductCard.js
import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

const ProductCard = memo(({ product, onAddToCart }) => {
  const handleAddToCart = useCallback(() => {
    onAddToCart(product.id);
  }, [product.id, onAddToCart]);

  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.name}
        loading="lazy" // Lazy load images
        width="200"
        height="200"
      />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
});

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired
};

// ProductList.js - Performance optimized
const ProductList = () => {
  const [filters, setFilters] = useState(initialFilters);
  
  // Memoize expensive calculations
  const filteredProducts = useMemo(() => 
    products.filter(applyFilters(filters)),
    [products, filters]
  );

  // Stable callback for child components
  const handleAddToCart = useCallback((productId) => {
    addToCart(productId);
  }, []);

  // Virtualized list for large datasets
  return (
    <VirtualizedList
      items={filteredProducts}
      renderItem={(product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      )}
    />
  );
};

// Custom hooks with performance in mind
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

// Performance monitoring
const withPerformanceTracking = (WrappedComponent, metricName) => {
  return function PerformanceTrackedComponent(props) {
    const componentStart = performance.now();
    
    useEffect(() => {
      const renderTime = performance.now() - componentStart;
      console.log(\`\${metricName} render time: \${renderTime}ms\`);
    });

    return <WrappedComponent {...props} />;
  };
};`,
      language: 'jsx'
    },
    {
      id: 8,
      topic: 'Modern Data Fetching with React Query',
      description: 'Using React Query for efficient data management',
      content: [`# React Query

## Why React Query?
* Automatic caching and background updates
* Loading & error states management
* Pagination and infinite scroll
* Optimistic updates
* Automatic retry on failure

## Key Features
* Query invalidation
* Parallel queries
* Dependent queries
* Mutations
* Prefetching`],
      code: `// src/hooks/useProducts.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../services/api';

export const useProducts = (filters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productApi.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (productId) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => productApi.getProduct(productId),
    enabled: !!productId,
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newProduct) => productApi.create(newProduct),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products'] });
      // Optimistic update
      queryClient.setQueryData(['product', data.id], data);
    },
  });
};

// Usage in component
const ProductList = () => {
  const { data, isLoading, error } = useProducts({ category: 'electronics' });
  const { mutate: addProduct } = useAddProduct();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {data.products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product}
          onAdd={() => addProduct(product)}
        />
      ))}
    </div>
  );
};`,
      language: 'jsx'
    },
    {
      id: 9,
      topic: 'State Management with Context',
      description: 'Implementing shopping cart using Context API',
      content: [`# Context API for State Management

## Benefits
* Built into React
* Simpler than Redux for many cases
* Easier to understand
* Perfect for medium-sized apps
* Reduces prop drilling`],
      code: `// src/context/CartContext.js
import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );
      
      return {
        ...state,
        items: existingItem
          ? state.items.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.items, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, quantity },
    });
  };

  const cartTotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook for using cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Usage in components
const AddToCartButton = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <button onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  );
};

const CartSummary = () => {
  const { items, total, removeFromCart, updateQuantity } = useCart();
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, +e.target.value)}
            min="1"
          />
          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}
      <div>Total: \${total.toFixed(2)}</div>
    </div>
  );
};`,
      language: 'jsx'
    },
    {
      id: 10,
      topic: 'Project Structure & Routing',
      description: 'Setting up e-commerce project structure and routing',
      content: [`# E-commerce Project Setup

## Project Structure
* Feature-based organization
* Shared components
* Route configuration
* Layout components
* PropTypes validation`],
      code: `// src/App.js
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout } from './components/Layout';
import { 
  Home,
  ProductList,
  ProductDetails,
  Cart,
  Checkout 
} from './features';

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  </Layout>
);

// src/components/Layout/Layout.js
import PropTypes from 'prop-types';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

export const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow container mx-auto px-4 py-8">
      {children}
    </main>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};`,
      language: 'jsx'
    },
    {
      id: 11,
      topic: 'Product List Implementation',
      description: 'Building the product listing with filters',
      content: [`# Product List Feature

## Implementation Details
* Product grid layout
* Filter and sort functionality
* Search implementation
* Pagination
* Loading states`],
      code: `// src/features/products/ProductList.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useProducts } from './useProducts';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { Pagination, LoadingSpinner } from '@/components/ui';

export const ProductList = () => {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'price'
  });

  const { 
    products, 
    isLoading, 
    error,
    pagination,
    setPage 
  } = useProducts(filters);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <aside className="col-span-1">
        <ProductFilters 
          filters={filters} 
          onChange={setFilters} 
        />
      </aside>
      
      <div className="col-span-2">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
        
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

// src/features/products/useProducts.js
import { useQuery } from '@tanstack/react-query';
import { ProductService } from '@/services/product';

export const useProducts = (filters) => {
  const { 
    data, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => ProductService.getProducts(filters)
  });

  return {
    products: data?.items ?? [],
    pagination: data?.pagination,
    isLoading,
    error
  };
};

// PropTypes
ProductFilters.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    sortBy: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};`,
      language: 'jsx'
    },
    {
      id: 12,
      topic: 'Shopping Cart Component',
      description: 'Implementing the shopping cart functionality',
      content: [`# Shopping Cart Implementation

## Concepts Covered
* Redux hooks (useSelector, useDispatch)
* Effect hooks
* Cart calculations
* Component composition
* Event handling`],
      code: `// src/features/cart/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  List, 
  ListItem, 
  Typography, 
  IconButton, 
  Box 
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { removeFromCart } from './cartSlice';

const Cart = () => {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return <Typography>Your cart is empty</Typography>;
  }

  return (
    <Box>
      <List>
        {items.map(item => (
          <ListItem
            key={item.id}
            secondaryAction={
              <IconButton 
                edge="end" 
                onClick={() => handleRemove(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
              <img 
                src={item.image} 
                alt={item.name} 
                style={{ width: 50, marginRight: 16 }} 
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="body2">
                  \${item.price.toFixed(2)} x {item.quantity}
                </Typography>
              </Box>
              <Typography variant="subtitle1">
                \${(item.price * item.quantity).toFixed(2)}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box sx={{ textAlign: 'right', p: 2 }}>
        <Typography variant="h6">
          Total: \${total.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default Cart;`,
      language: 'jsx'
    },
    {
      id: 13,
      topic: 'Authentication Setup',
      description: 'Implementing user authentication',
      content: [`# User Authentication

## Concepts Covered
* Custom hooks
* Protected routes
* JWT handling
* Form validation
* Error handling`],
      code: `// src/features/auth/useAuth.js
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from './authSlice';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) throw new Error('Login failed');

      const { token, user } = await response.json();
      localStorage.setItem('token', token);
      dispatch(setUser(user));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
  };

  return { login, logout, loading };
};

// src/features/auth/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Box, 
  Typography 
} from '@mui/material';
import { useAuth } from './useAuth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
      )}

      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        type="email"
      />

      <TextField
        fullWidth
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
        type="password"
      />

      <Button 
        type="submit" 
        variant="contained" 
        fullWidth 
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;`,
      language: 'jsx'
    },
    {
      id: 14,
      topic: 'Product Details with Routing',
      description: 'Implementing product details page and routing',
      content: [`# Product Details & Routing

## Concepts Covered
* React Router setup
* Dynamic routing
* Route parameters
* Nested routes
* Loading states`],
      code: `// src/features/products/ProductDetails.js
import React, { Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  Grid,
  Skeleton 
} from '@mui/material';
import { useProduct } from '../hooks/useProduct';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <CardMedia
          component="img"
          height="400"
          image={product.image}
          alt={product.name}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="h5" color="primary">
          \${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          {product.description}
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </Button>
      </Grid>
    </Grid>
  );
};

// src/App.js
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};`,
      language: 'jsx'
    },
    {
      id: 15,
      topic: 'Testing Setup and First Tests',
      description: 'Setting up testing environment and writing tests',
      content: [`# Testing React Applications

## Concepts Covered
* Jest configuration
* React Testing Library
* Unit testing
* Integration testing
* Test-Driven Development (TDD)`],
      code: `// src/features/products/__tests__/ProductList.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../../store';
import ProductList from '../ProductList';

describe('ProductList', () => {
  const mockProducts = [
    { id: 1, name: 'Test Product', price: 99.99 }
  ];

  beforeEach(() => {
    // Mock API calls
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ products: mockProducts })
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders product list correctly', async () => {
    render(
      <Provider store={createStore()}>
        <ProductList />
      </Provider>
    );

    // Wait for products to load
    const productName = await screen.findByText('Test Product');
    expect(productName).toBeInTheDocument();
    
    const price = screen.getByText('$99.99');
    expect(price).toBeInTheDocument();
  });

  it('handles add to cart action', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    const addButton = await screen.findByText('Add to Cart');
    fireEvent.click(addButton);

    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].id).toBe(1);
  });
});

// src/features/cart/__tests__/cartSlice.test.js
import cartReducer, { addToCart, removeFromCart } from '../cartSlice';

describe('cartSlice', () => {
  const initialState = {
    items: [],
    total: 0
  };

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addToCart', () => {
    const product = { id: 1, name: 'Test', price: 10 };
    const state = cartReducer(initialState, addToCart(product));
    
    expect(state.items).toHaveLength(1);
    expect(state.total).toBe(10);
  });

  it('should handle removeFromCart', () => {
    const state = {
      items: [{ id: 1, name: 'Test', price: 10, quantity: 1 }],
      total: 10
    };
    
    const newState = cartReducer(state, removeFromCart(1));
    expect(newState.items).toHaveLength(0);
    expect(newState.total).toBe(0);
  });
});`,
      language: 'jsx'
    },
    {
      id: 16,
      topic: 'Checkout Process',
      description: 'Implementing checkout with form validation',
      content: [`# Checkout Process Implementation

## Concepts Covered
* Form validation with Formik
* Yup schema validation
* Multi-step forms
* Payment integration
* Error handling`],
      code: `// src/features/checkout/CheckoutForm.js
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Box 
} from '@mui/material';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object({
  shipping: Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    zipCode: Yup.string().required('Required').matches(/^\\d{5}$/, 'Invalid ZIP')
  }),
  payment: Yup.object({
    cardNumber: Yup.string()
      .required('Required')
      .matches(/^\\d{16}$/, 'Invalid card number'),
    expiry: Yup.string()
      .required('Required')
      .matches(/^(0[1-9]|1[0-2])\\/\\d{2}$/, 'Invalid expiry'),
    cvv: Yup.string()
      .required('Required')
      .matches(/^\\d{3,4}$/, 'Invalid CVV')
  })
});

const CheckoutForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector(state => state.cart);
  
  const steps = ['Shipping', 'Payment', 'Review'];

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const order = await createOrder({
        ...values,
        items: cart.items,
        total: cart.total
      });
      
      // Handle successful order
      navigate(\`/order-confirmation/\${order.id}\`);
    } catch (error) {
      // Handle error
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Formik
        initialValues={{
          shipping: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            zipCode: ''
          },
          payment: {
            cardNumber: '',
            expiry: '',
            cvv: ''
          }
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            {activeStep === 0 && <ShippingForm errors={errors} touched={touched} />}
            {activeStep === 1 && <PaymentForm errors={errors} touched={touched} />}
            {activeStep === 2 && <OrderReview />}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => prev - 1)}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Place Order
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => setActiveStep(prev => prev + 1)}
                >
                  Next
                </Button>
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};`,
      language: 'jsx'
    },
    {
      id: 17,
      topic: 'Order Management & API Integration',
      description: 'Implementing order management with custom hooks',
      content: [`# Order Management & API Integration

## Concepts Covered
* Custom hooks for API calls
* Error handling
* Loading states
* Data caching
* Optimistic updates`],
      code: `// src/features/orders/useOrders.js
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { orderApi } from '../services/api';

export const useOrders = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  // Fetch orders
  const {
    data: orders,
    isLoading,
    refetch
  } = useQuery('orders', orderApi.getOrders, {
    onError: (err) => setError(err.message)
  });

  // Create order
  const { mutate: createOrder } = useMutation(
    orderApi.createOrder,
    {
      onSuccess: (newOrder) => {
        queryClient.setQueryData('orders', old => [...old, newOrder]);
      },
      onError: (err) => setError(err.message)
    }
  );

  // Cancel order
  const { mutate: cancelOrder } = useMutation(
    orderApi.cancelOrder,
    {
      onMutate: async (orderId) => {
        // Optimistic update
        const previousOrders = queryClient.getQueryData('orders');
        queryClient.setQueryData('orders', old =>
          old.map(order => 
            order.id === orderId 
              ? { ...order, status: 'cancelled' }
              : order
          )
        );
        return { previousOrders };
      },
      onError: (err, orderId, context) => {
        queryClient.setQueryData('orders', context.previousOrders);
        setError(err.message);
      }
    }
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    orders,
    isLoading,
    error,
    createOrder,
    cancelOrder,
    clearError,
    refetch
  };
};

// src/features/orders/OrderList.js
import React from 'react';
import { 
  List, 
  ListItem, 
  Typography, 
  Button, 
  Chip 
} from '@mui/material';
import { useOrders } from './useOrders';

const OrderList = () => {
  const { 
    orders, 
    isLoading, 
    error, 
    cancelOrder 
  } = useOrders();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <List>
      {orders.map(order => (
        <ListItem
          key={order.id}
          secondaryAction={
            order.status === 'pending' && (
              <Button 
                color="error"
                onClick={() => cancelOrder(order.id)}
              >
                Cancel Order
              </Button>
            )
          }
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1">
              Order #{order.id}
            </Typography>
            <Typography variant="body2">
              Total: \${order.total.toFixed(2)}
            </Typography>
            <Chip 
              label={order.status} 
              color={getStatusColor(order.status)}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </ListItem>
      ))}
    </List>
  );
};`,
      language: 'jsx'
    },
    {
      id: 18,
      topic: 'Error Boundaries & Performance',
      description: 'Implementing error boundaries and optimizing performance',
      content: [`# Error Handling & Performance

## Concepts Covered
* Error Boundaries
* React.memo
* useMemo and useCallback
* Code splitting
* Lazy loading
* Performance monitoring`],
      code: `// src/components/ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Send to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// src/App.js - Performance Optimizations
import React, { Suspense, lazy, useMemo, useCallback } from 'react';

// Lazy loading routes
const ProductList = lazy(() => import('./features/products/ProductList'));
const Cart = lazy(() => import('./features/cart/Cart'));
const Checkout = lazy(() => import('./features/checkout/Checkout'));

// Memoized expensive component
const ExpensiveCalculation = React.memo(({ data }) => {
  // Complex calculations here
  return <div>{/* Rendered content */}</div>;
});

// Optimized hooks usage
const ProductFilters = ({ products, onFilter }) => {
  const categories = useMemo(() => 
    [...new Set(products.map(p => p.category))],
    [products]
  );

  const handleFilter = useCallback((category) => {
    onFilter(category);
  }, [onFilter]);

  return (
    <div>
      {categories.map(category => (
        <button 
          key={category}
          onClick={() => handleFilter(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// App with error boundary and suspense
const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          {/* Other routes */}
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};`,
      language: 'jsx'
    },
    {
      id: 19,
      topic: 'ESLint & Prettier Setup',
      description: 'Configuring ESLint and Prettier for code quality',
      content: [`# Code Quality Tools

## Concepts Covered
* ESLint configuration
* Prettier setup
* Custom rules
* Git hooks with husky
* VS Code integration`],
      code: `// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}

// package.json scripts
{
  "scripts": {
    "lint": "eslint src --ext .js,.jsx",
    "lint:fix": "eslint src --ext .js,.jsx --fix",
    "format": "prettier --write 'src/**/*.{js,jsx,css,scss}'",
    "prepare": "husky install"
  }
}

// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm run format`,
      language: 'javascript'
    },
    {
      id: 20,
      topic: 'E2E Testing with Cypress',
      description: 'Setting up and writing E2E tests with Cypress',
      content: [`# E2E Testing

## Concepts Covered
* Cypress setup
* Writing test specs
* Custom commands
* Fixtures and mocking
* CI/CD integration`],
      code: `// cypress/e2e/checkout.cy.js
describe('Checkout Flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/products', { fixture: 'products.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order-success.json' });
    cy.login(); // Custom command
  });

  it('completes checkout process', () => {
    // Add product to cart
    cy.visit('/');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="add-to-cart"]').click();
    
    // Navigate to cart
    cy.get('[data-testid="cart-icon"]').click();
    cy.get('[data-testid="checkout-button"]').click();

    // Fill shipping form
    cy.get('[name="shipping.firstName"]').type('John');
    cy.get('[name="shipping.lastName"]').type('Doe');
    cy.get('[name="shipping.address"]').type('123 Main St');
    cy.get('[name="shipping.city"]').type('Boston');
    cy.get('[name="shipping.zipCode"]').type('02108');
    cy.get('[data-testid="next-button"]').click();

    // Fill payment form
    cy.get('[name="payment.cardNumber"]')
      .type('4111111111111111');
    cy.get('[name="payment.expiry"]').type('12/25');
    cy.get('[name="payment.cvv"]').type('123');
    cy.get('[data-testid="next-button"]').click();

    // Confirm order
    cy.get('[data-testid="place-order"]').click();
    
    // Verify success
    cy.url().should('include', '/order-confirmation');
    cy.contains('Order Successful').should('be.visible');
  });
});

// cypress/support/commands.js
Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: {
      email: Cypress.env('USER_EMAIL'),
      password: Cypress.env('USER_PASSWORD'),
    },
  }).then((response) => {
    window.localStorage.setItem('token', response.body.token);
  });
});

// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    env: {
      USER_EMAIL: 'test@example.com',
      USER_PASSWORD: 'testpass123',
    },
  },
});`,
      language: 'javascript'
    }
  ]
};