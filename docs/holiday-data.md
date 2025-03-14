# Kurdish Calendar Holiday Data

This document explains the structure, management, and usage of holiday data in the Kurdish Calendar package.

## Holiday Data Structure

Each holiday in the database is represented as a `Holiday` object with the following structure:

```typescript
interface Holiday {
  date: string;               // Date in ISO format (YYYY-MM-DD)
  event: MultiLanguageText;   // Event name in multiple languages
  note?: MultiLanguageText;   // Optional notes about the event
  country?: string;           // Country associated with the event
  region?: string;            // Region within a country
  quote?: Quote;              // Optional quote related to the event
}

interface MultiLanguageText {
  en: string;                 // English text
  ku: string;                 // Kurdish text
  ar: string;                 // Arabic text
  fa: string;                 // Persian/Farsi text
}

interface Quote {
  celebrity: string;          // The name of the person quoted
  quote: MultiLanguageText;   // The quote in multiple languages
}
```

## Holiday Categories

The Kurdish Calendar package includes various types of holidays:

1. **Cultural Holidays**
   - Kurdish Clothing Day
   - Kurdish Film Day
   - Kurdish Culture Day
   - Kurdish Language Day
   - Yalda Night (Winter Solstice)

2. **Religious Holidays**
   - Eid-al-Fitr
   - Eid-al-Adha
   - Christmas

3. **Historical Commemorations**
   - Halabja Memorial Day
   - Commemoration of Chemical attack on Balisan
   - Kurdish Uprising Day
   - Mahabad Republic Day

4. **National and Political Holidays**
   - Kurdish Flag Day
   - Kurdistan Parliament Day
   - Anniversary of 11 March Agreement
   - Baghdad Liberation Day

5. **Seasonal Celebrations**
   - Nawroz (Kurdish New Year)
   - Yazidi New Year (Charshema Sor)
   - Assyrian New Year

## Holiday Dates

The current implementation includes holidays for 2024-2025. Holidays generally fall into two categories:

1. **Fixed Date Holidays** - Occur on the same date each year (e.g., Nawroz on March 21)
2. **Variable Date Holidays** - May change each year (e.g., religious holidays based on lunar calendars)

For variable date holidays, the `note` field typically contains information like "Estimated date, subject to moon sighting" to indicate the date might change.

## Accessing Holiday Data

The holiday data is accessible through several API functions:

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
```

See the [Usage Guide](./usage.md) for detailed examples of working with holiday data.

## Multilingual Support

All holiday information is available in four languages:

- **English** (`en`)
- **Kurdish** (`ku`)
- **Arabic** (`ar`)
- **Persian/Farsi** (`fa`)

You can retrieve the text in a specific language using the `getLocalizedText` function:

```javascript
import { getAllHolidays, getLocalizedText } from 'kurdish-calendar';

const holidays = getAllHolidays();
const holidayInKurdish = holidays.map(holiday => ({
  date: holiday.date,
  event: getLocalizedText(holiday.event, 'ku'),
  note: holiday.note ? getLocalizedText(holiday.note, 'ku') : '',
  quote: holiday.quote ? {
    celebrity: holiday.quote.celebrity,
    text: getLocalizedText(holiday.quote.quote, 'ku')
  } : null
}));
```

## Quotes

Many holidays include quotes from Kurdish leaders, poets, and cultural figures, including:

- **Jalal Talabani** - Former President of Iraq and founder of the Patriotic Union of Kurdistan
- **Masoud Barzani** - Former President of Iraqi Kurdistan and leader of the Kurdistan Democratic Party
- **Sherko Bekas** - Renowned Kurdish poet and writer

These quotes provide cultural context and significance for the holidays and are provided in all four supported languages.

## Contributing Holiday Data

If you want to contribute additional holiday data or correct existing entries:

1. Holidays are stored in the `src/core/holidays.ts` file as a constant array.
2. Follow the existing format for consistency.
3. Provide translations for all four languages.
4. Include a descriptive note if the holiday date is variable.
5. If adding a quote, ensure it is relevant to the holiday and properly attributed.

Example of adding a new holiday:

```typescript
{
  date: "YYYY-MM-DD",
  event: {
    en: "Holiday Name in English",
    ku: "Holiday Name in Kurdish",
    ar: "Holiday Name in Arabic",
    fa: "Holiday Name in Persian"
  },
  note: {
    en: "Descriptive note in English",
    ku: "Descriptive note in Kurdish",
    ar: "Descriptive note in Arabic",
    fa: "Descriptive note in Persian"
  },
  country: "Kurdistan", // Optional
  region: "South Kurdistan", // Optional
  quote: {
    celebrity: "Person's Name",
    quote: {
      en: "Quote in English",
      ku: "Quote in Kurdish",
      ar: "Quote in Arabic",
      fa: "Quote in Persian"
    }
  }
}
```

## Future Enhancements

Potential enhancements for the holiday data system:

1. **External Data Storage** - Move holiday data to external JSON files for easier maintenance
2. **Calendar-Based Calculation** - Implement automatic calculation of variable date holidays
3. **Additional Metadata** - Add more metadata like holiday type, importance level, etc.
4. **Regional Variants** - Support regional variations in how holidays are observed 