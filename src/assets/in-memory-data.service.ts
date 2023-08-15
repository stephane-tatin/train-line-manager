import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Axe } from 'src/app/shared/models/axe.model';
import { City } from 'src/app/shared/models/city.model';
import { Train } from 'src/app/shared/models/train.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const trains: Train[] = [
      {
        id: 1,
        number: 'FA154',
        departure: 'mun1',
        departureTime: '09:20:00 GMT+0200',
        departureDate: '06/08/2023',
        arrival: 'koe1',
        arrivalTime: '10:20:00 GMT+0200',
        arrivalDate: '08/08/2023',
        stationsStops: ['dor1'],
        type: 'fast',
      },
      {
        id: 2,
        number: 'FA155',
        departure: 'ber1',
        departureTime: '09:20:00 GMT+0200',
        departureDate: '06/08/2023',
        arrival: 'mun1',
        arrivalTime: '10:20:00 GMT+0200',
        arrivalDate: '08/08/2023',
        stationsStops: ['lei1','dre1'],
        type: 'fast',
      },
    ];


    const cities : City[] = [
      { id: 1, key: 'ber1', name: 'berlin', axeList: ['AX1'] },
      { id: 2, key: 'dre1', name: 'dresden', axeList: ['AX1'] },
      { id: 3, key: 'lei1',name: 'leipzig', axeList: ['AX1'] },
      { id: 4, key: 'mun1', name: 'munich', axeList: ['AX1', 'AX2'] },
      { id: 5, key: 'dor1', name: 'dortmund', axeList: ['AX2'] },
      { id: 6, key: 'koe1',name: 'köln', axeList: ['AX2'] },
    ];

    const axes: Axe[] = [
      {
        id: 1,
        name: 'AX1',
        cityList: ['ber1', 'dre1', 'lei1', 'mun1'],
      },
      {
        id: 2,
        name: 'AX2',
        cityList: ['koe1', 'dor1', 'mun1'],
      },
    ];

    return { trains, cities, axes };
  }

  genId(trains: Train[]): number {
    return trains.length + 1;
  }
}
