import { CourseSlides } from '../models/slide.model';

export const accessibilitySlides: CourseSlides = {
  category: 'accessibility',
  slides: [
    {
      id: 1,
      topic: 'Introduction to Web Accessibility (A11y)',
      description: 'Understanding the fundamentals of web accessibility and legal requirements',
      content: [
        "What is Web Accessibility?",
        "• Making websites usable by people of all abilities and disabilities",
        "• Ensuring equal access to information and functionality",
        "Legal Framework:",
        "• WCAG (Web Content Accessibility Guidelines)",
        "• ADA (Americans with Disabilities Act)",
        "• Section 508 (US Federal requirements)"
      ],
      language: 'text'
    },
    {
      id: 2,
      topic: 'Why Accessibility Matters',
      description: 'Business impact and social responsibility of web accessibility',
      content: [
        "Business Impact:",
        "• 1 in 4 US adults have a disability (CDC)",
        "• Larger market reach",
        "• Better SEO performance",
        "Legal Compliance:",
        "• Avoid lawsuits",
        "• Meet government requirements",
        "Social Responsibility:",
        "• Digital inclusion",
        "• Better user experience for everyone"
      ],
      language: 'text'
    },
    {
      id: 3,
      topic: 'POUR Principles',
      description: 'Core principles of WCAG accessibility guidelines',
      content: [
        "Core Principles of WCAG:",
        "• Perceivable - Information must be presentable to users in ways they can perceive",
        "• Operable - Interface components must be operable",
        "• Understandable - Information and operation must be understandable",
        "• Robust - Content must be robust enough to work with current and future technologies"
      ],
      code: `// Example of Perceivable content
<img src="logo.png" alt="Company Logo"> // Good
<img src="logo.png"> // Bad - Missing alt text

// Example of Operable content
<button onClick={handleClick}>Submit</button> // Good
<div onClick={handleClick}>Submit</div> // Bad - Not keyboard accessible`,
      language: 'html'
    },
    {
      id: 4,
      topic: 'Semantic HTML Best Practices',
      description: 'Using proper HTML elements and ARIA attributes',
      content: [
        "Use Proper HTML Elements:",
        "• &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;footer&gt;",
        "• &lt;article&gt;, &lt;section&gt;, &lt;aside&gt;",
        "• &lt;h1&gt; - &lt;h6&gt; for proper heading hierarchy",
        "When to Use ARIA:",
        "• First rule of ARIA: Don't use ARIA if native HTML exists",
        "• Only add when enhancing complex interactions"
      ],
      code: `// Bad example
<div class="button" onclick="submit()">Submit</div>

// Good example
<button type="submit">Submit</button>

// Bad example
<div class="heading">Title</div>

// Good example
<h1>Title</h1>`,
      language: 'html'
    },
    {
      id: 5,
      topic: 'Keyboard Navigation',
      description: 'Implementing proper keyboard navigation and focus management',
      content: [
        "Essential Requirements:",
        "• All interactive elements must be focusable",
        "• Logical tab order",
        "• Visible focus indicators",
        "Focus Management:",
        "• Trap focus in modals",
        "• Skip links for main content"
      ],
      code: `// Skip link implementation
<a href="#main" class="skip-link">
  Skip to main content
</a>

// Focus trap for modal
const trapFocus = (element) => {
  const focusableElements = 
    element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  // Handle tab key
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });
};`,
      language: 'javascript'
    },
    {
      id: 6,
      topic: 'Color and Visual Design',
      description: 'Implementing accessible color contrast and visual design',
      content: [
        "Color Contrast Requirements:",
        "• WCAG AA: 4.5:1 for normal text, 3:1 for large text",
        "• WCAG AAA: 7:1 for normal text, 4.5:1 for large text",
        "Best Practices:",
        "• Don't rely on color alone",
        "• Provide sufficient spacing",
        "• Support text resizing up to 200%"
      ],
      code: `// CSS with good contrast
.text-primary {
  /* Good contrast - 7:1 ratio */
  color: #595959;
  background-color: #ffffff;
}

/* Don't rely on color alone for indicating state */
.required-field::after {
  content: " *";
  color: #d32f2f;
}`,
      language: 'css'
    },
    {
      id: 7,
      topic: 'Accessible Forms',
      description: 'Creating accessible form controls and validation',
      content: [
        "Essential Components:",
        "• Proper <label> for every form control",
        "• Clear instructions and placeholders",
        "• Error messages linked to inputs",
        "Best Practices:",
        "• Group related fields with <fieldset>",
        "• Use aria-invalid for errors",
        "• Provide clear success/error feedback"
      ],
      code: `// Accessible form example
<form>
  <div class="form-group">
    <label for="name">Full Name</label>
    <input 
      id="name"
      type="text"
      aria-required="true"
      aria-invalid="false"
    />
  </div>

  <fieldset>
    <legend>Shipping Address</legend>
    <div class="form-group">
      <label for="street">Street</label>
      <input id="street" type="text" />
    </div>
  </fieldset>

  <div class="form-group">
    <label for="email">Email</label>
    <input 
      id="email"
      type="email"
      aria-describedby="email-error"
    />
    <div id="email-error" role="alert">
      Please enter a valid email address
    </div>
  </div>
</form>`,
      language: 'html'
    },
    {
      id: 8,
      topic: 'Testing Tools and Techniques',
      description: 'Tools and methods for accessibility testing',
      content: [
        "Automated Testing:",
        "• Axe DevTools",
        "• WAVE Evaluation Tool",
        "• Lighthouse Accessibility Audit",
        "Manual Testing:",
        "• Keyboard navigation",
        "• Screen readers (NVDA, VoiceOver)",
        "• Browser zoom and text sizing"
      ],
      code: `// Example Lighthouse CLI command
lighthouse --only-categories=accessibility

// Jest test with axe-core
import { axe } from 'jest-axe';

test('form is accessible', async () => {
  const { container } = render(<LoginForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});`,
      language: 'javascript'
    }
  ]
}; 