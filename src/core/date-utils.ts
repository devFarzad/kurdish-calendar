/**
 * Date Utilities Module
 *
 * This module provides helper functions for formatting and manipulating dates
 * across different calendar systems and locales.
 */

/**
 * Days of the week in Kurdish
 */
export const kurdishDays = {
  Sunday: 'یەکشەممە',
  Monday: 'دووشەممە',
  Tuesday: 'سێشەممە',
  Wednesday: 'چوارشەممە',
  Thursday: 'پێنجشەممە',
  Friday: 'هەینی',
  Saturday: 'شەممە',
};

/**
 * Days of the week in Arabic
 */
export const arabicDays = {
  Sunday: 'الأحد',
  Monday: 'الاثنين',
  Tuesday: 'الثلاثاء',
  Wednesday: 'الأربعاء',
  Thursday: 'الخميس',
  Friday: 'الجمعة',
  Saturday: 'السبت',
};

/**
 * Days of the week in Persian/Farsi
 */
export const persianDays = {
  Sunday: 'یکشنبه',
  Monday: 'دوشنبه',
  Tuesday: 'سه‌شنبه',
  Wednesday: 'چهارشنبه',
  Thursday: 'پنج‌شنبه',
  Friday: 'جمعه',
  Saturday: 'شنبه',
};

/**
 * Kurdish month names
 */
export const kurdishMonths = {
  January: 'کانوونی دووەم',
  February: 'شوبات',
  March: 'ئازار',
  April: 'نیسان',
  May: 'مایس',
  June: 'حوزەیران',
  July: 'تەمووز',
  August: 'ئاب',
  September: 'ئەیلوول',
  October: 'تشرینی یەکەم',
  November: 'تشرینی دووەم',
  December: 'کانوونی یەکەم',
};

/**
 * Arabic month names
 */
export const arabicMonths = {
  January: 'يناير',
  February: 'فبراير',
  March: 'مارس',
  April: 'أبريل',
  May: 'مايو',
  June: 'يونيو',
  July: 'يوليو',
  August: 'أغسطس',
  September: 'سبتمبر',
  October: 'أكتوبر',
  November: 'نوفمبر',
  December: 'ديسمبر',
};

/**
 * Persian month names
 */
export const persianMonths = {
  January: 'ژانویه',
  February: 'فوریه',
  March: 'مارس',
  April: 'آوریل',
  May: 'مه',
  June: 'ژوئن',
  July: 'ژوئیه',
  August: 'اوت',
  September: 'سپتامبر',
  October: 'اکتبر',
  November: 'نوامبر',
  December: 'دسامبر',
};

/**
 * Gregorian month names in English
 */
export const englishMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Gets the localized day name based on the English day name and locale
 *
 * @param englishDay - English day name (e.g., "Sunday")
 * @param locale - Locale code ('en', 'ku', 'ar', or 'fa')
 * @returns Localized day name
 */
export const getLocalizedDayName = (
  englishDay: string,
  locale: string,
): string => {
  switch (locale) {
  case 'ku':
    return kurdishDays[englishDay as keyof typeof kurdishDays] || englishDay;
  case 'ar':
    return arabicDays[englishDay as keyof typeof arabicDays] || englishDay;
  case 'fa':
    return persianDays[englishDay as keyof typeof persianDays] || englishDay;
  default:
    return englishDay;
  }
};

/**
 * Gets the localized month name based on month number and locale
 *
 * @param month - Month number (1-12)
 * @param locale - Locale code ('en', 'ku', 'ar', or 'fa')
 * @param prefix - Optional prefix to add before the month name
 * @returns Localized month name
 */
export function getLocalizedMonthName(
  month: number,
  locale: string,
  prefix?: string,
): string {
  // Convert 0-based index to 1-based for human-readable month
  // const adjustedMonth = month + 1;

  // Get English month name first
  const englishMonth = englishMonths[month];

  if (!englishMonth) {
    return '';
  }

  let localizedMonth = englishMonth;

  switch (locale) {
  case 'ku':
    localizedMonth =
        kurdishMonths[englishMonth as keyof typeof kurdishMonths] ||
        englishMonth;
    break;
  case 'ar':
    localizedMonth =
        arabicMonths[englishMonth as keyof typeof arabicMonths] || englishMonth;
    break;
  case 'fa':
    localizedMonth =
        persianMonths[englishMonth as keyof typeof persianMonths] ||
        englishMonth;
    break;
  }

  return prefix ? `${prefix} ${localizedMonth}` : localizedMonth;
}

/**
 * Gets the Kurdish country name based on English country name
 *
 * @param englishCountry - English country name
 * @returns Kurdish country name
 */
export const getKurdishCountryName = (englishCountry: string): string => {
  const countryMap: Record<string, string> = {
    Kurdistan: 'کوردستان',
    Iraq: 'عێراق',
    Iran: 'ئێران',
    Turkey: 'تورکیا',
    Syria: 'سووریا',
  };

  return countryMap[englishCountry] || englishCountry;
};

/**
 * Formats a date according to the specified locale and options
 *
 * @param date - JavaScript Date object
 * @param locale - Locale code ('en', 'ku', 'ar', or 'fa')
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  locale: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  // Set default options if not provided
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const mergedOptions = options || defaultOptions;

  // Map locale codes to Intl locale formats
  const localeMap: Record<string, string> = {
    en: 'en-US',
    ku: 'ckb-IR', // Central Kurdish (Sorani)
    ar: 'ar-IQ',
    fa: 'fa-IR',
  };

  const intlLocale = localeMap[locale] || 'en-US';

  try {
    return new Intl.DateTimeFormat(intlLocale, mergedOptions).format(date);
  } catch (error) {
    // Fallback to English if locale is not supported
    return new Intl.DateTimeFormat('en-US', mergedOptions).format(date);
  }
}

/**
 * Adds a specified number of days to a date
 *
 * @param date - JavaScript Date object
 * @param days - Number of days to add (can be negative)
 * @returns New Date object with days added
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Checks if two dates are the same day
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if the dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Checks if a date is today
 *
 * @param date - Date to check
 * @returns True if the date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Checks if a year is a leap year in the Gregorian calendar
 *
 * @param year - Year to check
 * @returns True if the year is a leap year
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Gets the number of days in a month
 *
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Number of days in the month
 */
export function getDaysInMonth(year: number, month: number): number {
  // Month is 0-based in JavaScript Date
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Check for February in a leap year
  if (month === 1 && isLeapYear(year)) {
    return 29;
  }

  return daysInMonth[month];
}

/**
 * Gets the first day of a month
 *
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Date object for the first day of the month
 */
export function getFirstDayOfMonth(year: number, month: number): Date {
  return new Date(year, month, 1);
}

/**
 * Gets the day of the week for the first day of a month
 *
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Day of week (0-6, where 0 is Sunday)
 */
export function getFirstDayOfWeek(year: number, month: number): number {
  return getFirstDayOfMonth(year, month).getDay();
}

/**
 * Gets an array of dates for all days in a month
 *
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Array of Date objects for each day in the month
 */
export function getDatesForMonth(year: number, month: number): Date[] {
  const result: Date[] = [];
  const daysInMonth = getDaysInMonth(year, month);

  for (let day = 1; day <= daysInMonth; day++) {
    result.push(new Date(year, month, day));
  }

  return result;
}
