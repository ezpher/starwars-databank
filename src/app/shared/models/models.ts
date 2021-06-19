
export enum UrlsProperty {
  characters = "characters",
  people = "people",
  pilots = "pilots",
  residents = "residents",
  films = "films",
  starships = "starships",
  vehicles = "vehicles",
  species = "species",
  planets = "planets",
  homeworld = "homeworld"
}

export enum HiddenFields {
  created = 'created',
  edited = 'edited',
  url = 'url',
  episode_id = 'episode_id'
}

export enum ItemNameType {
  name = 'name',
  title = 'title'
}

export enum Category {
  People = 'people',
  Films = 'films',
  Starships = 'starships',
  Vehicles = 'vehicles',
  Species = 'species',
  Planets = 'planets',
}

export interface List<T extends Item> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
  
export interface Item extends Person, Film, Species, Starship, Vehicle, Planet {}

export interface Person {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string[]|string;  
  films: string[]|string;    
  species: string[]|string;  
  starships: string[]|string;
  vehicles: string[]|string; 
  url: string;
}

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  species: string[]|string;  
  starships: string[]|string; 
  characters: string[]|string;
  planets: string[]|string;  
  vehicles: string[]|string; 
  url: string;
}

export interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string;
  homeworld: string[]|string;
  people: string[]|string;
  films: string[]|string;
}

export interface Starship {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  films: string[]|string;
  pilots: string[]|string;
}

export interface Vehicle {
  name: string;
  model: string;
  vehicle_class: string;
  manufacturer: string;
  length: string;
  cost_in_credits: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  cargo_capacity: string;
  consumables: string;
  films: string[]|string;
  pilots: string[]|string;
  url: string;
}

export interface Planet {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[]|string;
  films: string[]|string;
  url: string;
}
