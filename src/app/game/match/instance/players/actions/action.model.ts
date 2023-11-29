export abstract class Action {
  #name: string;
  #description: string;

  #commitMessage: string;
  #uncommitMessage: string;
  #isCommitted = false;

  constructor(
    name: string,
    description: string,
    commitMessage: string,
    uncommitMessage: string
    ){
    this.#name = name;
    this.#description = description;
    this.#commitMessage = commitMessage;
    this.#uncommitMessage = uncommitMessage;
  }

  get name() {
    return this.#name;
  }

  get description() {
    return this.#description;
  }

  get use() {
    this.#isCommitted = !this.#isCommitted;
    return this.#isCommitted ? this.#commitMessage : this.#uncommitMessage;
  }
}
