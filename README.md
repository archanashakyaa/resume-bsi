# Resume Builder with AI Enhancement

A modern, full-stack resume builder application with AI-powered content enhancement, multiple templates, and PDF generation capabilities.

## Features

- **Multi-step Resume Builder**: Guided step-by-step resume creation process
- **AI Content Enhancement**: Powered by Groq API for grammar correction and content improvement
- **Multiple Templates**: Modern, Professional, Minimal, and Elegant resume templates
- **Live Preview**: Real-time resume preview with template switching
- **PDF Generation**: High-quality PDF export with pixel-perfect rendering
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **GitHub Integration**: Include GitHub profile links in your resume

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router** for navigation
- **Context API** for state management

### Backend
- **Flask** (Python) for API server
- **ReportLab** for PDF generation
- **Playwright** for pixel-perfect PDF rendering
- **python-docx** for DOCX generation
- **Groq API** for AI enhancement

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd resume-bsi
```

### 2. Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install Playwright browsers (for PDF generation)
playwright install chromium
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd react-frontend

# Install dependencies
npm install

# Build the frontend
npm run build
```

### 4. Environment Configuration

Create a `.env` file in the root directory:

```env
# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here
MODEL_NAME=meta-llama/llama-4-scout-17b-16e-instruct

# Flask Configuration
FLASK_SECRET_KEY=your_secret_key_here
```

**Note**: Get your Groq API key from [Groq Console](https://console.groq.com/)

## Usage

### 1. Start the Backend Server

```bash
# From the root directory
python app.py
```

The backend will start on `http://localhost:5000`

### 2. Start the Frontend Development Server

```bash
# From the react-frontend directory
npm run dev
```

The frontend will start on `http://localhost:8080`

### 3. Access the Application

Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
resume-bsi/
├── app.py                          # Flask backend server
├── requirements.txt                # Python dependencies
├── .env                           # Environment variables
├── react-frontend/                # React frontend
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── resume/           # Resume-specific components
│   │   │   │   ├── forms/        # Form components
│   │   │   │   └── templates/    # Resume templates
│   │   │   └── ui/               # UI components
│   │   ├── pages/                # Page components
│   │   ├── context/              # React context
│   │   └── App.tsx               # Main App component
│   ├── package.json              # Frontend dependencies
│   └── vite.config.ts            # Vite configuration
├── templates/                     # Flask templates (legacy)
└── README.md                      # This file
```

## API Endpoints

### Backend Endpoints

- `POST /enhance` - Enhance resume sections with AI
- `POST /api/generate-pdf` - Generate PDF from resume data
- `POST /api/generate` - Generate DOCX from resume data
- `GET /health` - Health check endpoint
- `GET /app` - Serve React application

### Frontend Routes

- `/` - Main resume builder page
- `/multistep/personal` - Personal information step
- `/multistep/experience` - Work experience step
- `/multistep/education` - Education step
- `/multistep/skills` - Skills step
- `/multistep/projects` - Projects step
- `/multistep/review` - Review and download step
- `/print` - Print page for PDF generation

## Resume Templates

### 1. Modern Template
- Clean, contemporary design
- Blue color scheme
- Bold section headings
- Professional layout

### 2. Professional Template
- Traditional business style
- Sky blue accents
- Structured format
- Corporate-friendly

### 3. Minimal Template
- Simple, clean design
- Gray color scheme
- Minimalist approach
- Focus on content

### 4. Elegant Template
- Sophisticated design
- Purple accents
- Sidebar layout
- Premium appearance

## AI Enhancement Features

The AI enhancement system uses Groq API to improve resume content:

- **Grammar Correction**: Fixes spelling, grammar, and punctuation
- **Content Improvement**: Enhances clarity and professionalism
- **Capitalization**: Ensures proper sentence capitalization
- **Length Control**: Maintains appropriate word counts per section
- **Template Consistency**: Preserves formatting and structure

### Supported Sections

- Professional Summary
- Work Experience
- Education
- Skills
- Projects
- Certifications
- Achievements

## PDF Generation

The application supports two PDF generation methods:

1. **Playwright (Primary)**: Pixel-perfect rendering using headless browser
2. **ReportLab (Fallback)**: Server-side PDF generation with custom styling

### PDF Features

- Template-specific styling
- Proper bullet point formatting
- Consistent typography
- Professional layout
- High-quality output

## Development

### Running in Development Mode

```bash
# Terminal 1 - Backend
python app.py

# Terminal 2 - Frontend
cd react-frontend
npm run dev
```

### Building for Production

```bash
# Build frontend
cd react-frontend
npm run build

# Start production server
python app.py
```

## Troubleshooting

### Common Issues

1. **Groq API Errors**
   - Verify API key is correct
   - Check API quota and limits
   - Ensure model name is valid

2. **PDF Generation Issues**
   - Install Playwright browsers: `playwright install chromium`
   - Check browser permissions
   - Verify template data is valid

3. **Frontend Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility
   - Verify all dependencies are installed

4. **Backend Connection Issues**
   - Ensure Flask server is running on port 5000
   - Check firewall settings
   - Verify proxy configuration in vite.config.ts

### Environment Variables

Make sure all required environment variables are set:

```bash
# Check if variables are loaded
python -c "import os; print('GROQ_API_KEY:', 'SET' if os.getenv('GROQ_API_KEY') else 'NOT SET')"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:

1. Check the troubleshooting section
2. Review the API documentation
3. Open an issue on GitHub
4. Contact the development team

## Changelog

### Version 1.0.0
- Initial release
- Multi-step resume builder
- AI enhancement with Groq API
- Four resume templates
- PDF generation with Playwright
- Responsive design
- GitHub integration

---

**Note**: This application requires an active internet connection for AI enhancement features. The Groq API key is required for content improvement functionality.
