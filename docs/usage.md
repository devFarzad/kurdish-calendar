# Kurdish Calendar Package Usage Guide

This document provides detailed usage examples and best practices for using the Kurdish Calendar package.

## Installation and Setup

### Installation

```bash
npm install kurdish-calendar
```

### TypeScript Configuration

The package includes TypeScript declarations. No additional setup is needed for TypeScript projects.

### ES Modules Support

The package uses ES Modules. In Node.js environments, ensure your `package.json` has `"type": "module"` or use the `.mjs` extension for your files.

## Core API Usage

### Basic Date Conversion

Convert a date to Kurdish calendar format:

```javascript
import { getKurdishDate, getKurdishDateByVariant, KurdishCalendarVariant } from 'kurdish-calendar';

// Using the default Rojhalat (Eastern) variant
const date = new Date('2024-03-21');
const kurdishDate = getKurdishDate(date);
console.log(kurdishDate);

// Using a specific variant
const bashurDate = getKurdishDateByVariant(date, KurdishCalendarVariant.BASHUR);
console.log(bashurDate);

// If no date is provided, current date is used
const today = getKurdishDate();
console.log(today);
```

### Working with the KurdishDateResult Object

The result of date conversions is a `KurdishDateResult` object:

```javascript
import { getKurdishDate } from 'kurdish-calendar';

const result = getKurdishDate(new Date('2024-03-21'));

// Access individual properties
console.log(`Gregorian date: ${result.gregorianDate}`);
console.log(`Kurdish date: ${result.kurdishDate}`);
console.log(`Kurdish date (Latin): ${result.kurdishDateLatin}`);
console.log(`Kurdish year: ${result.kurdishYear}`);
console.log(`Kurdish month: ${result.kurdishMonth}`);
console.log(`Kurdish month (Latin): ${result.kurdishMonthLatin}`);
console.log(`Kurdish day: ${result.kurdishDay}`);
```

### Calendar Year and Month Operations

```javascript
import { 
  isKurdishLeapYear, 
  getKurdishMonthLength, 
  KurdishCalendarVariant 
} from 'kurdish-calendar';

// Check if a Kurdish year is a leap year
const isLeap = isKurdishLeapYear(2724);
console.log(`Is 2724 a leap year? ${isLeap}`);

// Get the length of a month
const daysInMonth = getKurdishMonthLength(2724, 0, KurdishCalendarVariant.ROJHALAT);
console.log(`Days in first month of 2724 (Rojhalat): ${daysInMonth}`);

const daysInBashurMonth = getKurdishMonthLength(2024, 2, KurdishCalendarVariant.BASHUR);
console.log(`Days in March 2024 (Bashur): ${daysInBashurMonth}`);
```

## Holiday API Usage

### Retrieving Holidays

```javascript
import { 
  getAllHolidays, 
  getHolidaysForDate, 
  getHolidaysForMonth,
  getHolidaysBetweenDates,
  getUpcomingHolidays,
  getNextHoliday,
  isHoliday
} from 'kurdish-calendar';

// Get all holidays
const allHolidays = getAllHolidays();
console.log(`Total holidays: ${allHolidays.length}`);

// Get holidays for a specific date
const date = new Date('2024-03-21');
const holidaysOnDate = getHolidaysForDate(date);
console.log(`Holidays on March 21, 2024: ${holidaysOnDate.length}`);

// Get holidays for a specific month
const marchHolidays = getHolidaysForMonth(2024, 2); // Month is 0-based (0-11)
console.log(`Holidays in March 2024: ${marchHolidays.length}`);

// Get holidays between two dates
const startDate = new Date('2024-03-01');
const endDate = new Date('2024-04-30');
const springHolidays = getHolidaysBetweenDates(startDate, endDate);
console.log(`Holidays between March 1 and April 30, 2024: ${springHolidays.length}`);

// Get upcoming holidays
const upcoming = getUpcomingHolidays(new Date(), 3);
console.log('Next 3 upcoming holidays:');
upcoming.forEach(holiday => console.log(`- ${holiday.date}: ${holiday.event.en}`));

// Get the next holiday
const nextHoliday = getNextHoliday(new Date());
if (nextHoliday) {
  console.log(`Next holiday: ${nextHoliday.event.en} on ${nextHoliday.date}`);
}

// Check if a date is a holiday
const isNawroz = isHoliday(new Date('2024-03-21'));
console.log(`Is March 21, 2024 a holiday? ${isNawroz}`);
```

### Filtering Holidays

You can filter holidays by country or region:

```javascript
import { getHolidaysForMonth } from 'kurdish-calendar';

// Get holidays for a specific country
const kurdistanHolidays = getHolidaysForMonth(2024, 2, { country: 'Kurdistan' });
console.log(`Kurdistan holidays in March 2024: ${kurdistanHolidays.length}`);

// Get holidays for a specific region
const southKurdistanHolidays = getHolidaysForMonth(2024, 2, { 
  country: 'Kurdistan', 
  region: 'South Kurdistan' 
});
console.log(`South Kurdistan holidays in March 2024: ${southKurdistanHolidays.length}`);
```

### Working with Holiday Objects

The Holiday object contains rich information:

```javascript
import { getHolidaysForDate, getLocalizedText } from 'kurdish-calendar';

const nawrozDate = new Date('2024-03-21');
const holidays = getHolidaysForDate(nawrozDate);

if (holidays.length > 0) {
  const holiday = holidays[0];
  
  // Access basic information
  console.log(`Date: ${holiday.date}`);
  console.log(`Event (English): ${holiday.event.en}`);
  console.log(`Event (Kurdish): ${holiday.event.ku}`);
  console.log(`Event (Arabic): ${holiday.event.ar}`);
  console.log(`Event (Persian): ${holiday.event.fa}`);
  
  // Access notes if available
  if (holiday.note) {
    console.log(`Note: ${holiday.note.en}`);
  }
  
  // Access quote if available
  if (holiday.quote) {
    console.log(`Quote by ${holiday.quote.celebrity}: ${holiday.quote.quote.en}`);
  }
  
  // Get text in a specific language with fallback
  const eventText = getLocalizedText(holiday.event, 'ku', 'No translation available');
  console.log(`Event in Kurdish: ${eventText}`);
}
```

## Date Utilities

### Formatting Dates

```javascript
import { formatDate } from 'kurdish-calendar';

const date = new Date('2024-03-21');

// Format date in different locales
console.log(formatDate(date, 'en')); // "March 21, 2024"
console.log(formatDate(date, 'ku')); // "٢١ی ئازاری ٢٠٢٤"
console.log(formatDate(date, 'ar')); // "٢١ مارس ٢٠٢٤"
console.log(formatDate(date, 'fa')); // "۲۱ مارس ۲۰۲۴"

// With custom options
console.log(formatDate(date, 'en', { 
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})); // "Thursday, March 21, 2024"
```

### Localized Day and Month Names

```javascript
import { getLocalizedDayName, getLocalizedMonthName } from 'kurdish-calendar';

// Get day names in different languages
console.log(getLocalizedDayName('Monday', 'en')); // "Monday"
console.log(getLocalizedDayName('Monday', 'ku')); // "دووشەممە"
console.log(getLocalizedDayName('Monday', 'ar')); // "الاثنين"
console.log(getLocalizedDayName('Monday', 'fa')); // "دوشنبه"

// Get month names in different languages
console.log(getLocalizedMonthName(0, 'en')); // "January"
console.log(getLocalizedMonthName(0, 'ku')); // "کانوونی دووەم"
console.log(getLocalizedMonthName(0, 'ar')); // "يناير"
console.log(getLocalizedMonthName(0, 'fa')); // "ژانویه"
```

### Date Manipulation

```javascript
import { addDays, isSameDay, isToday } from 'kurdish-calendar';

const date = new Date('2024-03-21');

// Add days to a date
const newDate = addDays(date, 5);
console.log(newDate.toISOString()); // 2024-03-26...

// Check if two dates are the same day
const date2 = new Date('2024-03-21T12:00:00');
console.log(`Same day: ${isSameDay(date, date2)}`); // true

// Check if a date is today
console.log(`Is today: ${isToday(date)}`);
```

## KurdishCalendar Object API

For convenience, a KurdishCalendar object is provided with commonly used methods:

```javascript
import { KurdishCalendar, KurdishCalendarVariant } from 'kurdish-calendar';

// Get today's date in Kurdish format (Rojhalat)
const today = KurdishCalendar.today();
console.log(`Today (Rojhalat): ${today.kurdishDate}`);

// Get today's date in Kurdish format (Bashur)
const todayBashur = KurdishCalendar.todayBashur();
console.log(`Today (Bashur): ${todayBashur.kurdishDate}`);

// Convert a specific date
const date = new Date('2024-03-21');
const converted = KurdishCalendar.convertDate(date, KurdishCalendarVariant.ROJHALAT);
console.log(`Converted date: ${converted.kurdishDate}`);

// Get today's holidays
const todaysHolidays = KurdishCalendar.getTodaysHolidays();
console.log(`Today's holidays: ${todaysHolidays.length}`);

// Get upcoming holidays
const upcomingHolidays = KurdishCalendar.getUpcomingHolidays(5);
console.log(`Upcoming holidays: ${upcomingHolidays.length}`);
```

## Best Practices

1. **Date Input**: Always provide dates in a standard format to avoid timezone issues.

2. **Error Handling**: Add error handling when working with user input:

   ```javascript
   try {
     const userDate = new Date(userInput);
     if (isNaN(userDate.getTime())) {
       throw new Error('Invalid date input');
     }
     const kurdishDate = getKurdishDate(userDate);
     // Use kurdishDate...
   } catch (error) {
     console.error('Error converting date:', error.message);
   }
   ```

3. **Language Localization**: Always use the `getLocalizedText` function to display text in the preferred language:

   ```javascript
   import { getLocalizedText } from 'kurdish-calendar';
   
   function displayHoliday(holiday, userLanguage = 'en') {
     return {
       date: holiday.date,
       event: getLocalizedText(holiday.event, userLanguage),
       note: holiday.note ? getLocalizedText(holiday.note, userLanguage) : '',
       quote: holiday.quote ? {
         celebrity: holiday.quote.celebrity,
         text: getLocalizedText(holiday.quote.quote, userLanguage)
       } : null
     };
   }
   ```

4. **Calendar Variant**: Be explicit about which calendar variant you're using:

   ```javascript
   import { getKurdishDateByVariant, KurdishCalendarVariant } from 'kurdish-calendar';
   
   // Better to be explicit about the variant
   const rojhalatDate = getKurdishDateByVariant(date, KurdishCalendarVariant.ROJHALAT);
   const bashurDate = getKurdishDateByVariant(date, KurdishCalendarVariant.BASHUR);
   ```

5. **Performance**: If you need to work with multiple dates, use the individual functions rather than the KurdishCalendar object to avoid redundant calculations.

## Browser Compatibility

The package is compatible with modern browsers and Node.js environments that support ES Modules. For older browsers, consider using a bundler like Webpack or Rollup (with appropriate configuration for ES modules). 