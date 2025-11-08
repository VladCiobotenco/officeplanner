# OfficePlanner AI Agent Instructions

## Project Overview
OfficePlanner is a React-based web application bootstrapped with Create React App. It follows standard React patterns and conventions with a focus on modern React features.

## Project Structure
- `/src`: Main source code directory
  - `App.js`: Main application component and routing setup
  - `index.js`: Application entry point
  - `/components`: React components (create when needed)
  - `/styles`: CSS modules and styling files

## Development Workflow
1. Start development server:
```bash
npm start
```
2. Run tests in watch mode:
```bash
npm test
```
3. Build for production:
```bash
npm run build
```

## Key Dependencies
- React 19.2.0
- Testing Libraries:
  - @testing-library/react
  - @testing-library/jest-dom
  - @testing-library/user-event

## Conventions
1. Use functional components with hooks (no class components)
2. CSS modules for component styling
3. Testing:
   - Jest as test runner
   - React Testing Library for component testing
   - Test files should be co-located with components (`*.test.js`)

## Common Tasks
- Component creation: Place new components in `/src/components`
- Styling: Use CSS modules with component name (e.g., `ComponentName.module.css`)
- Testing: Write tests in `ComponentName.test.js` next to the component

## Project Configuration
- ESLint extends react-app and react-app/jest configurations
- Browserslist config is specified in package.json
- Environment-specific settings can be added via `.env` files