export interface RoleProfile {
  name: string;
  description: string;
  alignment: string;
  faction: string; // Should be overriden by SK, MM, arson, cult, etc.; faction determines goal, e.g. Executioner: "Survive to see your target get lynched."
  ability: string;
  traits: string[];
}
