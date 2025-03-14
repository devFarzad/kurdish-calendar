/**
 * Date Utilities Module
 *
 * This module provides helper functions for formatting and manipulating dates
 * across different calendar systems and locales.
 */
/**
 * Days of the week in Kurdish
 */
export declare const kurdishDays: {
    Sunday: string;
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
};
/**
 * Days of the week in Arabic
 */
export declare const arabicDays: {
    Sunday: string;
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
};
/**
 * Days of the week in Persian/Farsi
 */
export declare const persianDays: {
    Sunday: string;
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
};
/**
 * Kurdish month names
 */
export declare const kurdishMonths: {
    January: string;
    February: string;
    March: string;
    April: string;
    May: string;
    June: string;
    July: string;
    August: string;
    September: string;
    October: string;
    November: string;
    December: string;
};
/**
 * Arabic month names
 */
export declare const arabicMonths: {
    January: string;
    February: string;
    March: string;
    April: string;
    May: string;
    June: string;
    July: string;
    August: string;
    September: string;
    October: string;
    November: string;
    December: string;
};
/**
 * Persian month names
 */
export declare const persianMonths: {
    January: string;
    February: string;
    March: string;
    April: string;
    May: string;
    June: string;
    July: string;
    August: string;
    September: string;
    October: string;
    November: string;
    December: string;
};
/**
 * Gregorian month names in English
 */
export declare const englishMonths: string[];
/**
 * Gets the localized day name based on the English day name and locale
 *
 * @param englishDay - English day name (e.g., "Sunday")
 * @param locale - Locale code ('en', 'ku', 'ar', or 'fa')
 * @returns Localized day name
 */
export declare const getLocalizedDayName: (englishDay: string, locale: string) => string;
/**
 * Gets the localized month name based on month number and locale
 *
 * @param month - Month number (1-12)
 * @param locale - Locale code ('en', 'ku', 'ar', or 'fa')
 * @param prefix - Optional prefix to add before the month name
 * @returns Localized month name
 */
export declare function getLocalizedMonthName(month: number, locale: string, prefix?: string): string;
/**
 * Gets the Kurdish country name based on English country name
 *
 * @param englishCountry - English country name
 * @returns Kurdish country name
 */
export declare const getKurdishCountryName: (englishCountry: string) => string;
/**
 * Formats a date according to the specified locale and options
 *
 * @param date - JavaScript Date object
 * @param locale - Locale code ('en', 'ku', 'ar', or 'fa')
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export declare function formatDate(date: Date, locale: string, options?: Intl.DateTimeFormatOptions): string;
/**
 * Adds a specified number of days to a date
 *
 * @param date - JavaScript Date object
 * @param days - Number of days to add (can be negative)
 * @returns New Date object with days added
 */
export declare function addDays(date: Date, days: number): Date;
/**
 * Checks if two dates are the same day
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if the dates are the same day
 */
export declare function isSameDay(date1: Date, date2: Date): boolean;
/**
 * Checks if a date is today
 *
 * @param date - Date to check
 * @returns True if the date is today
 */
export declare function isToday(date: Date): boolean;
/**
 * Checks if a year is a leap year in the Gregorian calendar
 *
 * @param year - Year to check
 * @returns True if the year is a leap year
 */
export declare function isLeapYear(year: number): boolean;
/**
 * Gets the number of days in a month
 *
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Number of days in the month
 */
export declare function getDaysInMonth(year: number, month: number): number;
/**
 * Gets the first day of a month
 *
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Date object for the first day of the month
 */
export declare function getFirstDayOfMonth(year: number, month: number): Date;
/**
 * Gets the day of the week for the first day of a month
 *
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Day of week (0-6, where 0 is Sunday)
 */
export declare function getFirstDayOfWeek(year: number, month: number): number;
/**
 * Gets an array of dates for all days in a month
 *
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Array of Date objects for each day in the month
 */
export declare function getDatesForMonth(year: number, month: number): Date[];
//# sourceMappingURL=date-utils.d.ts.map