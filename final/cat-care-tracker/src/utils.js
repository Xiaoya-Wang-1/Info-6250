export function computeAgeFromBirthday(birthday) {
    if (!birthday) return '';
    const b = new Date(birthday);
    const n = new Date();
    let y = n.getFullYear() - b.getFullYear();
    let m = n.getMonth() - b.getMonth();
    let d = n.getDate() - b.getDate();
    if (d < 0) m -= 1;
    if (m < 0) {
      y -= 1;
      m += 12;
    }
    if (y < 0) {
      y = 0;
      m = 0;
    }
    return `${y}y ${m}m`;
  }
  
  export function validateString(field, val) {
    if (!val || typeof val !== 'string') {
      throw new Error(`${field} must be a non-empty string`);
    }
  }
  
  export function validateNumber(field, val) {
    if (val === undefined || isNaN(Number(val))) {
      throw new Error(`${field} must be a number`);
    }
  }  