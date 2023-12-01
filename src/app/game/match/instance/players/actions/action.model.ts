export abstract class Action {
  name: string;
  description: string;

  commitMessage: string;
  uncommitMessage: string;
  isCommitted = false;

  constructor(
    name: string,
    description: string,
    commitMessage: string,
    uncommitMessage: string
    ){
    this.name = name;
    this.description = description;
    this.commitMessage = commitMessage;
    this.uncommitMessage = uncommitMessage;
  }
}
