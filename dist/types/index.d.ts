/**
 * Kurdish Calendar Package
 *
 * A comprehensive calendar library that supports Kurdish date formatting,
 * conversion, and holiday information. This package supports both Rojhalat (Eastern)
 * and Bashur (Southern) Kurdish calendar variants, as well as multi-language support.
 *
 * @packageDocumentation
 */
export * from './types';
export { jalaali, JalaaliDate, JalaaliDateResult, jalaaliMonthNames, } from './core/jalaali';
export { getKurdishDate, getKurdishDateByVariant, isKurdishLeapYear, getKurdishMonthLength, KurdishMonthSorani, KurdishMonthLatin, KurdishMonthBashur, KurdishMonthBashurLatin, } from './core/kurdish-calendar';
export { getLocalizedDayName, getLocalizedMonthName, getKurdishCountryName, formatDate, addDays, isSameDay, isToday, isLeapYear, getDaysInMonth, getFirstDayOfMonth, getFirstDayOfWeek, getDatesForMonth, kurdishDays, arabicDays, persianDays, kurdishMonths, arabicMonths, persianMonths, englishMonths, } from './core/date-utils';
export { getAllHolidays, getHolidaysForDate, getHolidaysForMonth, getHolidaysBetweenDates, getUpcomingHolidays, getNextHoliday, isHoliday, getLocalizedText, } from './core/holidays';
import { HolidayOptions } from './types';
import { KurdishCalendarVariant } from './types';
/**
 * Kurdish Calendar - main library object
 * that provides access to the most commonly used functions
 */
export declare const KurdishCalendar: {
    /**
     * Gets Kurdish date for today in Rojhalat (Eastern) format by default
     */
    today: () => import("./types").KurdishDateResult;
    /**
     * Gets Kurdish date for today in Bashur (Southern) format
     */
    todayBashur: () => import("./types").KurdishDateResult;
    /**
     * Gets Kurdish date for today in Rojhalat (Eastern) format
     */
    todayRojhalat: () => import("./types").KurdishDateResult;
    /**
     * Convert a date to Kurdish format
     *
     * @param date - Date to convert
     * @param variant - Calendar variant (ROJHALAT or BASHUR)
     */
    convertDate: (date: Date, variant?: KurdishCalendarVariant) => import("./types").KurdishDateResult;
    /**
     * Gets holidays for today
     *
     * @param options - Optional filtering options
     */
    getTodaysHolidays: (options?: HolidayOptions) => import("./types").Holiday[];
    /**
     * Gets upcoming holidays
     *
     * @param count - Number of upcoming holidays to return
     * @param options - Optional filtering options
     */
    getUpcomingHolidays: (count?: number, options?: HolidayOptions) => import("./types").Holiday[];
};
export default KurdishCalendar;
//# sourceMappingURL=index.d.ts.map