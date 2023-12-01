export class AbilityAttack {
  name = "Attack";
  description = "At night, attack a player.";
  #isCommitted = false;
  #target = null;

  useCommit = `You decide to attack ${this.#target}.`;
  useUncommit = `You decide not to attack ${this.#target}.`;

  get onNightEnd() {
    if (this.#isCommitted) {
      this.#isCommitted = false;
      return `You attacked ${this.#target}.`;
    }

    return null;
  }
}
