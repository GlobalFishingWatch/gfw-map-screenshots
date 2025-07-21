# GFW Map Screenshots

A Node.js tool that automatically generates screenshots of Global Fishing Watch (GFW) maps using Puppeteer.

## Prerequisites

This project requires **Node.js version 24** or higher.

### Using nvm (Node Version Manager)

If you have nvm installed, the project will automatically switch to the correct Node.js version:

```bash
# The .nvmrc file will automatically use Node.js 24
nvm use
```

If you don't have Node.js 24 installed via nvm:

```bash
# Install Node.js 24
nvm install 24
nvm use 24
```

### Manual Installation

If you're not using nvm, make sure you have Node.js 24+ installed on your system.

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

## Configuration

Before running the tool, review and customize the settings in `/config.ts`:

- **URL Template**: The base URL for the GFW map with placeholders for entity IDs
- **Map Parameters**: Configure map layers, time ranges, and visualization settings
- **Data**: The tool uses data from `/data/[source].json`

## Usage

### Development Mode

For testing with TypeScript:

```bash
npm run dev
```

### Production Mode

Build and run the compiled version:

```bash
npm run build
npm start
```

## Output

Screenshots are automatically generated and saved to the `path` configuration gca with the following naming convention:

- Format: `{id}@2x.webp`
- Resolution: 500x400 pixels (configurable)
- Quality: WebP format with 50% quality for optimal file size
