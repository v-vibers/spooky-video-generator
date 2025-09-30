# 👻 Spooky Video Generator

A production-ready AI-powered application for generating spooky and horror-themed videos using the Subscribe.dev platform.

## Features

- 🎬 **AI Video Generation**: Generate custom spooky videos using the wan-video/wan-2.2-5b-fast model
- 👤 **Authentication**: Secure sign-in/sign-out flow powered by Subscribe.dev
- 💳 **Subscription Management**: Built-in Stripe integration for plan management
- ⚡ **Usage Tracking**: Real-time credit balance and usage monitoring
- 💾 **Cloud Storage**: Persistent video generation history with automatic sync
- 🎨 **8 Spooky Themes**: Pre-defined horror themes for quick generation
- 📱 **Responsive Design**: Fully responsive UI that works on all devices
- 🔄 **Error Handling**: Comprehensive error handling with user-friendly messages
- 🎯 **Loading States**: Professional loading animations and progress indicators

## Tech Stack

- **React 18.2.0** - UI framework (required by Subscribe.dev)
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Subscribe.dev React SDK** - AI models, auth, billing, storage

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- A Subscribe.dev account and project token

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd spooky-video-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root:
```env
VITE_SUBSCRIBE_DEV_PROJECT_TOKEN=your_project_token_here
```

Get your project token from [subscribe.dev](https://subscribe.dev) dashboard.

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## Usage

1. **Sign In**: Click the "Sign In to Continue" button to authenticate
2. **Generate Video**:
   - Enter a custom spooky scene description, or
   - Click one of the pre-defined spooky themes
3. **Watch & Download**: View your generated video and download it
4. **History**: Access your recently generated videos from the history section
5. **Manage Plan**: Click "Manage Plan" to upgrade or manage your subscription

## Architecture

The application follows Subscribe.dev best practices:

- **Component Separation**: Authentication states are handled with separate components to avoid React Hooks violations
- **Error Handling**: All API calls wrapped in try/catch with specific error type handling
- **Loading States**: Comprehensive loading indicators for all async operations
- **Storage Sync**: Cloud-synced user data with sync status indicators
- **Responsive Design**: Mobile-first CSS with breakpoints for all screen sizes

### Key Components

- `App.tsx` - Main app component with authentication routing
- `SignInScreen.tsx` - Unauthenticated landing page
- `SpookyVideoGenerator.tsx` - Main video generation interface (authenticated only)

## Error Handling

The app handles common errors gracefully:

- **Insufficient Credits**: Shows upgrade prompt with direct link to subscription management
- **Rate Limiting**: Displays retry timer with seconds remaining
- **Network Errors**: Shows user-friendly error message with retry option
- **Auth Errors**: Redirects to sign-in screen

## Environment Variables

- `VITE_SUBSCRIBE_DEV_PROJECT_TOKEN` - Your Subscribe.dev project token (required)

## VGit Workflows

This repository includes the following VGit workflows:

- **Create Feature**: Implement new features using AI assistance
- **Ask Codebase**: Get AI-powered answers about your code
- **Merge Branch**: Safely merge branches with validation
- **Deploy Preview**: Automated preview deployments

## License

MIT

---

*Generated with [VGit](https://vgit.app) 🤖*
