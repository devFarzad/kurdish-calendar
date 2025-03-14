// Test if our exports are working correctly
import * as pkg from './dist/index.esm.js';

console.log('Available exports:', Object.keys(pkg));

// Check specific exports
const functionsToCheck = [
  'getKurdishDateByVariant',
  'isKurdishLeapYear',
  'getHolidaysForDate'
];

functionsToCheck.forEach(funcName => {
  if (funcName in pkg) {
    console.log(`✓ ${funcName} is exported`);
  } else {
    console.log(`✗ ${funcName} is NOT exported`);
  }
});

// Check the types
console.log('\nChecking enums and types:');
console.log('KurdishCalendarVariant:', pkg.KurdishCalendarVariant); 