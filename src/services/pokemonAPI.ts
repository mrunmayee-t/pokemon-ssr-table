const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

//to get th list of all Pokémons
export const getPokemonList = async (offset = 0, limit = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}/?limit=${limit}&offset=${offset}`,
    );
    if (!response.ok) throw new Error("Failed to fetch Pokémon List");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return null;
  }
};

//to get the searched Pokémon
export const getPokemonByName = async (name: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${name}`);
    if (!response.ok) throw new Error(`Pokémon with name ${name} not found`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return null;
  }
};
