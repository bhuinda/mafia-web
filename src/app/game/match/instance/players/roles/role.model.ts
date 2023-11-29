interface RoleProfile {
  readonly name: string;
  readonly description: string;
  readonly alignment: string;
  readonly faction: string; // Should be overriden by SK, MM, arson, cult, etc.; faction determines goal, e.g. Executioner: "Survive to see your target get lynched."
  readonly ability: string;
}

interface RoleOptions {
  // Role list considerations
  readonly isUnique?: boolean;
  readonly randomTypeExclusions?: string[];

  // Role mechanics
  readonly isImmuneToAttack?: boolean;
  readonly isImmuneToDetection?: boolean;
  readonly isImmuneToRoleblock?: boolean;
}

export abstract class Role {
  roleProfile: RoleProfile;
  roleOptions: RoleOptions;

  constructor(
    roleProfile: RoleProfile,
    roleOptions: RoleOptions = {
      isImmuneToAttack: false,
      isImmuneToDetection: false,
      isImmuneToRoleblock: false,
      randomTypeExclusions: []
    }
  ) {
    this.roleProfile = roleProfile;
    this.roleOptions = roleOptions;
  }

  get profile() {
    return {
      name: this.roleProfile.name,
      description: this.roleProfile.description,
      alignment: this.roleProfile.alignment,
      faction: this.roleProfile.faction,
      ability: this.roleProfile.ability,
    }
  }

  get options() {
    return {

    }
  }
}
