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
    jy: number;
    jm: JalaaliMonth;
    jd: number;
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
export declare const jalaaliMonthNames: {
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
export declare const jalaali: {
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
