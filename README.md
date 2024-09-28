# ChatGPT Clone

This project is a ChatGPT clone built with [Next.js](https://nextjs.org), [React](https://reactjs.org), and [Material-UI](https://mui.com). It aims to replicate the core functionality of ChatGPT while providing a customizable and extendable codebase.

## Features

- Chat interface similar to ChatGPT
- Material-UI components for a sleek, modern UI
- Next.js for server-side rendering and optimal performance
- Responsive design for desktop and mobile devices

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the main application code
  - `page.tsx`: The main chat interface
  - `layout.tsx`: The root layout component
  - `globals.css`: Global styles
- `theme.ts`: Material-UI theme configuration

## Adaptive Cards

Adaptive Cards from Microsoft are used as additional chat interface in this project.

### Tools Used

To convert the TypeScript schema for Adaptive Cards to a Zod schema, I used the [transform.tools TypeScript to Zod converter](https://transform.tools/typescript-to-zod). This allows the schema to be used as a tool for the LLM.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React Documentation](https://reactjs.org/docs) - learn about React.
- [Material-UI Documentation](https://mui.com/getting-started/usage/) - learn about Material-UI components and styling.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.