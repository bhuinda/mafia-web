import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

interface Directory {
  name: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class Metadata implements OnInit {

  constructor(private http: HttpClient) {}

  catalog: { [directory: string]: any[] } = {};
  directories: Directory[] = [
    {
      name: 'TownRoles',
      path: './data/roles/town'
    },
    {
      name: 'MafiaRoles',
      path: './data/roles/mafia'
    },
  ]

  getMetadata(directory: string): Observable<any> {
    return this.http.get("https://ng-mafia4web-default-rtdb.firebaseio.com/roles/citizen")
  }

  // getMetadata(directory: string) {
  //   const metadata = [];
  //   const files = this.fs.readdirSync(directory);

  //   for (const file of files) {
  //     const filePath = this.path.join(directory, file);
  //     const stats = this.fs.statSync(filePath);

  //     if (stats.isFile() && this.path.extname(file) === '.json') {
  //       const data = this.fs.readFileSync(filePath, 'utf8');
  //       const json = JSON.parse(data);

  //       metadata.push({
  //         file: file,
  //         id: json.id
  //       });
  //     }
  //   }

  //   return metadata;
  // }

  ngOnInit(): void {
    // Finds all relevant JSON files and creates an array of their IDs
    for (const directory of this.directories) {
      //this.catalog[directory.name] = this.getMetadata(directory.path);
    }
  }
}
