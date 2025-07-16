export interface ResultDetails {
  name: string;
  url: string;
}

export interface PokemonDetails {
  name: string;
  url: string;
}

export interface PokemonModalDetails {
  //abilitites: [],
  baseExperience: string;
  weight: string;
  height: string;
  order: string;
  name: string;
}

export type PokemonTableProps = {
  pokemons?: PokemonDetails[];
  count?: number;
  page?: number;
  evolutionTriggers?: PokemonDetails[];
};
