# Publishing the Kurdish Calendar Package

This document provides instructions for publishing the Kurdish Calendar package to npm.

## Prepublication Checklist

1. ✅ Ensure all tests pass:
   ```bash
   npm test
   ```

2. ✅ Verify the TypeScript declarations work correctly:
   ```bash
   npx tsc test-types.ts --noEmit
   ```

3. ✅ Test the build process:
   ```bash
   npm run build
   ```

4. ✅ Check the exports are working correctly:
   ```bash
   node test-exports.mjs
   ```

5. ✅ Update version number in `package.json` (done: version 1.0.4)

## Publishing Steps

1. Make sure you're logged in to npm:
   ```bash
   npm login
   ```

2. Run the publish command:
   ```bash
   npm publish
   ```

   If this is the first time publishing this package:
   ```bash
   npm publish --access public
   ```

## Post-Publication Verification

After publishing, verify the package works correctly by installing it in a test project:

1. Create a test directory:
   ```bash
   mkdir test-kurdish-calendar
   cd test-kurdish-calendar
   npm init -y
   ```

2. Install the published package:
   ```bash
   npm install kurdish-calendar
   ```

3. Create a test file (test.js):
   ```javascript
   import { getKurdishDateByVariant, KurdishCalendarVariant } from 'kurdish-calendar';
   
   const date = new Date();
   const kurdishDate = getKurdishDateByVariant(date, KurdishCalendarVariant.ROJHALAT);
   console.log('Kurdish date:', kurdishDate);
   ```

4. Run the test:
   ```bash
   node test.js
   ```

## Troubleshooting

If you encounter any issues:

1. **TypeScript errors in consuming projects**: Ensure the type definitions are being correctly exported and included in the published package.

2. **Missing exports**: Verify that all functions are properly exported in `src/index.ts` and that the rollup configuration is correctly bundling them.

3. **Module resolution errors**: Check that the `exports` field in `package.json` is correctly configured for both ESM and CommonJS environments.

4. **Publishing errors**: Make sure you have the correct npm permissions and that the package name is available. 