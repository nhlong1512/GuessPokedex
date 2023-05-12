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
  stats: {
    stat: {
      base_stat: number;
      name: string;
    };
  }[];
  types: {
    name: string;
  }[];
}

export interface PokeMonStats {
  base_stat: number;
  name: string;
}
