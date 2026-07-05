# 🌀 Contributing to theuselessweb.wtf

Welcome! We're thrilled you want to contribute to the internet's most useless project. Follow these steps to add your creation to the void.

## 🚀 Adding Your Useless Site

### 1. Create Your Site
- Navigate to `public/submissions/`.
- Create a new directory named after your project (e.g., `my-cool-useless-app`).
- Add an `index.html` and any required `style.css` or `app.js` files.
- **Pro Tip:** Use the `_template` folder as a starting point.

### 2. Register Your Creation
Open `src/data/registry.json` and add a new entry to the array:

```json
{
  "slug": "my-cool-useless-app",
  "type": "internal",
  "title": "My Cool Useless App",
  "author": "your_username",
  "github": "your-github-username",
  "path": "/submissions/my-cool-useless-app/index.html",
  "tags": ["interactive", "visual"],
  "weight": 3
}
```

### 3. Requirements
- **Isolation:** Your site will be inside an `<iframe>`. Don't try to navigate the top-level window.
- **Weight:** Keep it light. Internal submissions are favored in the shuffle!
- **Chaos:** Ensure it is sufficiently useless.

## 🛠️ Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your changes.

## ⚖️ License
By contributing, you agree that your code will be licensed under the MIT License. Keep it weird!
