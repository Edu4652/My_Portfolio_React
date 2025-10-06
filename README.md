# 🌐 Personal Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red?style=flat-square)](./LICENSE)

> **⚠️ Notice**: This repository is for viewing purposes only. See [LICENSE](./LICENSE) for usage terms.

Professional portfolio built with modern web technologies. Features advanced animations, WebGL particle effects, and a fully responsive design.

## ✨ Key Features

### 🎨 Design & UX
- **Atomic Design** - Scalable component architecture
- **Responsive** - Optimized for all devices
- **Smooth Animations** - Transitions with Framer Motion
- **WebGL Effects** - Fluid simulation and particle systems

### ⚡ Performance
- **Next.js 15** with Turbopack for ultra-fast builds
- **React 19** with concurrent features
- **Code Splitting** - Lazy loading of components
- **Image Optimization** - Automatic AVIF/WebP conversion

### 🌍 Internationalization
- **Multi-language Support** - EN, ES, FR, PT, CA
- **Dynamic Switching** - Seamless language transitions
- **Type-safe** - Translations with type validation

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 15.5 (App Router)
- **UI**: React 19.1
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4

### Animations & Effects
- **Framer Motion** 12
- **React Spring**
- **WebGL** - Custom simulation
- **Lottie** - Vector animations

### Tools
- **next-intl** - Internationalization
- **Lucide React** - Icon system
- **EmailJS** - Contact form
- **Biome** - Linting & Formatting

## 📂 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── [locale]/         # Internationalized routes
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/           # Components (Atomic Design)
│   ├── atoms/            # Basic blocks
│   ├── molecules/        # Compositions
│   ├── organisms/        # Complex sections
│   └── templates/        # Page layouts
├── hooks/                # Custom React Hooks
├── lib/                  # Utilities
├── services/             # External services
├── types/                # TypeScript definitions
└── data/                 # Content

messages/                 # i18n translations
├── en.json
├── es.json
├── fr.json
├── pt.json
└── ca.json
```

## 🎯 Technical Features

### Atomic Design
Components organized following Brad Frost's methodology:
- **Atoms**: Basic UI elements (Button, Badge, Icon)
- **Molecules**: Simple combinations (ProjectCard, SkillCard)
- **Organisms**: Complex sections (Header, HeroSection)
- **Templates**: Page layouts (MainLayout, Footer)

### Type-Safety
- Strict TypeScript configuration
- Readonly interfaces for immutability
- Zod runtime validation
- Type inference throughout the application

### Performance Optimizations
- Dynamic imports with React.lazy
- Suspense boundaries for code splitting
- Image optimization with Next.js Image
- Memoization with React.memo and useMemo

## 🔒 Environment Variables

This project uses environment variables for all personal information. See `env.example` for required variables.

**Note**: The `.env.local` file is not included and must be created separately with your credentials.

## 📊 Performance Metrics

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.2s
- **Time to Interactive**: < 2.5s
- **Bundle Size**: < 300KB (gzipped)

## 🚫 Usage Restrictions

This code is **proprietary and confidential**. It is provided for **viewing purposes only**.

**You may NOT**:
- Use this code for your own portfolio
- Deploy this code to any hosting service
- Create derivative works
- Use for commercial purposes
- Distribute or sell this code

See [LICENSE](./LICENSE) for full terms.

## 📧 Contact

For inquiries: efreitasc.dev@gmail.com

---

**© 2025 Eduard Freitas Coelho. All Rights Reserved.**

*This portfolio showcases modern web development techniques and is protected by copyright.*