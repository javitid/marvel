import { Injectable } from '@angular/core';

import { Headers } from '../enums/headers.enum';
import { Superhero } from '../interfaces/superhero.interface';
import { Graph } from '../interfaces/graph.interface';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {
  public getGraphDataByKey(superheroes: Superhero[], key: Headers): Graph[] {
    // Get unique options
    const options = [...new Set(superheroes.map((hero: Superhero) => hero[key]))];

    // Return Graph interface
    return options.map(option => {
      return {
        name: option,
        value: superheroes.filter((hero: Superhero) => hero[key] === option ).length
      }
    })
  }

  // Convert Superheroes data into a chart object
  public getChartsData(superheroes: Superhero[]): Map<Headers, Graph[]> {
    const chartsMap = new Map<Headers, Graph[]>();

    for (let header of Object.values(Headers)) {
      chartsMap.set(header, this.getGraphDataByKey(superheroes, header));
    }

    return chartsMap;
  }
}
