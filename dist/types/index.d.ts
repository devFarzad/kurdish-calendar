/**
 * Text in multiple languages (Kurdish, English, Arabic, Persian)
 */
export interface MultiLanguageText {
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
export interface Quote {
    /** The name of the person quoted */
    celebrity: string;
    /** The quote in multiple languages */
    quote: MultiLanguageText;
}
/**
 * A holiday or significant event
 */
export interface Holiday {
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
export interface KurdishDateResult {
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
export declare enum KurdishCalendarVariant {
    /** Eastern Kurdish calendar (Rojhalat) - Based on Solar Hijri */
    ROJHALAT = "rojhalat",
    /** Southern Kurdish calendar (Bashur) - Based on Gregorian */
    BASHUR = "bashur"
}
/**
 * Options for date formatting
 */
export interface DateFormatOptions {
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
export interface HolidayOptions {
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
