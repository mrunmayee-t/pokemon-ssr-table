const BASE_URL = "https://pokeapi.co/api/v2/evolution-trigger";

//to get the list of Evolution Triggers
export const getEvolutionTriggers = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) throw new Error(`Evolution trigger not found`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching evolution trigger:", error);
    return null;
  }
};
