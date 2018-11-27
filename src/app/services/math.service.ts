import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  readonly MAX_POSITIVE_INT32 = 2147483647;
  readonly MAX_NEGETIVE_INT32 = -2147483648;

  constructor() { }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getRandom(max: number, precision: number): number {
    const random = Math.random() * max;
    return +random.toFixed(precision);
  }

  getRandomInts(max: number, size: number): number[] {
    return Array.from(new Array(size), (val, index) => this.getRandomInt(max));
  }

  getRandomIntWithinRange(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomWithinRange(min: number, max: number, precision: number): number {
    const random = Math.random() * (max - min) + min;
    return +random.toFixed(precision);
  }

  getRandomlyDistirbutedArray(needToSplit: number, numberOfPart: number): number[] {
    const splittedNumbers = [];
    for (let i = 0; i < numberOfPart - 1; i++) {
      const randomNumber = this.getRandomInt(needToSplit - (numberOfPart - i)) + 1;
      splittedNumbers.push(randomNumber);
      needToSplit -= randomNumber;
    }
    splittedNumbers.push(needToSplit);
    return splittedNumbers;
  }

}
