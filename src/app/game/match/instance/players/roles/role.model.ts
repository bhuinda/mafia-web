import { RoleProfile } from './role-profile.model';
import { RoleOptions } from './role-options.model';

export abstract class Role {
  readonly name: string;
  readonly description: string;
  readonly alignment: string;
  readonly faction: string; // Should be overriden by SK, MM, arson, cult, etc.; faction determines goal, e.g. Executioner: "Survive to see your target get lynched."
  readonly ability: string;
  readonly traits: string[];

  constructor(
    roleProfile: RoleProfile,
    roleOptions: RoleOptions = {
      isUnique: false,
      randomTypeExclusions: [],
    }
  ) {
    this.name = roleProfile.name;
    this.description = roleProfile.description;
    this.alignment = roleProfile.alignment;
    this.faction = roleProfile.faction;
    this.ability = roleProfile.ability;
    this.traits = roleOptions.traits ? roleOptions.traits : roleProfile.traits;
  }
}
