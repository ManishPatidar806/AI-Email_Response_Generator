# Email Response Generator

A full-stack web application that leverages Google's Gemini AI to generate professional email responses with customizable tones. Built with Spring Boot backend and React frontend with modern UI components.

## 📸 Demo

### Application Screenshot
![Email Response Generator Screenshot](Resources/Screenshot%20from%202025-07-02%2018-16-52.png)

### Video Demo
https://github.com/user-attachments/assets/your-video-id-here

*Watch the full demo video: [AiEmailResponseGenerator.webm](Resources/AiEmailResponseGenerator.webm)*

> **Note**: If the video doesn't play directly in GitHub, you can download it from the Resources folder to view locally.

## 🚀 Features

- **AI-Powered Email Generation**: Uses Google Gemini 2.0 Flash model for intelligent email responses
- **Customizable Tone**: Choose from multiple tones (Professional, Friendly, Formal, Casual, Apologetic, Enthusiastic)
- **Modern UI**: Built with React, TypeScript, and Shadcn/UI components
- **Responsive Design**: Fully responsive design with Tailwind CSS
- **Copy & Download**: Easy copy-to-clipboard and download functionality
- **Real-time Generation**: Instant email response generation with loading states
- **Cross-Origin Support**: CORS enabled for seamless frontend-backend communication

## 🛠️ Tech Stack

### Backend
- **Java 21** - Modern Java features and performance
- **Spring Boot 3.4.1** - Enterprise-grade framework
- **Spring WebFlux** - Reactive programming for better performance
- **Lombok** - Reducing boilerplate code
- **Maven** - Dependency management and build tool
- **Google Gemini AI** - Advanced AI model for text generation

### Frontend
- **React 18.3.1** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Beautiful and accessible UI components
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Lucide React** - Beautiful icons

## 📋 Prerequisites

Before running this application, make sure you have:

- **Java 21** or higher
- **Node.js 18** or higher
- **Bun** package manager (or npm/yarn)
- **Google Gemini API Key** - [Get it here](https://ai.google.dev/)
- **Maven** (included with wrapper)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd EmailResponseGenerator
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd Backend
```

Configure the API key in `src/main/resources/application.properties`:
```properties
spring.application.name=Email-Response
server.port=8081

gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
gemini.api.key=YOUR_GEMINI_API_KEY_HERE
```

**⚠️ Security Note**: Never commit your API key to version control. Use environment variables in production:
```properties
gemini.api.key=${GEMINI_API_KEY}
```

Build and run the backend:
```bash
# Using Maven wrapper (recommended)
./mvnw clean install
./mvnw spring-boot:run

# Or using Maven directly
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8081`

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd Frontend
```

Install dependencies:
```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

Start the development server:
```bash
# Using Bun
bun run dev

# Or using npm
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🚦 Usage

1. **Access the Application**: Open your browser and navigate to `http://localhost:5173`

2. **Input Original Email**: Paste or type the email you want to respond to in the text area

3. **Select Tone**: Choose the appropriate tone for your response:
   - **Professional**: Formal and business-appropriate
   - **Friendly**: Warm and approachable
   - **Formal**: Very structured and official
   - **Casual**: Relaxed and informal
   - **Apologetic**: Expressing regret or sympathy
   - **Enthusiastic**: Energetic and positive

4. **Generate Response**: Click the "Generate Reply" button and wait for the AI to create your response

5. **Use the Response**: Copy to clipboard or download the generated email response

## 📁 Project Structure

```
EmailResponseGenerator/
├── README.md
├── Backend/                          # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/email/writer/
│   │   │   │   ├── EmailWriterSbApplication.java
│   │   │   │   └── app/
│   │   │   │       ├── Controller/
│   │   │   │       │   └── EmailGeneratorController.java
│   │   │   │       ├── DTO/
│   │   │   │       │   └── EmailRequest.java
│   │   │   │       └── Service/
│   │   │   │           └── EmailGeneratorService.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── mvnw                         # Maven wrapper
└── Frontend/                        # React frontend
    ├── src/
    │   ├── components/ui/           # Shadcn/UI components
    │   ├── pages/
    │   │   ├── Index.tsx           # Main email generator page
    │   │   └── NotFound.tsx
    │   ├── hooks/                  # Custom React hooks
    │   ├── lib/                    # Utility functions
    │   └── App.tsx
    ├── package.json
    └── vite.config.ts
```

## 🔌 API Documentation

### Generate Email Response

**Endpoint**: `POST /api/email/generate`

**Request Body**:
```json
{
  "originalEmail": "The email content you want to respond to",
  "tone": "professional"
}
```

**Response**:
```
Generated email response as plain text
```

**Available Tones**:
- `professional`
- `friendly`
- `formal`
- `casual`
- `apologetic`
- `enthusiastic`

## 🔒 Security Considerations

1. **API Key Management**: Store your Gemini API key as an environment variable in production
2. **CORS Configuration**: The backend currently allows all origins (`*`) - restrict this in production
3. **Input Validation**: Add proper input validation and sanitization
4. **Rate Limiting**: Implement rate limiting to prevent API abuse

## 🚀 Production Deployment

### Backend Deployment
```bash
# Build JAR file
./mvnw clean package

# Run with environment variables
java -jar target/email-writer-sb-0.0.1-SNAPSHOT.jar \
  --gemini.api.key=${GEMINI_API_KEY}
```

### Frontend Deployment
```bash
# Build for production
bun run build

# The built files will be in the `dist` directory
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.


## 📞 Support

If you encounter any issues or have questions, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

---

**Made with ❤️ by [Your Name]**