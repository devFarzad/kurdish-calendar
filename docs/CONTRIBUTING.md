# Contributing to the Kurdish Calendar Package

Thank you for considering contributing to the Kurdish Calendar package! This guide will help you understand the contribution process and get you started on making valuable additions to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Pull Request Process](#pull-request-process)
5. [Style Guidelines](#style-guidelines)
6. [Project Structure](#project-structure)
7. [Testing](#testing)
8. [Documentation](#documentation)
9. [Internationalization](#internationalization)
10. [Common Tasks](#common-tasks)

## Code of Conduct

Our project is committed to providing a welcoming and inclusive environment for all contributors. We expect everyone to treat each other with respect and courtesy. Any form of harassment, discrimination, or disrespectful behavior will not be tolerated.

## Getting Started

1. **Fork the repository**
   - Click the "Fork" button at the top-right of the repository page.

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/kurdish-calendar.git
   cd kurdish-calendar
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a branch for your changes**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. **Setup your development environment**
   - Make sure you have Node.js v18 or higher installed
   - We recommend using VS Code with the following extensions:
     - ESLint
     - Prettier
     - TypeScript Extension Pack

2. **Make your changes**
   - Write your code
   - Add tests for your changes
   - Run tests to ensure everything works

3. **Run tests and linting**
   ```bash
   npm test
   npm run lint
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your detailed commit message here"
   ```
   
   We follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:
   - `feat:` - A new feature
   - `fix:` - A bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code changes that neither fix bugs nor add features
   - `test:` - Adding or modifying tests
   - `chore:` - Changes to the build process or auxiliary tools

6. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

## Pull Request Process

1. **Open a Pull Request (PR)**
   - Go to the original repository and click "New pull request"
   - Select your fork and the branch with your changes
   - Fill out the PR template with details about your changes

2. **PR Review Process**
   - A maintainer will review your PR
   - Address any feedback or requested changes
   - Once approved, a maintainer will merge your PR

3. **After your PR is merged**
   - Update your fork with the latest changes from the main repository
   - Delete your feature branch

## Style Guidelines

We maintain code quality and consistency through:

1. **TypeScript**
   - Use strict typing, avoid `any` where possible
   - Follow interface and type naming conventions

2. **Linting**
   - We use ESLint with TypeScript rules
   - Run `npm run lint` to check your code

3. **Formatting**
   - We use Prettier for consistent formatting
   - Run `npm run format` to format your code

4. **Naming Conventions**
   - Use camelCase for variables and functions
   - Use PascalCase for classes, interfaces, and types
   - Use UPPER_CASE for constants

## Project Structure

```
kurdish-calendar/
├── src/                 # Source code
│   ├── core/            # Core functionality
│   ├── index.ts         # Public API exports
├── data/                # Static data files
├── dist/                # Built package (generated)
├── docs/                # Documentation
├── tests/               # Test files
├── package.json         # Package configuration
├── tsconfig.json        # TypeScript configuration
├── rollup.config.js     # Rollup bundler configuration
└── README.md            # Project overview
```

## Testing

We use Jest for testing. All code should be covered by tests:

1. **Run tests**
   ```bash
   npm test
   ```

2. **Test coverage**
   ```bash
   npm run test:coverage
   ```

3. **Writing tests**
   - Place test files in the `tests/` directory
   - Name files with `.test.ts` suffix
   - Aim for high coverage of your code

## Documentation

Good documentation is essential for our project:

1. **Code Comments**
   - Add JSDoc comments to functions and classes
   - Explain complex logic within the code

2. **README and Docs**
   - Update README.md if your changes affect usage
   - Add or update documentation in the `docs/` directory
   - Document new features or API changes

3. **Examples**
   - Provide usage examples for new features

## Internationalization

Our project supports multiple languages. When adding text:

1. **Always provide translations for all supported languages**
   - English (en)
   - Kurdish (ku)
   - Arabic (ar)
   - Persian/Farsi (fa)

2. **Use the MultiLanguageText interface**
   ```typescript
   const newText: MultiLanguageText = {
     en: "English text",
     ku: "Kurdish text",
     ar: "Arabic text",
     fa: "Persian text"
   };
   ```

## Common Tasks

### Adding a New Holiday

1. Edit `src/core/holidays.ts`
2. Add a new holiday object following the format:
   ```typescript
   {
     date: "YYYY-MM-DD",
     event: {
       en: "Holiday Name in English",
       ku: "Holiday Name in Kurdish",
       ar: "Holiday Name in Arabic",
       fa: "Holiday Name in Persian"
     },
     // Optional fields
     note: {
       en: "Note in English",
       ku: "Note in Kurdish",
       ar: "Note in Arabic",
       fa: "Note in Persian"
     },
     country: "Country Name",
     region: "Region Name",
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
3. Add appropriate tests in `tests/holidays.test.ts`

### Fixing a bug

1. Create a test case that reproduces the bug
2. Fix the bug in the relevant source file
3. Verify that your test passes
4. Document the fix in your PR

### Adding a new feature

1. Discuss the feature in an issue first
2. Implement the feature with tests
3. Update documentation to reflect the new feature
4. Submit a PR with a clear description of the feature

## Questions?

If you have any questions or need help, please open an issue or reach out to the maintainers.

Thank you for contributing to the Kurdish Calendar package! 