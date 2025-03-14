/**
 * Jalaali (Persian/Solar Hijri) Calendar Utilities
 * 
 * This module provides utility functions for working with the Jalaali calendar system,
 * also known as the Persian or Solar Hijri calendar.
 * 
 * The Jalaali calendar is the official calendar of Iran and Afghanistan, with the year
 * starting on the vernal equinox as determined by astronomical calculations.
 * 
 * Adapted from Behrang Noruzi Niya's jalaali.js
 * Original source: https://github.com/jalaali/jalaali-js
 */

/**
 * Jalaali/Persian calendar month in numeric format
 */
export type JalaaliMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Result of Gregorian to Jalaali conversion
 */
export interface JalaaliDate {
  jy: number;   // Jalaali year
  jm: JalaaliMonth;   // Jalaali month (1-12)
  jd: number;   // Jalaali day (1-31)
}

/**
 * Result of conversion from a date to Jalaali date
 */
export interface JalaaliDateResult extends JalaaliDate {
  /** Formatted full Jalaali date string */
  formattedDate: string;
  /** Jalaali month name */
  monthName: string;
  /** Whether the year is a leap year */
  isLeapYear: boolean;
}

/**
 * Names of Jalaali/Persian months
 */
export const jalaaliMonthNames = {
  1: 'فروردین',
  2: 'اردیبهشت',
  3: 'خرداد',
  4: 'تیر',
  5: 'مرداد',
  6: 'شهریور',
  7: 'مهر',
  8: 'آبان',
  9: 'آذر', 
  10: 'دی',
  11: 'بهمن',
  12: 'اسفند'
};

/**
 * Core Jalaali calendar utility functions
 */
export const jalaali = {
  /**
   * Converts a Gregorian date to Jalaali date
   * 
   * @param gy - Gregorian year
   * @param gm - Gregorian month (1-12)
   * @param gd - Gregorian day
   * @returns Jalaali date object with year, month, and day
   */
  toJalaali: function(gy: number, gm: number, gd: number): JalaaliDate {
    return d2j(g2d(gy, gm, gd));
  },

  /**
   * Converts a Jalaali date to Gregorian
   * 
   * @param jy - Jalaali year
   * @param jm - Jalaali month (1-12)
   * @param jd - Jalaali day
   * @returns Object with Gregorian year, month, and day
   */
  toGregorian: function(jy: number, jm: number, jd: number) {
    return d2g(j2d(jy, jm, jd));
  },

  /**
   * Checks if a Jalaali year is a leap year
   * 
   * @param jy - Jalaali year
   * @returns True if the year is a leap year, false otherwise
   */
  isLeapJalaaliYear: function(jy: number): boolean {
    return isLeapJalaaliYear(jy);
  },

  /**
   * Gets the number of days in a Jalaali month
   * 
   * @param jy - Jalaali year
   * @param jm - Jalaali month (1-12)
   * @returns Number of days in the month
   */
  jalaaliMonthLength: function(jy: number, jm: number): number {
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;
    if (isLeapJalaaliYear(jy)) return 30;
    return 29;
  },
  
  /**
   * Converts a JavaScript Date object to a Jalaali date
   * 
   * @param date - JavaScript Date object
   * @returns Jalaali date result with year, month, day, and formatted date
   */
  dateToJalaali: function(date: Date): JalaaliDateResult {
    const gy = date.getFullYear();
    const gm = date.getMonth() + 1;
    const gd = date.getDate();
    const { jy, jm, jd } = this.toJalaali(gy, gm, gd);
    
    const monthName = jalaaliMonthNames[jm as JalaaliMonth];
    const isLeapYear = this.isLeapJalaaliYear(jy);
    const formattedDate = `${jy}/${jm}/${jd}`;
    
    return {
      jy,
      jm: jm as JalaaliMonth,
      jd,
      formattedDate,
      monthName,
      isLeapYear
    };
  }
};

/**
 * Checks if a Jalaali year is a leap year
 * 
 * @param jy - Jalaali year
 * @returns True if the year is a leap year
 */
function isLeapJalaaliYear(jy: number): boolean {
  return jalCal(jy).leap === 0;
}

/**
 * Converts a Gregorian date to Julian day number
 * 
 * @param gy - Gregorian year
 * @param gm - Gregorian month (1-12)
 * @param gd - Gregorian day
 * @returns Julian day number
 */
function g2d(gy: number, gm: number, gd: number): number {
  const d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
      + div(153 * mod(gm + 9, 12) + 2, 5)
      + gd - 34840408;
  return d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
}

/**
 * Converts a Julian day number to Gregorian date
 * 
 * @param jdn - Julian day number
 * @returns Object with Gregorian year, month, and day
 */
function d2g(jdn: number): { gy: number, gm: number, gd: number } {
  const j = 4 * jdn + 139361631;
  const j_adjusted = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  const i = div(mod(j_adjusted, 1461), 4) * 5 + 308;
  const gd = div(mod(i, 153), 5) + 1;
  const gm = mod(div(i, 153), 12) + 1;
  const gy = div(j_adjusted, 1461) - 100100 + div(8 - gm, 6);
  
  return { gy, gm, gd };
}

/**
 * Converts a Jalaali date to Julian day number
 * 
 * @param jy - Jalaali year
 * @param jm - Jalaali month (1-12)
 * @param jd - Jalaali day
 * @returns Julian day number
 */
function j2d(jy: number, jm: number, jd: number): number {
  const r = jalCal(jy);
  const jdn = g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
  return jdn;
}

/**
 * Converts a Julian day number to Jalaali date
 * 
 * @param jdn - Julian day number
 * @returns Jalaali date object with year, month, and day
 */
function d2j(jdn: number): JalaaliDate {
  const gy = d2g(jdn).gy; // Calculate Gregorian year
  let jy = gy - 621;
  const r = jalCal(jy);
  const jdn1f = g2d(gy, 3, r.march);
  let jd, jm, k;
  
  // Find number of days that passed since 1 Farvardin
  k = jdn - jdn1f;
  if (k >= 0) {
    if (k <= 185) {
      // The first 6 months
      jm = 1 + div(k, 31);
      jd = mod(k, 31) + 1;
      return { jy, jm: jm as JalaaliMonth, jd };
    } else {
      // The remaining months
      k -= 186;
    }
  } else {
    // Previous Jalaali year
    jy -= 1;
    k += 179;
    if (r.leap === 1)
      k += 1;
  }
  jm = 7 + div(k, 30);
  jd = mod(k, 30) + 1;
  return { jy, jm: jm as JalaaliMonth, jd };
}

/**
 * Helper function to calculate integer division
 */
function div(a: number, b: number): number {
  return Math.floor(a / b);
}

/**
 * Helper function to calculate modulo
 */
function mod(a: number, b: number): number {
  return a - Math.floor(a / b) * b;
}

/**
 * Calculates Jalaali calendar parameters for a year
 * 
 * @param jy - Jalaali year
 * @returns Object with Jalaali calendar parameters
 */
function jalCal(jy: number): { leap: number, gy: number, march: number } {
  // Jalaali years starting the 33-year cycle
  const breaks = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181,
    1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
  ];
  
  const bl = breaks.length;
  const gy = jy + 621;
  let leapJ = -14;
  let jp = breaks[0];
  
  if (jy < jp || jy >= breaks[bl - 1])
    throw new Error('Invalid Jalaali year: ' + jy);
  
  // Find the limiting years for the Jalaali year jy
  let jump;
  for (let i = 1; i < bl; i += 1) {
    const jm = breaks[i];
    jump = jm - jp;
    if (jy < jm)
      break;
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  const n = jy - jp;
  
  // Find the number of leap years from AD 621 to the beginning
  // of the current Jalaali year in the Persian calendar
  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (jump !== undefined && mod(jump, 33) === 4 && jump - n === 4) {
    leapJ += 1;
  }
  
  // And the same in the Gregorian calendar (until the year gy)
  const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  
  // Determine the Gregorian date of Farvardin the 1st
  const march = 20 + leapJ - leapG;
  
  // Return the calculated values
  return {
    leap: mod(n, 33) === 4 && n % 4 === 0 ? 1 : 0,
    gy: gy,
    march: march
  };
} 