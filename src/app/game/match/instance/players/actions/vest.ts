import { Action } from "./action.model";

export class ActionVest extends Action {
  uses = 1;

  useCommit = "You equip a vest.";
  useUncommit = "You unequip your vest.";
  usesLeft = `You have ${this.uses} vest use${this.uses > 1 ? 's' : ''} left.`;
  usesNone = "You are out of vests.";

  nightNotification() {
    return this.uses > 0 ? this.usesLeft : this.usesNone;
  }

  // override get use() {
  //   this.isCommitted = !this.isCommitted;
  //   return this.isCommitted ? this.useCommit : this.useUncommit;
  // }

  get onNightStart() {
    return this.nightNotification();
  }

  get onNightEnd() {
    if (this.isCommitted) {
      this.uses -= 1;
      this.isCommitted = false;
      return this.nightNotification();
    }

    return null;
  }
}
