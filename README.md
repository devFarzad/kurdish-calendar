# Kurdish Calendar

![Kurdish Calendar](https://raw.githubusercontent.com/username/kurdish-calendar/main/assets/banner.png)

[![npm version](https://img.shields.io/npm/v/kurdish-calendar.svg)](https://www.npmjs.com/package/kurdish-calendar)
[![License](https://img.shields.io/npm/l/kurdish-calendar.svg)](https://github.com/username/kurdish-calendar/blob/main/LICENSE)

A comprehensive Kurdish calendar library that supports both Rojhalat (Eastern) and Bashur (Southern) Kurdish calendar variants, multilingual holiday data, and various date utility functions.

## Features

- **Dual Kurdish Calendar Support**
  - **Rojhalat (Eastern)** - Based on the Solar Hijri calendar
  - **Bashur (Southern)** - Based on the Gregorian calendar with Kurdish month names
  
- **Calendar Conversion**
  - Convert between Gregorian, Jalaali (Persian/Solar Hijri), and Kurdish dates
  - Support for different date formats and locales
  
- **Rich Holiday Data**
  - Comprehensive database of Kurdish holidays and events
  - Multi-language support (Kurdish, English, Arabic, Persian)
  - Filter holidays by date, country, or region
  
- **Date Utilities**
  - Format dates in different calendars and locales
  - Calculate leap years
  - Get localized day and month names
  - Manipulate dates with utility functions

## Installation

Using npm:

```bash
npm install kurdish-calendar
```

Using yarn:

```bash
yarn add kurdish-calendar
```

## Quick Start

```javascript
import { KurdishCalendar } from 'kurdish-calendar';

// Get today's date in Kurdish (Rojhalat) format
const today = KurdishCalendar.today();
console.log(today.kurdishDate); // e.g., "2724 خاکەلێوە 15"

// Get today's date in Kurdish (Bashur) format
const todayBashur = KurdishCalendar.todayBashur();
console.log(todayBashur.kurdishDate); // e.g., "15 نیسان 2024"

// Get today's holidays
const todaysHolidays = KurdishCalendar.getTodaysHolidays();
todaysHolidays.forEach(holiday => {
  console.log(holiday.event.en); // Display event name in English
});

// Get upcoming holidays
const upcomingHolidays = KurdishCalendar.getUpcomingHolidays(3);
upcomingHolidays.forEach(holiday => {
  console.log(`${holiday.date}: ${holiday.event.ku}`); // Display Kurdish event name
});
```

## Usage Examples

### Convert Dates Between Calendars

```javascript
import { getKurdishDateByVariant, KurdishCalendarVariant } from 'kurdish-calendar';

// Create a date object
const date = new Date('2024-03-21');

// Convert to Rojhalat (Eastern) Kurdish calendar
const rojhalatDate = getKurdishDateByVariant(date, KurdishCalendarVariant.ROJHALAT);
console.log(rojhalatDate);
// Output: {
//   gregorianDate: "2024-03-21",
//   kurdishDate: "2724 خاکەلێوە 1",
//   kurdishDateLatin: "2724 Xakelêwe 1",
//   kurdishYear: 2724,
//   kurdishMonth: "خاکەلێوە",
//   kurdishMonthLatin: "Xakelêwe",
//   kurdishDay: 1
// }

// Convert to Bashur (Southern) Kurdish calendar
const bashurDate = getKurdishDateByVariant(date, KurdishCalendarVariant.BASHUR);
console.log(bashurDate);
// Output: {
//   gregorianDate: "2024-03-21",
//   kurdishDate: "21 ئازار 2024",
//   kurdishDateLatin: "21 Azar 2024",
//   kurdishYear: 2024,
//   kurdishMonth: "ئازار",
//   kurdishMonthLatin: "Azar",
//   kurdishDay: 21
// }
```

### Working with Holidays

```javascript
import { getHolidaysForMonth, getNextHoliday, isHoliday } from 'kurdish-calendar';

// Get all holidays in March 2024
const marchHolidays = getHolidaysForMonth(2024, 2); // Month is 0-based (0-11)
console.log(`Found ${marchHolidays.length} holidays in March 2024`);

// Get holidays for a specific country/region
const kurdistanHolidays = getHolidaysForMonth(2024, 2, { country: 'Kurdistan' });
console.log(`Found ${kurdistanHolidays.length} holidays in Kurdistan in March 2024`);

// Get the next holiday from today
const nextHoliday = getNextHoliday(new Date());
if (nextHoliday) {
  console.log(`Next holiday: ${nextHoliday.event.en} on ${nextHoliday.date}`);
}

// Check if a specific date is a holiday
const isNewroz = isHoliday(new Date('2024-03-21'));
console.log(`March 21, 2024 is ${isNewroz ? 'a holiday' : 'not a holiday'}`);
```

### Date Utilities

```javascript
import {
  formatDate,
  getLocalizedDayName,
  getLocalizedMonthName,
  addDays,
  isLeapYear
} from 'kurdish-calendar';

// Format a date in different locales
const date = new Date('2024-03-21');
console.log(formatDate(date, 'en')); // "March 21, 2024"
console.log(formatDate(date, 'ku')); // "٢١ی ئازاری ٢٠٢٤"

// Get localized day name
const dayName = getLocalizedDayName('Thursday', 'ku');
console.log(dayName); // "پێنجشەممە"

// Get localized month name
const monthName = getLocalizedMonthName(2, 'ar'); // March (0-based)
console.log(monthName); // "مارس"

// Add days to a date
const newDate = addDays(date, 5);
console.log(newDate.toISOString()); // 2024-03-26...

// Check if a year is a leap year
console.log(isLeapYear(2024)); // true
```

## API Reference

### Core Calendar Functions

#### `getKurdishDate(date?: Date): KurdishDateResult`
Converts a Gregorian date to Kurdish date (Rojhalat/Eastern variant).

#### `getKurdishDateByVariant(date?: Date, variant?: KurdishCalendarVariant): KurdishDateResult`
Converts a Gregorian date to Kurdish date based on the specified variant.

#### `isKurdishLeapYear(year: number): boolean`
Checks if a Kurdish year is a leap year.

#### `getKurdishMonthLength(year: number, month: number, variant?: KurdishCalendarVariant): number`
Gets the number of days in a Kurdish month.

### Holiday Functions

#### `getAllHolidays(): Holiday[]`
Gets all holidays from the dataset.

#### `getHolidaysForDate(date: Date, options?: HolidayOptions): Holiday[]`
Gets holidays for a specific date.

#### `getHolidaysForMonth(year: number, month: number, options?: HolidayOptions): Holiday[]`
Gets holidays for a specific month.

#### `getHolidaysBetweenDates(startDate: Date, endDate: Date, options?: HolidayOptions): Holiday[]`
Gets holidays between two dates.

#### `getUpcomingHolidays(date: Date, count?: number, options?: HolidayOptions): Holiday[]`
Gets upcoming holidays from a given date.

#### `getNextHoliday(date: Date, options?: HolidayOptions): Holiday | null`
Gets the next holiday from a given date.

#### `isHoliday(date: Date, options?: HolidayOptions): boolean`
Checks if a specific date is a holiday.

### Date Utilities

#### `formatDate(date: Date, locale: string, options?: Intl.DateTimeFormatOptions): string`
Formats a date according to the specified locale and options.

#### `getLocalizedDayName(englishDay: string, locale: string): string`
Gets the localized day name based on English day name and locale.

#### `getLocalizedMonthName(month: number, locale: string, prefix?: string): string`
Gets the localized month name.

#### `addDays(date: Date, days: number): Date`
Adds a specified number of days to a date.

#### `isSameDay(date1: Date, date2: Date): boolean`
Checks if two dates are the same day.

#### `isToday(date: Date): boolean`
Checks if a date is today.

## Calendar Background

The Kurdish calendar has two main variants:

1. **Rojhalat (Eastern) Kurdish Calendar**
   - Based on the Solar Hijri (Persian) calendar
   - Kurdish New Year (Newroz) starts on March 21st
   - Year is calculated as Solar Hijri year + 700
   - Month names are in Kurdish (e.g., خاکەلێوە - Xakelêwe)

2. **Bashur (Southern) Kurdish Calendar**
   - Based on the Gregorian calendar but with Kurdish month names
   - Uses standard Gregorian year
   - Month names are in Kurdish (e.g., ئازار - Azar for March)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Special thanks to the Kurdish community
- Based on algorithms from various open-source calendar conversion libraries
- Holiday data compiled from multiple authoritative sources 