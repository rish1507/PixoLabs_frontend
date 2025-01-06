# PixoLabs

PixoLabs is a modern web application that helps automate email communications and interactions using AI. The application provides a seamless interface for managing and automating email responses with smart AI assistance.

## Features

- **Google Authentication**: Secure login using Google credentials
- **Email Automation**: AI-powered email response generation
- **Interactive UI**: Modern, responsive interface with dark/light mode support
- **Real-time Updates**: Instant email previews and modifications
- **Multiple Edit Options**: Manual editing and AI-assisted editing capabilities
- **Feedback System**: Built-in system for rating and providing feedback

## Technology Stack
- **Frontend Framework**: React.js 18
- **Build Tool**: Vite
- **Routing**: React Router Dom v7
- **Styling**: CSS with responsive design
- **Icons**: 
  - FontAwesome
  - Lucide React
  - React Icons
- **UI Components**: Material-UI (@mui/material)
- **HTTP Client**: Axios
- **Authentication**: Google OAuth

## Prerequisites

Before running this project, make sure you have:

- Node.js (Latest LTS version)--- link for download--https://nodejs.org/en
- npm (comes with Node.js)
- A Google Cloud Platform account (for authentication)
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd pixolabs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your configuration:
   ```env
   VITE_API_URL=your_api_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

##  Front end -- Project Structure

```
pixolabs/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar/
│   │   └── Footer/
│   ├── Pages/             # Main page components
│   │   ├── Home/
│   │   ├── Login/
│   │   └── Message/
│   ├── context/           # React context providers
│   ├── utils/             # Utility functions
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── public/               # Static assets
└── package.json         # Project dependencies and scripts
```

## Component Documentation

### App.jsx
**Purpose**: Main application component that handles routing and background theming.
- Implements React Router for navigation
- Manages page routes (Home, Demo, Message, Register, Login)
- Includes BackgroundProvider for dynamic theming
- Handles protected routes and authentication

### Start.jsx (Demo Page)
**Purpose**: Demonstrates email automation capabilities.
- Mock interface for email interaction
- Message approval system
- Example responses and actions
- User input handling and state management

### Register.jsx
**Purpose**: User registration functionality.
- Google OAuth integration
- Password validation
- Error handling
- Form state management

### AuthCallback.jsx
**Purpose**: OAuth authentication callback handler.
- Processes Google authentication
- Manages token storage
- Handles authentication redirects
- Error state management

### EmailComponents.jsx
**Purpose**: Reusable email-related components.
- EmailItem: Individual email display
- GeneratedEmailContent: Email generation modal
- Action buttons for email management

### Modals.jsx
**Purpose**: Modal components collection.
1. GenerateEmailModal: Email generation interface
2. AIEditModal: AI-assisted editing
3. ManualEditModal: Manual email editing
4. FeedbackModal: User feedback collection

### Navbar.jsx
**Purpose**: Navigation component.
- Responsive design (mobile/desktop)
- Dynamic navigation links
- Social media integration
- Animated mobile menu

### HeroSection.jsx
**Purpose**: Main landing page hero section component.
- Dynamic content based on authentication state
- Video demonstration integration
- Waitlist registration functionality
- Material-UI dialog integration

**Key Features**:
- Conditional navigation based on authentication
- Embedded video player
- Waitlist form with email collection
- Responsive design for various screen sizes

### HowItWorks.jsx
**Purpose**: Explains the platform's functionality with interactive sections.
- Interactive workflow cards
- Code examples with syntax highlighting
- Visual demonstrations
- Feature breakdowns

**Key Features**:
- Section toggling with active states
- Syntax highlighting using highlight.js
- Icon integration with react-icons
- Python code examples
- Message interface demonstration

### Footer.jsx
**Purpose**: Website footer component with legal links and copyright information.
- Copyright display
- Legal document links
- PDF document handling

**Key Features**:
- Privacy policy PDF integration
- Dynamic year in copyright
- External document handling
- Responsive link layout

### Implementation Details
- **State Management**: Uses React hooks and context
- **Styling**: Component-specific CSS with responsive design
- **Error Handling**: Comprehensive validation and error management
- **Security**: Protected routes and OAuth integration
- **External Integrations**: 
  - Material-UI components
  - Highlight.js for code formatting
  - PDF document handling
  - Video playback

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## Configuration

The application uses several configuration files:

- `vite.config.js` - Vite configuration
- `vercel.json` - Vercel deployment configuration
- `.eslintrc.js` - ESLint configuration

## Deployment

The application is configured for deployment on Vercel with the following features:

- Automatic redirects configuration
- SPA routing support
- API proxy setup

## API Integration

The application integrates with a backend API using Axios. The base configuration can be found in `utils/axios.js`, which includes:

- Base URL configuration
- Authentication token management
- Request/Response interceptors

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

