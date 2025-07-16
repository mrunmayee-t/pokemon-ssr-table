## 📛 Project Title

# Pokémon SSR Table - PokéAPI with Next.js

## 📝 Project Description

This is a React application using **Next.js** to implement **Server-Side Rendering (SSR)** with data from the [PokéAPI](https://pokeapi.co/). It displays a **paginated**, **filterable table** of Pokémon. Clicking a row opens a **modal** with detailed information about the selected Pokémon. The second paginated table of evolution triggers is also included.

---

## 🚀 Features

- Server-side rendered Pokémon list (via getServerSideProps)
- Pagination for the main Pokémon table
- Filtering by exact Pokémon name (also SSR)
- Modal with Pokémon details (fetched on-demand)
- Paginated evolution trigger table (not linked to selected Pokémon and used TanStack Pagination)

---

## 🛠️ Tech Stack

- React
- Next.js (SSR)
- TanStack Table (for table rendering and pagination)
- PokéAPI (https://pokeapi.co/)
- Tailwind CSS

---

## 📦 Installation

- git clone https://github.com/mrunmayee-t/pokemon-ssr-table.git
- cd pokemon-ssr-table
- npm install

---

## 🧪 Running Locally

npm run dev

---

## ⚙️ Project Structure

```plaintext
/project-root
├── pages/
│   └── index.tsx                  # Main page with Pokémon table
│
├── components/
│   ├── PokemonTable.tsx          # SSR Pokémon table with pagination and filter
│   ├── PokemonModal.tsx          # Modal with Pokémon details
│   └── EvolutionTable.tsx        # Evolution trigger table
│
├── services/
│   ├── pokemonAPI.ts             # APIs to get Pokémon list and details
│   └── evolutionTriggerAPI.ts    # API to get Evolution Triggers
│
├── styles/
│   ├── global.css                # Global CSS styles
│   └── variable.css              # Color definitions
│
├── types/
│   └── pokemon.ts                # TypeScript interfaces and types

```

---

## 📋 Assumptions & Notes

- Filtering is done server-side by exact Pokémon name using **api/v2/pokemon/{name}**
- Evolution trigger data is fetched separately and not tied to selected Pokémon
- No global state management used (basic local state and props only)

---

## 🚀 Live Demo
The application is deployed and can be accessed here:

[🔗 View Live on Vercel](https://pokemon-ssr-table.vercel.app/)

---

## 🧠 If I Had More Time
If given more time, I would consider:

- 🔄 Adding client-side caching (React Query or SWR)

- 🔍 Fuzzy search with local filter fallback

- 🧪 Unit, integration and E2E tests (Jest + React Testing Library+Playwright)

- 🧭 Better error handling and loading states (spinner or "Loading..." message)

- 📱 Full responsive and accessible UI

