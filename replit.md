# Overview

This is a marketplace/social commerce application built with React, Vite, and TypeScript. It features a complete design system using Radix UI components and Tailwind CSS. The application supports user authentication, product browsing, order management, and social features like notifications and user profiles. It includes both guest and authenticated user modes.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Build Tool**
- React 18 with Vite 6 for fast development and optimized production builds
- TypeScript for type safety and improved developer experience
- SWC plugin for fast compilation

**Routing System**
- Custom context-based router implementation (`AppRouter.tsx`)
- Supports multiple user states: unauthenticated, guest mode, and authenticated
- Route types include: login, register, home, product, notifications, profile, orders, checkout, forgot-password, reset-password
- Navigation handled through context API with route parameters support

**State Management**
- React Context API for global state (authentication, user data, routing)
- Local component state using React hooks
- No external state management library (Redux, Zustand, etc.)

**Authentication Flow**
- Three user states: unauthenticated (requires login/register), guest mode (limited access), authenticated (full access)
- Email confirmation workflow for registration and password reset
- Modal-based registration for guests attempting restricted actions
- Session persistence managed through router context

**UI Component Architecture**
- Comprehensive design system based on Radix UI primitives
- Shadcn/ui component patterns with custom styling
- Dark mode support via `next-themes`
- Custom CSS variables for theming in `globals.css`
- Utility-first styling with Tailwind CSS v4

**Page Structure**
- 10 main pages: Login, Register, Home (feed), Product Detail, Notifications, Profile, Order History, Checkout, Forgot Password, Reset Password
- Shared Header component with search, theme toggle, and user menu
- Mobile-responsive design with dedicated mobile menu component
- Modal/dialog-based interactions for order details and guest registration

**Design System**
- Custom color palette with primary (#FF6A00), accent, and semantic colors
- Typography scale using Inter and Poppins fonts
- Consistent spacing and border radius (12px default)
- 45+ UI components from Radix UI including dialogs, dropdowns, forms, charts, and more

## External Dependencies

**UI Component Libraries**
- @radix-ui/* (v1.x-2.x): Comprehensive set of accessible UI primitives including accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, navigation-menu, popover, select, slider, switch, tabs, tooltip, and more
- lucide-react (v0.487.0): Icon library for consistent iconography
- class-variance-authority (v0.7.1): Utility for managing component variants
- cmdk (v1.1.1): Command palette component
- embla-carousel-react (v8.6.0): Carousel/slider functionality
- recharts (v2.15.2): Charting library for data visualization

**Form Management**
- react-hook-form (v7.55.0): Form state management and validation
- react-day-picker (v8.10.1): Date picker component
- input-otp (v1.4.2): OTP input component

**Styling & Theming**
- tailwindcss v4 (@tailwindcss/postcss v4.1.14): Utility-first CSS framework
- autoprefixer (v10.4.21): CSS vendor prefixing
- next-themes (v0.4.6): Theme switching (light/dark mode)

**UI Enhancement**
- sonner (v2.0.3): Toast notifications
- vaul (v1.1.2): Drawer/sheet component
- react-resizable-panels (v2.1.7): Resizable panel layouts

**Development Dependencies**
- @vitejs/plugin-react-swc: Fast React refresh with SWC
- TypeScript with strict mode enabled
- Path aliases configured (@/* maps to ./src/*)

**Third-party Integrations**
- Unsplash: Image assets (per attribution file)
- Google Fonts: Inter and Poppins font families
- No backend API integration in current implementation (mock data used throughout)
- No database connection (client-side only application)
- No payment gateway integration (checkout flow is UI-only)

**Notable Architecture Decisions**
- Client-side only application with no server/API layer
- Mock data used for demonstrations (posts, orders, notifications, user profiles)
- Image fallback handling for broken/missing images
- Vietnamese language UI (localized for Vietnamese market)
- No persistent storage - state resets on page refresh