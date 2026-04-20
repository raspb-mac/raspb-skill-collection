# MARP Theme Customization Guide

Learn how to create and customize MARP themes for branded presentations.

## How Themes Work

A MARP theme is a CSS file that defines:
- **Colors** – Primary, secondary, accent, text colors
- **Typography** – Font families, sizes, weights
- **Layout** – Spacing, margins, padding, positioning
- **Components** – Buttons, tables, code blocks, images
- **Slide Types** – Different styling for title, content, highlight slides

## raspb Theme Structure

The pre-built `raspb-theme.css` includes:

```css
/* Color variables */
:root {
  --color-primary: #F84B8A;
  --color-secondary: #D4C5F9;
  --color-dark-bg: #121D33;
  /* ... more colors ... */
}

/* Global styles */
section { /* base slide styling */ }
h1, h2, h3 { /* heading styles */ }
p, ul, li { /* text and list styles */ }

/* Special slides */
section.title { /* title slide */ }
section.highlight { /* callout slide */ }
section.dark { /* dark mode */ }
```

## Creating a Custom Theme

### Step 1: Copy the Base Theme

```bash
cp /home/node/.openclaw/workspace/skills/marp/assets/themes/raspb-theme.css \
   my-custom-theme.css
```

### Step 2: Modify Colors

Edit the `:root` variables:

```css
:root {
  --color-primary: #0066CC;        /* Change to your brand color */
  --color-secondary: #E6F0FF;      /* Light variant */
  --color-accent: #FFE600;         /* Highlight color */
  --color-dark-bg: #001A4D;        /* Dark background */
  --color-text-dark: #1a1a1a;      /* Text color */
}
```

### Step 3: Customize Typography

```css
h1 {
  font-size: 48px;                 /* Change heading size */
  color: var(--color-primary);     /* Use custom color */
  font-family: 'Arial', sans-serif; /* Change font */
}
```

### Step 4: Use Custom Theme

```bash
marp-convert.sh slides.md pdf my-custom-theme.css
```

## Common Customizations

### Change All Heading Colors

```css
h1, h2, h3, h4, h5, h6 {
  color: var(--color-primary);
}
```

### Add Custom Fonts

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

:root {
  --font-primary: 'Your Font', sans-serif;
}
```

### Customize Slide Layouts

```css
/* Make slides wider */
section {
  width: 1280px;  /* instead of 960px */
  height: 720px;  /* instead of 540px */
}

/* Add padding to all slides */
section {
  padding: 80px;  /* increased from 60px */
}
```

### Style Tables

```css
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: var(--color-primary);
  color: white;
  padding: 15px;
}

td {
  padding: 12px;
  border: 1px solid #ddd;
}
```

### Customize Code Blocks

```css
code {
  background: var(--color-light-bg);
  color: var(--color-error);
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

pre {
  background: var(--color-dark-bg);
  color: var(--color-text-light);
  padding: 20px;
  border-radius: 8px;
  overflow: auto;
}
```

## Advanced: CSS Classes

### Create Custom Slide Types

Add new CSS classes for special slide styling:

```css
/* Centered content slide */
section.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* Two-column layout */
section.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

/* Image-focused slide */
section.image-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}

section.image-slide img {
  max-width: 100%;
  max-height: 100%;
}
```

### Use Custom Classes in Markdown

```markdown
---
class: center
---

# Centered Title

Using the `.center` class

---

---
class: two-columns
---

## Left Column

Content here

## Right Column

Content here
```

## Color Palette Ideas

### Modern Blue
```css
--color-primary: #0066CC;
--color-secondary: #E6F0FF;
--color-accent: #FFB800;
```

### Tech Green
```css
--color-primary: #00A86B;
--color-secondary: #E8F5E9;
--color-accent: #FF5722;
```

### Corporate Purple
```css
--color-primary: #6B46C1;
--color-secondary: #F3E8FF;
--color-accent: #EC4899;
```

### Minimalist Dark
```css
--color-primary: #FFFFFF;
--color-secondary: #E5E5E5;
--color-dark-bg: #000000;
--color-text-dark: #FFFFFF;
```

## Gradient Patterns

### Hero Gradient
```css
--gradient-primary: linear-gradient(135deg, #FF0095, #FFCDFF);
```

### Subtle Gradient
```css
--gradient-primary: linear-gradient(90deg, #667eea, #764ba2);
```

### Rainbow Gradient
```css
--gradient-primary: linear-gradient(45deg,
  #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF);
```

### Apply Gradients
```css
/* Background gradient */
section.hero {
  background: var(--gradient-primary);
}

/* Text gradient */
h1 {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Border gradient */
.highlight {
  border: 3px solid;
  border-image: var(--gradient-primary) 1;
}
```

## Responsive Design

Make themes work on different screen sizes:

```css
@media (max-width: 1200px) {
  section {
    font-size: 20px;
    padding: 40px;
  }

  h1 {
    font-size: 36px;
  }
}

@media (max-width: 768px) {
  section {
    font-size: 16px;
    padding: 30px;
  }

  h1 {
    font-size: 28px;
  }

  section.two-columns {
    grid-template-columns: 1fr;
  }
}
```

## Testing Your Theme

### Generate Sample Slides

Create a test Markdown file:

```markdown
---
marp: true
theme: my-custom-theme.css
---

# Title Slide

Subtitle here

---

## Content Slide

- Bullet 1
- Bullet 2
- Bullet 3

---

> Important quote

---

\`\`\`javascript
const agent = new MarpAgent();
agent.generateSlides(data);
\`\`\`

---

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

### Convert & Preview

```bash
marp-convert.sh test-slides.md html my-custom-theme.css
open test-slides.html
```

## Full Custom Theme Example

```css
/* Custom Theme: StartupBlue */

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

:root {
  --color-primary: #0EA5E9;    /* Bright blue */
  --color-secondary: #06B6D4;  /* Cyan */
  --color-accent: #FBBF24;     /* Amber */
  --color-dark-bg: #0F172A;    /* Navy */
  --color-light-bg: #F0F9FF;   /* Light blue */
  --color-text-dark: #1E293B;  /* Dark slate */
  --color-text-light: #E2E8F0; /* Light slate */
  
  --font-primary: 'Poppins', sans-serif;
  --gradient-primary: linear-gradient(135deg, #0EA5E9, #06B6D4);
}

section {
  background: white;
  width: 960px;
  height: 540px;
  padding: 60px;
  font-size: 28px;
  font-family: var(--font-primary);
  color: var(--color-text-dark);
}

section.title {
  background: var(--color-dark-bg);
  color: white;
}

h1 {
  font-size: 48px;
  color: var(--color-primary);
  font-weight: 700;
}

h2 {
  font-size: 40px;
  color: var(--color-secondary);
  font-weight: 600;
}

a {
  color: var(--color-primary);
  text-decoration: underline;
}

code {
  background: var(--color-light-bg);
  color: var(--color-primary);
  padding: 4px 8px;
  border-radius: 4px;
}

pre {
  background: var(--color-dark-bg);
  color: var(--color-text-light);
  padding: 20px;
  border-radius: 8px;
}

/* ... more styles ... */
```

## Best Practices

✅ **Do:**
- Use CSS variables for easy color changes
- Test on multiple slide types
- Keep font sizes readable
- Use consistent spacing
- Test in light and dark backgrounds

❌ **Don't:**
- Use gradients on body text (readability)
- Mix too many fonts (max 2 families)
- Make slides too busy
- Use colors that clash with text
- Assume all screens are the same size

## Resources

- **MDN CSS Guide**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **Color Palette Generators**: https://coolors.co, https://colorhexa.com
- **Font Libraries**: https://fonts.google.com, https://fontsquirrel.com
- **Official MARP Themes**: https://github.com/marp-team/marp-core/tree/main/themes
