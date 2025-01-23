# Noc_Noc_Smoke_Test

End-to-end test automation for NocNoc website using Playwright.

## Getting Started

### Prerequisites

Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

## Installation

```sh
# Clone repository
git clone https://github.com/Pheekay/Noc_Noc_Smoke_Test.git

# Navigate to project
cd Noc_Noc_Smoke_Test

# Install dependencies
npm install
```

### Key Components:
- `pages/`: Page Object Models for test automation
- `src/testData/`: Test data and constants
- `src/testIds/`: Selectors and test IDs
- `tests/`: Test specifications and suites

### Main Features:
- Authentication tests
- Homepage navigation
- Header/Footer verification
- Registration flow

### Running Tests

To run the Playwright tests, use the following command:
```sh
npx playwright test
