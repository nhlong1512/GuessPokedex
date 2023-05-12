//Pokemons includes the list of pokemons
export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  moves: {
    move: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
}

export interface PokeMonStats {
  base_stat: number;
  name: string;
}

export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
  }[];
}

export interface PokemonType {
  name: string;
  color: string;
}

export const pokemonTypes: PokemonType[] = [
  {
    name: "bug",
    color: "#a7b723",
  },
  {
    name: "dark",
    color: "#75574c",
  },
  {
    name: "dragon",
    color: "#703ff",
  },
  {
    name: "eletric",
    color: "#f9cf30",
  },
  {
    name: "fairy",
    color: "#e69eac",
  },
  {
    name: "fighting",
    color: "#c12239",
  },
  {
    name: "fire",
    color: "#f57d31",
  },
  {
    name: "flying",
    color: "#a891ec",
  },
  {
    name: "ghost",
    color: "#70559b",
  },
  {
    name: "normal",
    color: "#aaa67f",
  },
  {
    name: "grass",
    color: "#74cb48",
  },
  {
    name: "ground",
    color: "#dec16b",
  },
  {
    name: "ice",
    color: "#9ad6df",
  },
  {
    name: "poison",
    color: "#a43e9e",
  },
  {
    name: "psychic",
    color: "#fb5584",
  },
  {
    name: "rock",
    color: "#b69e31",
  },
  {
    name: "steel",
    color: "#b7b9d0",
  },
  {
    name: "water",
    color: "#6493eb",
  },
];
