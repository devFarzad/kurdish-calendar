// This file is used to test TypeScript type definitions
// It won't be run, just checked for type errors

import {
  getKurdishDateByVariant,
  KurdishCalendarVariant,
  isKurdishLeapYear,
  getHolidaysForDate,
  KurdishCalendar
} from './dist/index';

// Test function getKurdishDateByVariant
const testDate = new Date();
const variantResult = getKurdishDateByVariant(
  testDate, 
  KurdishCalendarVariant.ROJHALAT
);
console.log(variantResult.kurdishDate);
console.log(variantResult.kurdishYear);

// Test function isKurdishLeapYear
const leapResult = isKurdishLeapYear(2724);
console.log(`Is leap year: ${leapResult}`);

// Test function getHolidaysForDate
const holidays = getHolidaysForDate(testDate, { 
  country: 'Kurdistan',
  language: 'ku'
});
console.log(`Found ${holidays.length} holidays`);

// Test KurdishCalendar object
const today = KurdishCalendar.today();
console.log(`Today in Kurdish: ${today.kurdishDate}`);

// Test with the default export
const nextHolidays = KurdishCalendar.getUpcomingHolidays(3);
console.log('Upcoming holidays:', nextHolidays); 