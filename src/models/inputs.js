export default class Inputs {
  constructor(fields) {
    // Default values defined according to iTunes API
    const defaults = {
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      pp: 0,
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
    if (fields.dp === undefined) {
      this.dp = 0.2 * this.pp;
    }
  }
}
