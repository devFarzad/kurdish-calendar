# Kurdish Calendar API Reference

This document provides a comprehensive reference for all public APIs of the Kurdish Calendar package.

## Core API

### getKurdishDate(date: Date | string): KurdishDateResult

Converts a Gregorian date to a Kurdish date.

**Parameters:**
- `date`: A JavaScript Date object or a string in ISO format (YYYY-MM-DD)

**Returns:** A `KurdishDateResult` object with the following properties:
- `gregorianDate`: Original Gregorian date
- `kurdishDate`: Formatted Kurdish date (e.g., "١ی خاکەلێوە ٢٧٢٤")
- `kurdishDateLatin`: Formatted Kurdish date in Latin script (e.g., "1y Xakelêwe 2724")
- `kurdishYear`: Numeric Kurdish year
- `kurdishMonth`: Kurdish month (enum value)
- `kurdishMonthLatin`: Kurdish month in Latin script
- `kurdishDay`: Numeric Kurdish day

**Example:**
```javascript
import { getKurdishDate } from 'kurdish-calendar';

const kurdishDate = getKurdishDate('2023-03-21');
console.log(kurdishDate.kurdishDate); // "١ی خاکەلێوە ٢٧٢٣"
console.log(kurdishDate.kurdishYear); // 2723
```

### getKurdishYear(gregorianYear: number): number

Calculates the Kurdish year based on a Gregorian year.

**Parameters:**
- `gregorianYear`: A numeric Gregorian year

**Returns:** Numeric Kurdish year

**Example:**
```javascript
import { getKurdishYear } from 'kurdish-calendar';

console.log(getKurdishYear(2023)); // 2723
```

### isKurdishLeapYear(kurdishYear: number): boolean

Determines if a Kurdish year is a leap year.

**Parameters:**
- `kurdishYear`: A numeric Kurdish year

**Returns:** Boolean indicating whether the year is a leap year

**Example:**
```javascript
import { isKurdishLeapYear } from 'kurdish-calendar';

console.log(isKurdishLeapYear(2724)); // true or false
```

## Holiday API

### getAllHolidays(): Holiday[]

Retrieves all holidays in the database.

**Returns:** Array of Holiday objects

**Example:**
```javascript
import { getAllHolidays } from 'kurdish-calendar';

const holidays = getAllHolidays();
console.log(`Total holidays: ${holidays.length}`);
```

### getHolidaysForDate(date: Date | string): Holiday[]

Retrieves all holidays for a specific date.

**Parameters:**
- `date`: A JavaScript Date object or a string in ISO format (YYYY-MM-DD)

**Returns:** Array of Holiday objects for the specified date

**Example:**
```javascript
import { getHolidaysForDate } from 'kurdish-calendar';

const todaysHolidays = getHolidaysForDate(new Date());
if (todaysHolidays.length > 0) {
  console.log('Today is a holiday!');
  todaysHolidays.forEach(h => console.log(h.event.en));
}
```

### getHolidaysForMonth(year: number, month: number): Holiday[]

Retrieves all holidays for a specific month.

**Parameters:**
- `year`: Gregorian year
- `month`: Month number (1-12)

**Returns:** Array of Holiday objects for the specified month

**Example:**
```javascript
import { getHolidaysForMonth } from 'kurdish-calendar';

// Get holidays for March 2023
const marchHolidays = getHolidaysForMonth(2023, 3);
console.log(`March has ${marchHolidays.length} holidays`);
```

### getHolidaysBetweenDates(startDate: Date | string, endDate: Date | string): Holiday[]

Retrieves all holidays between two dates.

**Parameters:**
- `startDate`: A JavaScript Date object or a string in ISO format (YYYY-MM-DD)
- `endDate`: A JavaScript Date object or a string in ISO format (YYYY-MM-DD)

**Returns:** Array of Holiday objects within the date range

**Example:**
```javascript
import { getHolidaysBetweenDates } from 'kurdish-calendar';

// Get holidays for the next 30 days
const today = new Date();
const thirtyDaysLater = new Date();
thirtyDaysLater.setDate(today.getDate() + 30);

const upcomingHolidays = getHolidaysBetweenDates(today, thirtyDaysLater);
console.log(`There are ${upcomingHolidays.length} holidays in the next 30 days`);
```

### getUpcomingHolidays(count: number = 5): Holiday[]

Retrieves upcoming holidays from the current date.

**Parameters:**
- `count`: Number of upcoming holidays to retrieve (default: 5)

**Returns:** Array of Holiday objects

**Example:**
```javascript
import { getUpcomingHolidays } from 'kurdish-calendar';

const nextFiveHolidays = getUpcomingHolidays(5);
console.log('Upcoming holidays:');
nextFiveHolidays.forEach(h => console.log(`${h.date}: ${h.event.en}`));
```

### getNextHoliday(): Holiday | null

Retrieves the next upcoming holiday from the current date.

**Returns:** The next Holiday object or null if no upcoming holidays

**Example:**
```javascript
import { getNextHoliday } from 'kurdish-calendar';

const nextHoliday = getNextHoliday();
if (nextHoliday) {
  console.log(`The next holiday is ${nextHoliday.event.en} on ${nextHoliday.date}`);
}
```

### isHoliday(date: Date | string): boolean

Determines if a specific date is a holiday.

**Parameters:**
- `date`: A JavaScript Date object or a string in ISO format (YYYY-MM-DD)

**Returns:** Boolean indicating whether the date is a holiday

**Example:**
```javascript
import { isHoliday } from 'kurdish-calendar';

const today = new Date();
if (isHoliday(today)) {
  console.log('Today is a holiday!');
} else {
  console.log('Today is not a holiday.');
}
```

## Date Utilities

### formatDate(date: Date | string, format: string, locale: string = 'en'): string

Formats a date according to the specified format and locale.

**Parameters:**
- `date`: A JavaScript Date object or a string in ISO format (YYYY-MM-DD)
- `format`: Format string (see below for supported format tokens)
- `locale`: Locale code ('en', 'ku', 'ar', 'fa')

**Supported Format Tokens:**
- `YYYY`: 4-digit year
- `YY`: 2-digit year
- `MMMM`: Full month name
- `MMM`: Abbreviated month name
- `MM`: 2-digit month (01-12)
- `M`: Month (1-12)
- `DD`: 2-digit day (01-31)
- `D`: Day (1-31)
- `dddd`: Full day of week name
- `ddd`: Abbreviated day of week name

**Returns:** Formatted date string

**Example:**
```javascript
import { formatDate } from 'kurdish-calendar';

// Format date in Kurdish
const formattedDate = formatDate(new Date(), 'dddd, MMMM D, YYYY', 'ku');
console.log(formattedDate); // "شەممە, خاکەلێوە ١, ٢٧٢٤"
```

### getLocalizedDayName(day: number, locale: string = 'en', format: 'long' | 'short' = 'long'): string

Gets the localized name of a day of the week.

**Parameters:**
- `day`: Day of week (0-6, where 0 is Sunday)
- `locale`: Locale code ('en', 'ku', 'ar', 'fa')
- `format`: Name format ('long' or 'short')

**Returns:** Localized day name

**Example:**
```javascript
import { getLocalizedDayName } from 'kurdish-calendar';

const kurdishMonday = getLocalizedDayName(1, 'ku');
console.log(kurdishMonday); // "دووشەممە"
```

### getLocalizedMonthName(month: number, locale: string = 'en', format: 'long' | 'short' = 'long'): string

Gets the localized name of a month.

**Parameters:**
- `month`: Month number (1-12)
- `locale`: Locale code ('en', 'ku', 'ar', 'fa')
- `format`: Name format ('long' or 'short')

**Returns:** Localized month name

**Example:**
```javascript
import { getLocalizedMonthName } from 'kurdish-calendar';

const kurdishMarch = getLocalizedMonthName(3, 'ku');
console.log(kurdishMarch); // "خاکەلێوە"
```

### getLocalizedText(text: MultiLanguageText, locale: string = 'en'): string

Extracts text in the specified locale from a MultiLanguageText object.

**Parameters:**
- `text`: A MultiLanguageText object
- `locale`: Locale code ('en', 'ku', 'ar', 'fa')

**Returns:** Text in the specified locale or English if not available

**Example:**
```javascript
import { getLocalizedText } from 'kurdish-calendar';

const multiLangText = {
  en: "Kurdish New Year",
  ku: "نەورۆز",
  ar: "النوروز",
  fa: "نوروز"
};

const kurdishText = getLocalizedText(multiLangText, 'ku');
console.log(kurdishText); // "نەورۆز"
```

## KurdishCalendar Object API

### KurdishCalendar.today(): KurdishDateResult

Gets today's date in the Kurdish calendar.

**Returns:** A `KurdishDateResult` object for today's date

**Example:**
```javascript
import { KurdishCalendar } from 'kurdish-calendar';

const today = KurdishCalendar.today();
console.log(`Today is ${today.kurdishDate}`);
```

### KurdishCalendar.getUpcomingHolidays(count: number = 5): Holiday[]

Gets upcoming holidays from today.

**Parameters:**
- `count`: Number of upcoming holidays to retrieve (default: 5)

**Returns:** Array of Holiday objects

**Example:**
```javascript
import { KurdishCalendar } from 'kurdish-calendar';

const holidays = KurdishCalendar.getUpcomingHolidays(3);
console.log('Next 3 holidays:');
holidays.forEach(h => console.log(h.event.en));
```

### KurdishCalendar.isHolidayToday(): boolean

Determines if today is a holiday.

**Returns:** Boolean indicating whether today is a holiday

**Example:**
```javascript
import { KurdishCalendar } from 'kurdish-calendar';

if (KurdishCalendar.isHolidayToday()) {
  console.log('Today is a holiday!');
} else {
  console.log('Today is a regular day.');
}
```

## Enums

### KurdishMonthSorani

Enum representing Kurdish months in Sorani dialect.

```typescript
enum KurdishMonthSorani {
  XAKELIWE = 1,     // خاکەلێوە 
  GULLAN = 2,       // گوڵان
  JOZERDAN = 3,     // جۆزەردان
  POSHPER = 4,      // پووشپەڕ
  GELAWEJ = 5,      // گەلاوێژ
  XERMANAN = 6,     // خەرمانان
  REZBER = 7,       // ڕەزبەر
  GELAREZZAN = 8,   // گەڵاڕێزان
  SERMAWEZ = 9,     // سەرماوەز
  BEFRANBAR = 10,   // بەفرانبار
  REBENDAN = 11,    // ڕێبەندان
  RESHEME = 12      // ڕەشەمە
}
```

### KurdishMonthSoraniLatin

Enum representing Kurdish months in Sorani dialect with Latin script.

```typescript
enum KurdishMonthSoraniLatin {
  XAKELIWE = 'Xakelêwe',
  GULLAN = 'Gullan',
  JOZERDAN = 'Jozerdan',
  POSHPER = 'Pûshper',
  GELAWEJ = 'Gelawêj',
  XERMANAN = 'Xermanan',
  REZBER = 'Rezber',
  GELAREZZAN = 'Gelarezzan',
  SERMAWEZ = 'Sermawez',
  BEFRANBAR = 'Befranbar',
  REBENDAN = 'Rebendan',
  RESHEME = 'Resheme'
}
```

## Interfaces

### KurdishDateResult

```typescript
interface KurdishDateResult {
  gregorianDate: Date;
  kurdishDate: string;
  kurdishDateLatin: string;
  kurdishYear: number;
  kurdishMonth: KurdishMonthSorani;
  kurdishMonthLatin: string;
  kurdishDay: number;
}
```

### Holiday

```typescript
interface Holiday {
  date: string;
  event: MultiLanguageText;
  note?: MultiLanguageText;
  country?: string;
  region?: string;
  quote?: Quote;
}
```

### MultiLanguageText

```typescript
interface MultiLanguageText {
  en: string;
  ku: string;
  ar: string;
  fa: string;
}
```

### Quote

```typescript
interface Quote {
  celebrity: string;
  quote: MultiLanguageText;
}
``` 