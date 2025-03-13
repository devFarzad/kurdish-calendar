/**
 * Holiday Management Module
 *
 * This module provides functions for working with Kurdish holidays and events.
 */
import { Holiday, HolidayOptions } from '../types';
/**
 * Gets all holidays from the dataset
 *
 * @returns Array of all holidays
 */
export declare function getAllHolidays(): Holiday[];
/**
 * Gets holidays for a specific date
 *
 * @param date - The date to check for holidays
 * @param options - Optional filtering options
 * @returns Array of holidays for the specified date
 */
export declare function getHolidaysForDate(date: Date, options?: HolidayOptions): Holiday[];
/**
 * Gets holidays for a specific month
 *
 * @param year - Year
 * @param month - Month (0-11, JavaScript style)
 * @param options - Optional filtering options
 * @returns Array of holidays for the specified month
 */
export declare function getHolidaysForMonth(year: number, month: number, options?: HolidayOptions): Holiday[];
/**
 * Gets holidays between two dates (inclusive)
 *
 * @param startDate - Start date
 * @param endDate - End date
 * @param options - Optional filtering options
 * @returns Array of holidays between the specified dates
 */
export declare function getHolidaysBetweenDates(startDate: Date, endDate: Date, options?: HolidayOptions): Holiday[];
/**
 * Gets upcoming holidays from a given date
 *
 * @param date - Starting date
 * @param count - Number of upcoming holidays to return
 * @param options - Optional filtering options
 * @returns Array of upcoming holidays
 */
export declare function getUpcomingHolidays(date: Date, count?: number, options?: HolidayOptions): Holiday[];
/**
 * Gets the next holiday from a given date
 *
 * @param date - Starting date
 * @param options - Optional filtering options
 * @returns The next holiday or null if none found
 */
export declare function getNextHoliday(date: Date, options?: HolidayOptions): Holiday | null;
/**
 * Checks if a specific date is a holiday
 *
 * @param date - Date to check
 * @param options - Optional filtering options
 * @returns True if the date is a holiday
 */
export declare function isHoliday(date: Date, options?: HolidayOptions): boolean;
/**
 * Gets translated text based on the specified language
 *
 * @param textObj - The multi-language text object
 * @param language - Desired language ('en', 'ku', 'ar', or 'fa')
 * @param defaultText - Default text if the language is not available
 * @returns The translated text or default text if not available
 */
export declare function getLocalizedText(textObj: {
    [key: string]: string;
} | undefined, language?: string, defaultText?: string): string;
