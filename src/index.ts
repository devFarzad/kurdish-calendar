/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Kurdish Calendar Package
 * 
 * A comprehensive calendar library that supports Kurdish date formatting,
 * conversion, and holiday information. This package supports both Rojhalat (Eastern)
 * and Bashur (Southern) Kurdish calendar variants, as well as multi-language support.
 * 
 * @packageDocumentation
 */

// Export types
export * from './types';

// Export core calendaring functionality
export { jalaali, JalaaliDate, JalaaliDateResult, jalaaliMonthNames } from './core/jalaali';
export {
  getKurdishDate,
  getKurdishDateByVariant,
  isKurdishLeapYear,
  getKurdishMonthLength,
  KurdishMonthSorani,
  KurdishMonthLatin,
  KurdishMonthBashur,
  KurdishMonthBashurLatin
} from './core/kurdish-calendar';

// Export date utilities
export {
  getLocalizedDayName,
  getLocalizedMonthName,
  getKurdishCountryName,
  formatDate,
  addDays,
  isSameDay,
  isToday,
  isLeapYear,
  getDaysInMonth,
  getFirstDayOfMonth,
  getFirstDayOfWeek,
  getDatesForMonth,
  kurdishDays,
  arabicDays,
  persianDays,
  kurdishMonths,
  arabicMonths,
  persianMonths,
  englishMonths
} from './core/date-utils';

// Export holiday functionality
export {
  getAllHolidays,
  getHolidaysForDate,
  getHolidaysForMonth,
  getHolidaysBetweenDates,
  getUpcomingHolidays,
  getNextHoliday,
  isHoliday,
  getLocalizedText
} from './core/holidays';

// Convenience export for common use cases
import { getKurdishDate, getKurdishDateByVariant } from './core/kurdish-calendar';
import { KurdishCalendarVariant } from './types';
import {
  getHolidaysForDate,
  getUpcomingHolidays
} from './core/holidays';

/**
 * Kurdish Calendar - main library object 
 * that provides access to the most commonly used functions
 */
export const KurdishCalendar = {
  /**
   * Gets Kurdish date for today in Rojhalat (Eastern) format by default
   */
  today: () => getKurdishDate(new Date()),
  
  /**
   * Gets Kurdish date for today in Bashur (Southern) format
   */
  todayBashur: () => getKurdishDateByVariant(new Date(), KurdishCalendarVariant.BASHUR),
  
  /**
   * Gets Kurdish date for today in Rojhalat (Eastern) format
   */
  todayRojhalat: () => getKurdishDateByVariant(new Date(), KurdishCalendarVariant.ROJHALAT),
  
  /**
   * Convert a date to Kurdish format
   * 
   * @param date - Date to convert
   * @param variant - Calendar variant (ROJHALAT or BASHUR)
   */
  convertDate: (date: Date, variant: KurdishCalendarVariant = KurdishCalendarVariant.ROJHALAT) => {
    return getKurdishDateByVariant(date, variant);
  },
  
  /**
   * Gets holidays for today
   * 
   * @param options - Optional filtering options
   */
  getTodaysHolidays: (options?: any) => {
    return getHolidaysForDate(new Date(), options);
  },
  
  /**
   * Gets upcoming holidays
   * 
   * @param count - Number of upcoming holidays to return
   * @param options - Optional filtering options
   */
  getUpcomingHolidays: (count: number = 5, options?: any) => {
    return getUpcomingHolidays(new Date(), count, options);
  }
};

// Default export
export default KurdishCalendar;

