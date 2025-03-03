# Optimum Stream Interface

A comprehensive streaming service interface with advanced settings management and device configuration capabilities. The application provides a detailed, Android-like settings panel with multiple configuration options.

## Features
- Rich settings management system with multiple configuration panels
- Network and WiFi configuration
- App management with system apps support
- Remote control and accessories management
- Dark theme with professional styling
- Responsive design for various screen sizes

## Tech Stack
- React + TypeScript
- TailwindCSS
- shadcn/ui components
- Express backend
- Wouter for routing

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd optimum-stream-interface
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Deploying to GitHub Pages

1. Update the repository settings:
   - Go to your repository settings
   - Under "Pages", select the `gh-pages` branch as the source
   - Save the changes

2. Push your changes to the main branch:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

3. The GitHub Action will automatically:
   - Build the project
   - Deploy it to the gh-pages branch
   - Make it available at `https://<username>.github.io/<repository-name>/`

## Building for Production

```bash
npm run build
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
MIT