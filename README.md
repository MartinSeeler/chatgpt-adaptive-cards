# ChatGPT Clone with Adaptive Cards

This project is a ChatGPT clone built with [Next.js](https://nextjs.org), [React](https://reactjs.org), [Material-UI (MUI)](https://mui.com), and [Adaptive Cards](https://adaptivecards.io/) from Microsoft. It aims to replicate the core functionality of ChatGPT while exploring innovative UI components and providing a customizable and extendable codebase.

## Features

- Chat interface similar to ChatGPT
- Integration of Microsoft's Adaptive Cards for dynamic and interactive content
- Material-UI components for a sleek, modern UI
- Next.js for server-side rendering and optimal performance
- Responsive design for desktop and mobile devices

## Technologies Used

- **Next.js**: For server-side rendering and optimal performance
- **React**: As the core library for building the user interface
- **Material-UI (MUI)**: For pre-built React components and custom theming
- **Adaptive Cards**: To create rich, interactive content within the chat interface
- **TypeScript**: For type-safe code and improved developer experience

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
  - `api/`: API routes for server-side logic
- `components/`: Reusable React components
  - `cards/`: Components related to Adaptive Cards integration
- `theme.ts`: Material-UI theme configuration
- `cards/`: Adaptive Cards related utilities and schemas

## Adaptive Cards Integration

This project showcases the integration of Microsoft's Adaptive Cards, allowing for rich, interactive content within the chat interface. Adaptive Cards provide a flexible way to present information and gather user input, enhancing the overall user experience.

### Implementation Notes

- The project uses the `adaptivecards` library to render and interact with Adaptive Cards.
- Custom components have been created to seamlessly integrate Adaptive Cards with the React and Material-UI ecosystem.
- The `cards/index.ts` file contains schemas and utilities for working with Adaptive Cards in a TypeScript environment.

## Material-UI (MUI) Usage

Material-UI is extensively used throughout the project to create a consistent and visually appealing user interface. Custom theming has been applied to align the design with the ChatGPT-like experience while maintaining the flexibility to easily modify the look and feel.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React Documentation](https://reactjs.org/docs) - learn about React.
- [Material-UI Documentation](https://mui.com/getting-started/usage/) - learn about Material-UI components and styling.
- [Adaptive Cards Documentation](https://adaptivecards.io/documentation/) - learn about creating and using Adaptive Cards.

## Contributing

Contributions are welcome! This project serves as an experimental playground for integrating various technologies. Feel free to submit Pull Requests with new features, improvements, or bug fixes.

## License

This project is open-source and available under the [MIT License](LICENSE).