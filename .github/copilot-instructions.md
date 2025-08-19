# Copilot Instructions for AI Coding Agents

## Project Overview
- This is a React frontend bootstrapped with Create React App.
- The main app entry is `src/App.js`. All major UI components are under `src/Componets/` (note the spelling).
- Each feature (e.g., Auth, Dashboard, Profile) is organized in its own subfolder with separate `.jsx` and `.css` files.
- The project uses functional React components and CSS modules for styling.

## Key Conventions & Patterns
- **Component Structure:**
  - Each component has its own folder with matching `.jsx` and `.css` files (e.g., `ProfileHeader.jsx` and `ProfileHeader.css`).
  - Use PascalCase for component and file names.
  - Group related UI and logic together in the same folder.
- **Routing & State:**
  - Routing and global state management are not present in the base template; add them explicitly if needed.
- **Imports:**
  - Use relative imports for components (e.g., `import ProfileHeader from '../ProfileHeader/ProfileHeader'`).
- **Styling:**
  - Use the component's dedicated `.css` file for styles. Avoid global styles except in `App.css` and `index.css`.

## Developer Workflows
- **Start Dev Server:** `npm start` (runs on http://localhost:3000)
- **Run Tests:** `npm test` (Jest, interactive watch mode)
- **Build for Production:** `npm run build` (outputs to `build/`)
- **Eject (advanced):** `npm run eject` (irreversible, exposes config)

## Integration Points
- **Assets:** Place static assets in `public/`.
- **External APIs:** No API integration is present by default; add API logic in new files under `src/` or feature folders.
- **No backend code** is present in this repo.

## Project-Specific Notes
- The `Componets` folder is intentionally misspelled; maintain this for consistency.
- Use only `.jsx` for React components, not `.js`.
- Do not introduce new top-level folders without clear justification.

## Examples
- To add a new feature, create a folder under `src/Componets/FeatureName/` with `FeatureName.jsx` and `FeatureName.css`.
- To update the UI, edit the relevant `.jsx` and `.css` files in the corresponding component folder.

## References
- See `README.md` for standard Create React App scripts and documentation links.
- Key entry points: `src/App.js`, `src/index.js`, `public/index.html`.
