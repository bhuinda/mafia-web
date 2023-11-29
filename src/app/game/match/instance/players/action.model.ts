import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export abstract class Action {
  #name: string;
  #description: string;
  #isCommitted: boolean;
  #commitMessage: string;
  #uncommitMessage: string;

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
    this.#isCommitted = false;
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
