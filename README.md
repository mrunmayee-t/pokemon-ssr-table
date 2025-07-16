## 📛 Project Title

# Pokémon SSR Table - PokéAPI with Next.js

This is a React application using **Next.js** to implement **Server-Side Rendering (SSR)** with data from the [PokéAPI](https://pokeapi.co/). It displays a **paginated**, **filterable table** of Pokémon. Clicking a row opens a **modal** with detailed information about the selected Pokémon. The second paginated table of evolution triggers is also included.

---

## 📝 Project Description

A React application built with Next.js for server-side rendering (SSR) that displays a paginated and filterable table of Pokémon fetched from the PokéAPI. Clicking a Pokémon row opens a modal with detailed information and second paginated table showing evolution triggers.

---

## 🚀 Features

- Server-side rendered Pokémon list (via getServerSideProps)
- Pagination for the main Pokémon table
- Filtering by exact Pokémon name (also SSR)
- Modal with Pokémon details (fetched on-demand)
- Paginated evolution trigger table (not linked to selected Pokémon and used #TanStack Pagination)

---

## 🛠️ Tech Stack

- React
- Next.js (SSR)
- TanStack Table (for table rendering and pagination)
- PokéAPI (https://pokeapi.co/)
- Tailwind CSS / CSS Modules (or your chosen styling method)

---

## 📦 Installation

-git clone https://github.com/mrunmayee-t/pokemon-ssr-table.git
-cd pokemon-ssr-table
-npm install

---

## 🧪 Running Locally

npm run dev

---

## ⚙️ Project Structure

/pages/
└── index.tsx → Main page with Pokémon table
/components/
├── PokemonTable.tsx → SSR Pokémon table with pagination and filter
├── PokemonModal.tsx → Modal with Pokémon details
└── EvolutionTable.tsx → Evolution trigger table
/services/
├── pokemonAPI.ts → APIs to get the list of all Pokémon and to get the details of searched Pokémon
├── evolutionTriggerAPI.ts → API to get Evolution Triggers
/styles/
├── global.css → contains the global css
├── variable.css → defines the colors used
/types/
├── pokemon.ts → definition of types and interfaces used

---

## 📋 Assumptions & Notes

-Filtering is done server-side by exact Pokémon name using api/v2/pokemon/{name}
-Evolution trigger data is fetched separately and not tied to selected Pokémon
-No global state management used (basic local state and props only)

---
