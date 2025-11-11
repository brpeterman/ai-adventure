/**
 * Details about the player character
 */
export interface GameState {
  player: Player;
  map: GameMap;
}
/**
 * Information about the state of the player character
 */
export interface Player {
  location: MapCoordinates;
  stats: PlayerStats;
  inventory: PlayerInventory;
}
/**
 * Location on a coordinate plane corresponding to a place on the game map.
 */
export interface MapCoordinates {
  /**
   * Horizontal location on the game map. Lower numbers are more to the west than higher numbers.
   */
  x: number;
  /**
   * Vertical location on the game map. Lower numbers are more to the south than higher numbers.
   */
  y: number;
}
/**
 * Attributes of the character that represent the degree to which the player can interact with the world.
 */
export interface PlayerStats {
  /**
   * The player's current rating of health. If this number reaches 0 or below, the player dies.
   */
  healthPoints: number;
  /**
   * The player's maximum number of health points. The value of healthPoints may never exceed this value.
   */
  maximumHealthPoints: number;
  /**
   * The player's raw physical strength. 10 is average.
   */
  strength: number;
  /**
   * A number rating player's intellect. 10 is average.
   */
  intellect: number;
  /**
   * A number rating the player's ability to withstand harm. 10 is average.
   */
  fortitude: number;
}
export interface GameMap {
  /**
   * Set of revealed locations on the game map.
   */
  locations: Location[]
}
export interface Location {
  coords: MapCoordinates;

  /**
   * Text description of the location in plain, unstructured text.
   */
  description: string;
}

export interface PlayerInventory {
  /**
   * List of items the player is currently carrying.
   */
  items: InventoryItem[];
}

export interface InventoryItem {
  /**
   * Name of the item.
   */
  name: string;
  /**
   * Description of the item in plain, unstructured text.
   */
  description: string;
  /**
   * Number of the item currently held.
   */
  quantity: number;
}