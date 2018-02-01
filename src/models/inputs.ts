export default class Inputs {
  pp: Number = 0;
  dp: Number = 0;
  lenMorg: Number = 30;
  morgRt: Number = 0.04;
  tax: Number = 0.012;
  homeIns: Number = 0.004;
  pmi: Number = 150;
  main: Number = 600;
  improv: Number = 1500;

  constructor(fields?: Object) {
    if (fields) Object.assign(this, fields);
  }
}
