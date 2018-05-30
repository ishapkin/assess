import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Определяем переменную для хранения данных измерений
  dataArray: any[] = [];

  /**
   * В конструторе заполняем 5-ю пустыми строками
   */
  constructor () {
      this.dataArray = [];
      for ( let i = 0; i < 5; i++) {
          this.dataArray.push(null);
      }
  }

    /**
     * Нормализация и округление
     * @param number
     * @param toNumber
     * @returns {number}
     */
    normalize(number, toNumber = 10) {
        return Math.round(number * toNumber) / toNumber;
    }

  /**
   * Случайное заполнение измерений
   * @param min
   * @param max
   * @returns {any}
   */
  setRandomData(min, max) {
      this.dataArray = [];
      for ( let i = 0; i < 20; i++) {
          this.dataArray.push(this.normalize(Math.random()));
      }
  }

  /**
   * Добавление строки
   * @returns {number}
   */
  addLine() {
      return this.dataArray.push(null);
  }

  /**
   * Удаление строки
   */
  deleteLine(key) {
    console.log('Удалить строку с key=' + key);
    return this.dataArray.splice(key, 1);
  }

   /**
    * Сумма показаний
    * @returns {any}
    */
  getTotal() {
    return this.normalize(
        this.dataArray.reduce(function(sum, current) { return sum + current})
    );
  }

  /**
   *
   * @returns {number}
   */
  getAverage() {
      return this.normalize(this.getTotal() / this.dataArray.length, 100);
  }

    /**
     *
     * @param data
     * @param index
     * @returns {number}
     */
  powFunc(data, index) {
      return Math.pow(data, index);
  }

    /**
     * Расчет отклонения
     * @returns {number}
     */
  standardDeviation() {
      let sum = 0;
     const average = this.getAverage();
     this.dataArray.forEach(function (val) {
         sum += Math.pow(average - val, 2);
     });
     sum = sum / (this.dataArray.length - 1);
     return this.normalize(Math.sqrt(sum), 100);
  }

  /**
   * Асимметрия
   * @returns {number}
   */
  asymmetry() {
      let sum = 0;
      const average = this.getAverage();
      this.dataArray.forEach(function (val) {
          sum += Math.pow(average - val, 3);
      });
      sum = sum / (this.dataArray.length * Math.pow(this.standardDeviation(), 3));
      return this.normalize(sum, 100);
  }

 /**
  * Ошибка репрезентативности асимметрии
  * @returns {number}
  */
  aMistake() {
      const length = this.dataArray.length;
      return this.normalize(Math.sqrt(6 / length), 100);
  }

    /**
     * Эксцесс
     * @returns {number}
     */
  excess() {
      let sum = 0;
      const average = this.getAverage();
      this.dataArray.forEach(function (val) {
          sum += Math.pow(average - val, 4);
      });
      sum = sum / (this.dataArray.length * Math.pow(this.standardDeviation(), 4)) - 3;
      return this.normalize(sum, 100);
  }

   /**
    * Ошибка репрезентативности эксцесса
    * @returns {number}
    */
   eMistake() {
       return this.normalize(this.aMistake() * 2, 100);
   }

    /**
     * Критическое значение для показателя асимметрии
     * @returns {number}
     */
    aCritical() {
       const n = this.dataArray.length;
       return this.normalize(
           3 * Math.sqrt(
           6 * (n - 1) / (n + 1) * (n + 3)
           )
       );
    }

    /**
     * Критическое значение для показателя
     * @returns {number}
     */
    eCritical() {
        const n = this.dataArray.length;
        return this.normalize(
            5 * Math.sqrt(
            24 * n * (n - 2) * (n - 3) / Math.pow((n + 1), 2) * (n + 3) * (n + 5)
            )
        );
    }

}
