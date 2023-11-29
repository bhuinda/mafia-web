export abstract class Action {
  #name: string;
  #description: string;
  #isCommitted: boolean;

  constructor(name: string, description: string) {
    this.#name = name;
    this.#description = description;
    this.#isCommitted = false;
  }

  get info() {
    return [this.#name, this.#description];
  }

  get use() {
    this.#isCommitted = !this.#isCommitted;
    return this.#isCommitted ? this.#commitMessage : this.#uncommitMessage;
  }
}
