# Overview

MBTILove is a comprehensive personality compatibility web application that helps users discover romantic compatibility through MBTI (Myers-Briggs Type Indicator) personality types. The platform provides detailed compatibility analysis, dating style guidance, ideal type matching, personality rankings, conversation tools, and interactive balance games. Built as a full-stack TypeScript application with a React frontend and Express backend, it features multi-language support (English, Japanese, Korean) and focuses on providing scientifically-based relationship insights.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with a simple, declarative approach
- **UI Components**: Shadcn/ui component library built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: TanStack React Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation schemas
- **Internationalization**: Custom language context provider supporting English, Japanese, and Korean

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: TSX for TypeScript execution in development
- **Build Process**: ESBuild for server bundling and Vite for client bundling
- **Storage Interface**: Abstracted storage layer with in-memory implementation (ready for database integration)

## Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect configuration
- **Schema Management**: Centralized schema definitions in shared directory
- **Migrations**: Drizzle Kit for database migrations and schema management
- **Current Implementation**: In-memory storage with database-ready interface

## Component Structure
- **Layout Components**: Header with navigation and language switcher, Footer with site links
- **UI Components**: Comprehensive Shadcn/ui component library including forms, dialogs, cards, and interactive elements
- **Page Components**: Dedicated pages for compatibility analysis, dating styles, ideal types, rankings, conversations, and balance games
- **Utility Components**: Language switcher, AdSense banner placeholders, and responsive navigation

## Development Environment
- **Hot Reload**: Vite development server with HMR support
- **Error Handling**: Runtime error overlay for development debugging
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Path Aliases**: Configured aliases for clean imports (@/, @shared/, @assets/)

# External Dependencies

## Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connector for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and data fetching
- **wouter**: Lightweight client-side routing
- **react-hook-form**: Form state management and validation

## UI and Styling
- **@radix-ui/***: Accessible UI primitives for component foundation
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant management for components
- **clsx**: Utility for conditional className concatenation

## Development Tools
- **vite**: Frontend build tool and development server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds
- **drizzle-kit**: Database schema management and migrations

## Potential Integrations
- **Google AdSense**: Advertisement integration (placeholder components ready)
- **External MBTI Tests**: Links to official MBTI testing platforms
- **Analytics**: Google Analytics integration capability
- **Email Services**: Contact form backend integration ready