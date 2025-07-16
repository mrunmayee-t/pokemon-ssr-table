
import { Geist, Geist_Mono } from "next/font/google";
import PokemonTable from "@/components/PokemonTable";
import { GetServerSideProps } from "next";
import {  PokemonTableProps } from "@/types/pokemon";
import { getPokemonByName, getPokemonList } from "@/services/pokemonAPI";
import { getEvolutionTriggers } from "@/services/evolutionTriggerAPI";
import PokemonEvolutionTrigger from "@/components/PokemonEvolutionTrigger";
import "../assets/images/bg.jpg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const getServerSideProps: GetServerSideProps<PokemonTableProps> = async (
  context,
) => {
  // Get the page number from query, default to 1 if not present or invalid
  const name = context.query.name?.toString() || null;
  const limit = 20;
  const page = parseInt((context.query.page as string) || "1");
  const offset = (page - 1) * limit;

  // Fetch the Pokemon list (assuming getPokemonList returns a Promise)
  // Fetch evolution triggers
  const evoRes = await getEvolutionTriggers();
  const evolutionTriggers = evoRes?.results ?? [];

  if (name) {
    try {
      const data = await getPokemonByName(name.toLocaleLowerCase());
      return {
        props: {
          pokemons: [data],
          count: 1,
          page: 1,
          evolutionTriggers,
        },
      };
    } catch (err) {
      throw new Error(`No Pokémon found with name "${name}"`);
    }
  } else {
    try {
      const data = await getPokemonList(offset, limit);
      return {
        props: {
          pokemons: data?.results ?? [],
          count: data.count, // For total page calculation
          page,
          filter: "",
          evolutionTriggers,
        },
      };
    } catch (error) {
      throw new Error(
        "Error fetching Pokémon list: " +
          (error instanceof Error ? error.message : String(error)),
      );
    }
  }
};

export default function Home({
  pokemons,
  count,
  page,
  evolutionTriggers,
}: PokemonTableProps) {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-[url('../assets/images/bg.jpg')] bg-center bg-black/50 bg-blend-overlay`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <PokemonTable
          pokemons={pokemons}
          count={count}
          page={page}
          
        />
        <PokemonEvolutionTrigger evolutionTriggers={evolutionTriggers} />
      </main>
    </div>
  );
}
