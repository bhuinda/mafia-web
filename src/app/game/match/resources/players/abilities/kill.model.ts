export class AbilityAttack {
  #name = "Attack";
  #description = "At night, attack a player.";
  #isCommitted = false;
  #target = null;

  #useCommit = `You decide to attack ${this.#target}.`;
  #useUncommit = `You decide not to attack ${this.#target}.`;

  get info() {
    return [this.#name, this.#description];
  }

  get use() {
    this.#isCommitted = !this.#isCommitted;
    return this.#isCommitted ? this.#useCommit : this.#useUncommit;
  }

  get onNightEnd() {
    if (this.#isCommitted) {
      this.#isCommitted = false;
      return `You attacked ${this.#target}.`;
    }

    return null;
  }
}
