import {
  getKurdishDate,
  getKurdishDateByVariant,
  KurdishCalendarVariant,
  isKurdishLeapYear,
  getKurdishMonthLength,
  getAllHolidays,
  getHolidaysForDate,
  formatDate,
  isHoliday,
  KurdishCalendar
} from '../src';

describe('Kurdish Calendar Core Functions', () => {
  test('getKurdishDate should convert Gregorian to Kurdish date', () => {
    const date = new Date('2024-03-21');
    const kurdishDate = getKurdishDate(date);
    
    expect(kurdishDate).toBeDefined();
    expect(kurdishDate.kurdishYear).toBe(2724);
    expect(kurdishDate.kurdishMonth).toBeDefined();
    expect(kurdishDate.kurdishDay).toBe(1);
  });
  
  test('getKurdishDateByVariant should support Rojhalat calendar', () => {
    const date = new Date('2024-03-21');
    const kurdishDate = getKurdishDateByVariant(date, KurdishCalendarVariant.ROJHALAT);
    
    expect(kurdishDate).toBeDefined();
    expect(kurdishDate.kurdishYear).toBe(2724);
    expect(kurdishDate.kurdishDay).toBe(1);
  });
  
  test('getKurdishDateByVariant should support Bashur calendar', () => {
    const date = new Date('2024-03-21');
    const kurdishDate = getKurdishDateByVariant(date, KurdishCalendarVariant.BASHUR);
    
    expect(kurdishDate).toBeDefined();
    expect(kurdishDate.kurdishYear).toBe(2024);
    expect(kurdishDate.kurdishDay).toBe(21);
  });
  
  test('isKurdishLeapYear should identify leap years correctly', () => {
    expect(isKurdishLeapYear(2723)).toBe(false);
    expect(isKurdishLeapYear(2724)).toBe(true);
  });
  
  test('getKurdishMonthLength should return correct days in month', () => {
    expect(getKurdishMonthLength(2724, 1, KurdishCalendarVariant.ROJHALAT)).toBe(31);
    expect(getKurdishMonthLength(2724, 12, KurdishCalendarVariant.ROJHALAT)).toBe(30); // Leap year
    expect(getKurdishMonthLength(2723, 12, KurdishCalendarVariant.ROJHALAT)).toBe(29); // Non-leap year
    
    expect(getKurdishMonthLength(2024, 1, KurdishCalendarVariant.BASHUR)).toBe(29); // February in leap year
    expect(getKurdishMonthLength(2024, 0, KurdishCalendarVariant.BASHUR)).toBe(31); // January
  });
});

describe('Holiday Functions', () => {
  test('getAllHolidays should return holidays array', () => {
    const holidays = getAllHolidays();
    expect(Array.isArray(holidays)).toBe(true);
    expect(holidays.length).toBeGreaterThan(0);
  });
  
  test('getHolidaysForDate should filter holidays by date', () => {
    const date = new Date('2024-03-21');
    const holidays = getHolidaysForDate(date);
    
    expect(Array.isArray(holidays)).toBe(true);
    if (holidays.length > 0) {
      expect(holidays[0].date).toBe('2024-03-21');
    }
  });
  
  test('isHoliday should check if a date is a holiday', () => {
    // This test depends on the actual holiday data
    // We're testing the function behavior, not specific dates
    const result = isHoliday(new Date());
    expect(typeof result).toBe('boolean');
  });
});

describe('Date Utilities', () => {
  test('formatDate should format dates according to locale', () => {
    const date = new Date('2024-03-21');
    
    const enFormat = formatDate(date, 'en');
    expect(typeof enFormat).toBe('string');
    expect(enFormat).toContain('March');
    
    const otherFormat = formatDate(date, 'ku');
    expect(typeof otherFormat).toBe('string');
  });
});

describe('KurdishCalendar Object API', () => {
  test('today() should return today in Kurdish format', () => {
    const today = KurdishCalendar.today();
    expect(today).toBeDefined();
    expect(today.kurdishYear).toBeGreaterThan(2700); // Kurdish year should be around 2724 in 2024
  });
  
  test('todayBashur() should return today in Bashur format', () => {
    const today = KurdishCalendar.todayBashur();
    expect(today).toBeDefined();
    expect(today.kurdishYear).toBe(new Date().getFullYear());
  });
  
  test('convertDate() should convert dates', () => {
    const date = new Date('2024-03-21');
    const kurdishDate = KurdishCalendar.convertDate(date, KurdishCalendarVariant.ROJHALAT);
    
    expect(kurdishDate).toBeDefined();
    expect(kurdishDate.kurdishYear).toBe(2724);
  });
  
  test('getTodaysHolidays() should return array', () => {
    const holidays = KurdishCalendar.getTodaysHolidays();
    expect(Array.isArray(holidays)).toBe(true);
  });
  
  test('getUpcomingHolidays() should return specified number of holidays', () => {
    const count = 3;
    const holidays = KurdishCalendar.getUpcomingHolidays(count);
    expect(Array.isArray(holidays)).toBe(true);
    expect(holidays.length).toBeLessThanOrEqual(count);
  });
}); 