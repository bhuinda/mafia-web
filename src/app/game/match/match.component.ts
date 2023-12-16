import { Component } from '@angular/core';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})

export class MatchComponent {
}

// interface Config {
//     name: string;
//     description: string;
//     messageCommit: string;
//   }

//   class Citizen {
//     name: string;
//     description: string;
//     messageCommit: string;
//     messageProperties: { [key: string]: any } = {};

//     constructor(config: Config) {
//       this.name = config.name;
//       this.description = config.description;
//       this.messageCommit = config.messageCommit;
//     }

//     getEmbeddedValues(message: string): string {
//       let embeddedMessage = message;
//       for (const key in this.messageProperties) {
//         embeddedMessage = embeddedMessage.replace(`{${key}}`, this.messageProperties[key]);
//       }

//       return embeddedMessage;
//     }
//   }

// messageProperties: { [key: string]: any } = {
//   name: 'John',
//   count: 5
// }

// config = {
//   name: 'Citizen',
//   description: 'A regular member of the Town.',
//   messageCommit: 'You decide to attack {name} {count} times.'
// };

// stringified = JSON.stringify(this.config);
// conversion = JSON.parse(this.stringified);

// citizen = new Citizen(this.conversion);

// ngOnInit(): void {
//   console.log(this.stringified);
//   console.log(this.roleController.ngOnInit());
// }

// addNewProperty(key: string, value: any) {
//   this.messageProperties[key] = value;
//   console.log(this.messageProperties);
// }

// templateLiteralEmulator(message: string): string {
//   let convertedMessage = message;
//   for (const key in this.messageProperties) {
//     convertedMessage = convertedMessage.replace(`{${key}}`, this.messageProperties[key]);
//   }
//       // Original: convertedMessage = 'You decide to attack {name} {count} times.'
//       // Pass 1: convertedMessage = 'You decide to attack John {count} times.'
//       // Pass 2: convertedMessage = 'You decide to attack John 5 times.'

//   return convertedMessage;
// }
