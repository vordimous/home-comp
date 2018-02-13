export default class DataSet {
  constructor(fields) {
    let color;
    if (!fields || !fields.color) {
      color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    } else {
      ({ color } = fields);
    }
    // Default values defined according to iTunes API
    const defaults = {
      label: '',
      fill: false,
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
      data: [],
    };
    Object.assign(this, defaults, fields);
  }
}
