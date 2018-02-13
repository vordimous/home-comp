
import { PMT } from 'formulajs';

export default class Inputs {
  constructor(fields) {
    // Default values defined according to iTunes API
    const defaults = {
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      pp: 180000,
      dp: 0,
      lenMorg: 30,
      morgRt: 0.04,
      tax: 0.012,
      homeIns: 0.004,
      pmi: 150,
      main: 600,
      improv: 1500,
    };
    Object.assign(this, defaults, fields);
    if (!fields || fields.dp === undefined) {
      this.dp = 0.2 * this.pp;
    }
    this.propTax = (this.tax * this.pp) / 12;
    this.insur = ((this.homeIns * this.pp) / 12) + this.pmi;
    this.morgPmt = -PMT(this.morgRt / 12, this.lenMorg * 12, this.pp - this.dp);
    this.monPmt = this.morgPmt
    + this.propTax
    + this.insur
    + (this.main / 12)
    + (this.improv / 12);
    this.rate = this.morgRt / 12;
    this.periods = this.lenMorg * 12;
  }
}
