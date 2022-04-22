import { Superhero } from 'src/interfaces/superhero.interface';
import { Headers } from '../../../enums/headers.enum';
import { Graph } from '../../../interfaces/graph.interface';

export const chartsDataMock: Map<Headers, Graph[]> = new Map([
    [ Headers.nameLabel, [{name: 'John', value: 10}, {name: 'Eva', value: 2}] ],
    [ Headers.genderLabel, [{name: 'male', value: 2}, {name: 'Eva', value: 5}] ]
]);

export const superheroesMock: Superhero[] = [
    {
        "nameLabel": "Ahab",
        "genderLabel": "male",
        "citizenshipLabel": "United States of America",
        "skillsLabel": "superhuman strength",
        "occupationLabel": "psychologist",
        "memberOfLabel": "Horsemen of Apocalypse",
        "creatorLabel": "Walt Simonson"
      },
      {
        "nameLabel": "Anya Corazon",
        "genderLabel": "female",
        "citizenshipLabel": "United States of America",
        "skillsLabel": "superhuman strength",
        "occupationLabel": "student",
        "memberOfLabel": "The Spider Society",
        "creatorLabel": "Fiona Avery"
      },
      {
        "nameLabel": "Banshee",
        "genderLabel": "male",
        "citizenshipLabel": "Ireland",
        "skillsLabel": "sonic scream",
        "occupationLabel": "criminal",
        "memberOfLabel": "Interpol",
        "creatorLabel": "Roy Thomas"
      }
];