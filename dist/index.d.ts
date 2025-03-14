/**
 * Text in multiple languages (Kurdish, English, Arabic, Persian)
 */
interface MultiLanguageText {
    /** English text */
    en: string;
    /** Kurdish text */
    ku: string;
    /** Arabic text */
    ar: string;
    /** Persian/Farsi text */
    fa: string;
}
/**
 * Quote from a notable person
 */
interface Quote {
    /** The name of the person quoted */
    celebrity: string;
    /** The quote in multiple languages */
    quote: MultiLanguageText;
}
/**
 * A holiday or significant event
 */
interface Holiday {
    /** Date in ISO format (YYYY-MM-DD) */
    date: string;
    /** Event name in multiple languages */
    event: MultiLanguageText;
    /** Optional notes about the event */
    note?: MultiLanguageText;
    /** Country associated with the event (e.g., "Kurdistan", "Iraq") */
    country?: string;
    /** Region within a country (e.g., "South Kurdistan", "East Kurdistan") */
    region?: string;
    /** Optional quote related to the event */
    quote?: Quote;
}
/**
 * Result of Kurdish date calculation
 */
interface KurdishDateResult {
    /** Formatted Gregorian date string */
    gregorianDate: string;
    /** Formatted Kurdish date string in Arabic script */
    kurdishDate: string;
    /** Formatted Kurdish date string in Latin script */
    kurdishDateLatin: string;
    /** Kurdish year (typically Gregorian year + 700) */
    kurdishYear: number;
    /** Kurdish month name in Arabic script */
    kurdishMonth: string;
    /** Kurdish month name in Latin script */
    kurdishMonthLatin: string;
    /** Kurdish day of month */
    kurdishDay: number;
}
/**
 * Kurdish calendar variants
 */
declare enum KurdishCalendarVariant {
    /** Eastern Kurdish calendar (Rojhalat) - Based on Solar Hijri */
    ROJHALAT = "rojhalat",
    /** Southern Kurdish calendar (Bashur) - Based on Gregorian */
    BASHUR = "bashur"
}
/**
 * Options for date formatting
 */
interface DateFormatOptions {
    /** Format to use for dates (e.g., 'YYYY-MM-DD') */
    format?: string;
    /** Whether to include additional information like day of week */
    includeWeekday?: boolean;
    /** Locale to use for formatting */
    locale?: string;
}
/**
 * Options for getting holidays
 */
interface HolidayOptions {
    /** Start date for filtering holidays */
    startDate?: Date;
    /** End date for filtering holidays */
    endDate?: Date;
    /** Filter by specific country */
    country?: string;
    /** Filter by specific region */
    region?: string;
    /** Language to return the holiday information in */
    language?: 'en' | 'ku' | 'ar' | 'fa';
}

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
type JalaaliMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
/**
 * Result of Gregorian to Jalaali conversion
 */
interface JalaaliDate {
    jy: number;
    jm: JalaaliMonth;
    jd: number;
}
/**
 * Result of conversion from a date to Jalaali date
 */
interface JalaaliDateResult extends JalaaliDate {
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
declare const jalaaliMonthNames: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
};
/**
 * Core Jalaali calendar utility functions
 */
declare const jalaali: {
    /**
     * Converts a Gregorian date to Jalaali date
     *
     * @param gy - Gregorian year
     * @param gm - Gregorian month (1-12)
     * @param gd - Gregorian day
     * @returns Jalaali date object with year, month, and day
     */
    toJalaali: (gy: number, gm: number, gd: number) => JalaaliDate;
    /**
     * Converts a Jalaali date to Gregorian
     *
     * @param jy - Jalaali year
     * @param jm - Jalaali month (1-12)
     * @param jd - Jalaali day
     * @returns Object with Gregorian year, month, and day
     */
    toGregorian: (jy: number, jm: number, jd: number) => {
        gy: number;
        gm: number;
        gd: number;
    };
    /**
     * Checks if a Jalaali year is a leap year
     *
     * @param jy - Jalaali year
     * @returns True if the year is a leap year, false otherwise
     */
    isLeapJalaaliYear: (jy: number) => boolean;
    /**
     * Gets the number of days in a Jalaali month
     *
     * @param jy - Jalaali year
     * @param jm - Jalaali month (1-12)
     * @returns Number of days in the month
     */
    jalaaliMonthLength: (jy: number, jm: number) => number;
    /**
     * Converts a JavaScript Date object to a Jalaali date
     *
     * @param date - JavaScript Date object
     * @returns Jalaali date result with year, month, day, and formatted date
     */
    dateToJalaali: (date: Date) => JalaaliDateResult;
};

/**
 * Kurdish Calendar Utility Module
 *
 * This module provides functionality for converting Gregorian dates to Kurdish dates,
 * which is based on the Solar Hijri (Persian) calendar but with Kurdish month names.
 * The Kurdish New Year (Newroz) starts on March 21st of the Gregorian calendar.
 *
 * The module supports both Rojhalat (Eastern) and Bashur (Southern) Kurdish calendar variants.
 */

/**
 * Kurdish month names in Arabic script (Sorani dialect)
 * Used in Eastern Kurdistan (Rojhalat) and follows the Persian calendar structure
 */
declare enum KurdishMonthSorani {
    /** First month: equivalent to late March and most of April */
    XAKELIWE = "\u062E\u0627\u06A9\u06D5\u0644\u06CE\u0648\u06D5",
    /** Second month: equivalent to late April and most of May */
    GULAN = "\u06AF\u0648\u06B5\u0627\u0646",
    /** Third month: equivalent to late May and most of June */
    COZERDAN = "\u062C\u06C6\u0632\u06D5\u0631\u062F\u0627\u0646",
    /** Fourth month: equivalent to late June and most of July */
    PUSHPER = "\u067E\u0648\u0648\u0634\u067E\u06D5\u0695",
    /** Fifth month: equivalent to late July and most of August */
    GELAWEJ = "\u06AF\u06D5\u0644\u0627\u0648\u06CE\u0698",
    /** Sixth month: equivalent to late August and most of September */
    XERMANAN = "\u062E\u06D5\u0631\u0645\u0627\u0646\u0627\u0646",
    /** Seventh month: equivalent to late September and most of October */
    REZBER = "\u0695\u06D5\u0632\u0628\u06D5\u0631",
    /** Eighth month: equivalent to late October and most of November */
    GELAREZAN = "\u06AF\u06D5\u06B5\u0627\u0695\u06CE\u0632\u0627\u0646",
    /** Ninth month: equivalent to late November and most of December */
    SERMAWEZ = "\u0633\u06D5\u0631\u0645\u0627\u0648\u06D5\u0632",
    /** Tenth month: equivalent to late December and most of January */
    BEFRANBAR = "\u0628\u06D5\u0641\u0631\u0627\u0646\u0628\u0627\u0631",
    /** Eleventh month: equivalent to late January and most of February */
    REBENDAN = "\u0695\u06CE\u0628\u06D5\u0646\u062F\u0627\u0646",
    /** Twelfth month: equivalent to late February and most of March */
    RESHEME = "\u0695\u06D5\u0634\u06D5\u0645\u06D5"
}
/**
 * Kurdish month names in Latin script
 */
declare enum KurdishMonthLatin {
    /** First month in Latin script */
    XAKELIWE = "Xakel\u00EAwe",
    /** Second month in Latin script */
    GULAN = "Gulan",
    /** Third month in Latin script */
    COZERDAN = "Cozerdan",
    /** Fourth month in Latin script */
    PUSHPER = "P\u00FB\u015Fper",
    /** Fifth month in Latin script */
    GELAWEJ = "Gelaw\u00EAj",
    /** Sixth month in Latin script */
    XERMANAN = "Xermanan",
    /** Seventh month in Latin script */
    REZBER = "Rezber",
    /** Eighth month in Latin script */
    GELAREZAN = "Gelar\u00EAzan",
    /** Ninth month in Latin script */
    SERMAWEZ = "Sermawez",
    /** Tenth month in Latin script */
    BEFRANBAR = "Befranbar",
    /** Eleventh month in Latin script */
    REBENDAN = "R\u00EAbendan",
    /** Twelfth month in Latin script */
    RESHEME = "Re\u015Feme"
}
/**
 * Kurdish month names in Bashur (Southern) variant, based on Gregorian calendar
 */
declare const KurdishMonthBashur: Record<number, string>;
/**
 * Kurdish month names in Bashur (Southern) variant in Latin script
 */
declare const KurdishMonthBashurLatin: Record<number, string>;
/**
 * Gets the Kurdish date for a given Gregorian date
 * This defaults to the Rojhalat (Eastern) Kurdish calendar
 * which is based on the Solar Hijri calendar
 *
 * @param date - JavaScript Date object
 * @returns Kurdish date information
 */
declare function getKurdishDate(date?: Date): KurdishDateResult;
/**
 * Gets a Kurdish date based on specified variant (Rojhalat or Bashur)
 *
 * @param date - JavaScript Date object
 * @param variant - Which Kurdish calendar variant to use
 * @returns Kurdish date information
 */
declare function getKurdishDateByVariant(date?: Date, variant?: KurdishCalendarVariant): KurdishDateResult;
/**
 * Checks if a year is a leap year in the Kurdish calendar (Rojhalat variant)
 *
 * @param year - Kurdish year
 * @returns True if it's a leap year
 */
declare function isKurdishLeapYear(year: number): boolean;
/**
 * Gets the number of days in a specific month of the Kurdish calendar
 *
 * @param year - Kurdistan year or Gregorian year depending on variant
 * @param month - Month (1-12 for Rojhalat, 0-11 for Bashur)
 * @param variant - Which Kurdish calendar variant to use
 * @returns Number of days in the month
 */
declare function getKurdishMonthLength(year: number, month: number, variant?: KurdishCalendarVariant): number;

/**
 * Date Utilities Module
 *
 * This module provides helper functions for formatting and manipulating dates
 * across different calendar systems and locales.
 */
/**
 * Days of the week in Kurdish
 */
declare const kurdishDays: {
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
declare const arabicDays: {
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
declare const persianDays: {
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
declare const kurdishMonths: {
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
declare const arabicMonths: {
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
declare const persianMonths: {
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
declare const englishMonths: string[];
/**
 * Gets the localized day name based on the English day name and locale
 *
 * @param englishDay - English day name (e.g., "Sunday")
 * @param locale - Locale code ('en', 'ku', 'ar', or 'fa')
 * @returns Localized day name
 */
declare const getLocalizedDayName: (englishDay: string, locale: string) => string;
/**
 * Gets the localized month name based on month number and locale
 *
 * @param month - Month number (1-12)
 * @param locale - Locale code ('en', 'ku', 'ar', or 'fa')
 * @param prefix - Optional prefix to add before the month name
 * @returns Localized month name
 */
declare function getLocalizedMonthName(month: number, locale: string, prefix?: string): string;
/**
 * Gets the Kurdish country name based on English country name
 *
 * @param englishCountry - English country name
 * @returns Kurdish country name
 */
declare const getKurdishCountryName: (englishCountry: string) => string;
/**
 * Formats a date according to the specified locale and options
 *
 * @param date - JavaScript Date object
 * @param locale - Locale code ('en', 'ku', 'ar', or 'fa')
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
declare function formatDate(date: Date, locale: string, options?: Intl.DateTimeFormatOptions): string;
/**
 * Adds a specified number of days to a date
 *
 * @param date - JavaScript Date object
 * @param days - Number of days to add (can be negative)
 * @returns New Date object with days added
 */
declare function addDays(date: Date, days: number): Date;
/**
 * Checks if two dates are the same day
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if the dates are the same day
 */
declare function isSameDay(date1: Date, date2: Date): boolean;
/**
 * Checks if a date is today
 *
 * @param date - Date to check
 * @returns True if the date is today
 */
declare function isToday(date: Date): boolean;
/**
 * Checks if a year is a leap year in the Gregorian calendar
 *
 * @param year - Year to check
 * @returns True if the year is a leap year
 */
declare function isLeapYear(year: number): boolean;
/**
 * Gets the number of days in a month
 *
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Number of days in the month
 */
declare function getDaysInMonth(year: number, month: number): number;
/**
 * Gets the first day of a month
 *
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Date object for the first day of the month
 */
declare function getFirstDayOfMonth(year: number, month: number): Date;
/**
 * Gets the day of the week for the first day of a month
 *
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Day of week (0-6, where 0 is Sunday)
 */
declare function getFirstDayOfWeek(year: number, month: number): number;
/**
 * Gets an array of dates for all days in a month
 *
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Array of Date objects for each day in the month
 */
declare function getDatesForMonth(year: number, month: number): Date[];

/**
 * Holiday Management Module
 *
 * This module provides functions for working with Kurdish holidays and events.
 */

/**
 * Gets all holidays from the dataset
 *
 * @returns Array of all holidays
 */
declare function getAllHolidays(): Holiday[];
/**
 * Gets holidays for a specific date
 *
 * @param date - The date to check for holidays
 * @param options - Optional filtering options
 * @returns Array of holidays for the specified date
 */
declare function getHolidaysForDate(date: Date, options?: HolidayOptions): Holiday[];
/**
 * Gets holidays for a specific month
 *
 * @param year - Year
 * @param month - Month (0-11, JavaScript style)
 * @param options - Optional filtering options
 * @returns Array of holidays for the specified month
 */
declare function getHolidaysForMonth(year: number, month: number, options?: HolidayOptions): Holiday[];
/**
 * Gets holidays between two dates (inclusive)
 *
 * @param startDate - Start date
 * @param endDate - End date
 * @param options - Optional filtering options
 * @returns Array of holidays between the specified dates
 */
declare function getHolidaysBetweenDates(startDate: Date, endDate: Date, options?: HolidayOptions): Holiday[];
/**
 * Gets upcoming holidays from a given date
 *
 * @param date - Starting date
 * @param count - Number of upcoming holidays to return
 * @param options - Optional filtering options
 * @returns Array of upcoming holidays
 */
declare function getUpcomingHolidays(date: Date, count?: number, options?: HolidayOptions): Holiday[];
/**
 * Gets the next holiday from a given date
 *
 * @param date - Starting date
 * @param options - Optional filtering options
 * @returns The next holiday or null if none found
 */
declare function getNextHoliday(date: Date, options?: HolidayOptions): Holiday | null;
/**
 * Checks if a specific date is a holiday
 *
 * @param date - Date to check
 * @param options - Optional filtering options
 * @returns True if the date is a holiday
 */
declare function isHoliday(date: Date, options?: HolidayOptions): boolean;
/**
 * Gets translated text based on the specified language
 *
 * @param textObj - The multi-language text object
 * @param language - Desired language ('en', 'ku', 'ar', or 'fa')
 * @param defaultText - Default text if the language is not available
 * @returns The translated text or default text if not available
 */
declare function getLocalizedText(textObj: {
    [key: string]: string;
} | undefined, language?: string, defaultText?: string): string;

/**
 * Kurdish Calendar - main library object
 * that provides access to the most commonly used functions
 */
declare const KurdishCalendar: {
    /**
     * Gets Kurdish date for today in Rojhalat (Eastern) format by default
     */
    today: () => KurdishDateResult;
    /**
     * Gets Kurdish date for today in Bashur (Southern) format
     */
    todayBashur: () => KurdishDateResult;
    /**
     * Gets Kurdish date for today in Rojhalat (Eastern) format
     */
    todayRojhalat: () => KurdishDateResult;
    /**
     * Convert a date to Kurdish format
     *
     * @param date - Date to convert
     * @param variant - Calendar variant (ROJHALAT or BASHUR)
     */
    convertDate: (date: Date, variant?: KurdishCalendarVariant) => KurdishDateResult;
    /**
     * Gets holidays for today
     *
     * @param options - Optional filtering options
     */
    getTodaysHolidays: (options?: HolidayOptions) => Holiday[];
    /**
     * Gets upcoming holidays
     *
     * @param count - Number of upcoming holidays to return
     * @param options - Optional filtering options
     */
    getUpcomingHolidays: (count?: number, options?: HolidayOptions) => Holiday[];
};

export { type DateFormatOptions, type Holiday, type HolidayOptions, type JalaaliDate, type JalaaliDateResult, KurdishCalendar, KurdishCalendarVariant, type KurdishDateResult, KurdishMonthBashur, KurdishMonthBashurLatin, KurdishMonthLatin, KurdishMonthSorani, type MultiLanguageText, type Quote, addDays, arabicDays, arabicMonths, KurdishCalendar as default, englishMonths, formatDate, getAllHolidays, getDatesForMonth, getDaysInMonth, getFirstDayOfMonth, getFirstDayOfWeek, getHolidaysBetweenDates, getHolidaysForDate, getHolidaysForMonth, getKurdishCountryName, getKurdishDate, getKurdishDateByVariant, getKurdishMonthLength, getLocalizedDayName, getLocalizedMonthName, getLocalizedText, getNextHoliday, getUpcomingHolidays, isHoliday, isKurdishLeapYear, isLeapYear, isSameDay, isToday, jalaali, jalaaliMonthNames, kurdishDays, kurdishMonths, persianDays, persianMonths };
