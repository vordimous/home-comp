
import { PMT } from 'formulajs'

export default class Inputs {
  constructor(fields) {
    // Default values defined according to iTunes API
    const defaults = {
      name: '',
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      pp: 180000,
      dp: 0,
      lenMorg: 30,
      morgRt: 0.04,
      tax: 0.008,
      homeIns: 0.004,
      pmi: 75,
      main: 600,
      improv: 1500,
      saleComm: 0.06,
      saleCost: 3500,
      totalInv: 0,
      totalLeft: 0,
      sellProfit: 0,
    }
    Object.assign(this, defaults, fields)
    if (!fields || fields.dp === undefined) {
      this.dp = (0.2 * this.pp).toFixed(0)
    }
    this.calcPmts()
  }

  calcPmts() {
    this.lvt = (this.pp - this.dp) / this.pp
    if (this.lvt < 0.8) {
      this.pmi = 0
    }

    this.loan = (this.pp - this.dp)
    this.propTax = (this.tax * this.pp) / 12
    this.insur = ((this.homeIns * this.pp) / 12)
    this.morgPmt = -PMT(this.morgRt / 12, this.lenMorg * 12, this.pp - this.dp)
    this.upkeep = ((this.main + this.improv) / 12)
    this.monPmt = this.morgPmt +
      this.propTax +
      this.insur +
      this.pmi +
      this.upkeep
    this.rate = this.morgRt / 12
    this.periods = this.lenMorg * 12
  }
}
