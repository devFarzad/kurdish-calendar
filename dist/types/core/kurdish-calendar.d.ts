/**
 * Kurdish Calendar Utility Module
 *
 * This module provides functionality for converting Gregorian dates to Kurdish dates,
 * which is based on the Solar Hijri (Persian) calendar but with Kurdish month names.
 * The Kurdish New Year (Newroz) starts on March 21st of the Gregorian calendar.
 *
 * The module supports both Rojhalat (Eastern) and Bashur (Southern) Kurdish calendar variants.
 */
import { KurdishDateResult, KurdishCalendarVariant } from '../types';
/**
 * Kurdish month names in Arabic script (Sorani dialect)
 * Used in Eastern Kurdistan (Rojhalat) and follows the Persian calendar structure
 */
export declare enum KurdishMonthSorani {
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
export declare enum KurdishMonthLatin {
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
export declare const KurdishMonthBashur: Record<number, string>;
/**
 * Kurdish month names in Bashur (Southern) variant in Latin script
 */
export declare const KurdishMonthBashurLatin: Record<number, string>;
/**
 * Gets the Kurdish date for a given Gregorian date
 * This defaults to the Rojhalat (Eastern) Kurdish calendar
 * which is based on the Solar Hijri calendar
 *
 * @param date - JavaScript Date object
 * @returns Kurdish date information
 */
export declare function getKurdishDate(date?: Date): KurdishDateResult;
/**
 * Gets a Kurdish date based on specified variant (Rojhalat or Bashur)
 *
 * @param date - JavaScript Date object
 * @param variant - Which Kurdish calendar variant to use
 * @returns Kurdish date information
 */
export declare function getKurdishDateByVariant(date?: Date, variant?: KurdishCalendarVariant): KurdishDateResult;
/**
 * Checks if a year is a leap year in the Kurdish calendar (Rojhalat variant)
 *
 * @param year - Kurdish year
 * @returns True if it's a leap year
 */
export declare function isKurdishLeapYear(year: number): boolean;
/**
 * Gets the number of days in a specific month of the Kurdish calendar
 *
 * @param year - Kurdistan year or Gregorian year depending on variant
 * @param month - Month (1-12 for Rojhalat, 0-11 for Bashur)
 * @param variant - Which Kurdish calendar variant to use
 * @returns Number of days in the month
 */
export declare function getKurdishMonthLength(year: number, month: number, variant?: KurdishCalendarVariant): number;
//# sourceMappingURL=kurdish-calendar.d.ts.map