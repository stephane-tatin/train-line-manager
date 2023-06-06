import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Train } from 'src/app/shared/models/train.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const trains: Train[] = [
      {
        id: 1,
        number: "FA154",
        departure: 'Munich',
        departureTime: '09:20:00 GMT+0200',
        departureDate: '06/08/2023',
        arrival: 'Berlin',
        arrivalTime: '10:20:00 GMT+0200',
        arrivalDate: '08/08/2023',
        stationsStops: [
          'Dresden',
          'Leipzig'
        ],
        type: 'fast',
      },
      {
        id: 2,
        number: "FA155",
        departure: 'Munich',
        departureTime: '09:20:00 GMT+0200',
        departureDate: '06/08/2023',
        arrival: 'Berlin',
        arrivalTime: '10:20:00 GMT+0200',
        arrivalDate: '08/08/2023',
        stationsStops: [
          'Dresden'
        ],
        type: 'fast',
      },
    ];

    const cities: string [] = [
      "Berlin",
      "Munich",
      "Köln",
      "Dresden",
      "Leipzig"
    ]

    const rideAllowedStops = {
      berlin : {
        munich: [
          "Dresden",
          "Leipzig"
        ]
      },

      munich : {
        berlin: [
          "Leipzig",
          "Dresden",
        ]
      }

    }
    return { trains, cities, rideAllowedStops };
  }

  genId(trains: Train[]): number {
    return trains.length +1
  }
}
