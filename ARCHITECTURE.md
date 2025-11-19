# 🏗️ Architecture Overview

CupidBrand is a Single Page Application (SPA) built with React that functions as a linear state machine. It collects user data step-by-step and submits a single aggregate request to the Google Gemini API to generate a structured JSON response.

## 🔄 Application Flow

The application state is managed in `App.tsx` via the `AppState` enum:

1.  **INTRO**: Landing page (`Introduction.tsx`).
2.  **INTERVIEW**: Multi-step form wizard (`Interview.tsx`).
    *   *Step 1*: Demographics (Name, Age, Profession).
    *   *Step 2*: Psychographics (Hobbies, Vibe).
    *   *Step 3*: Goals (Target Partner, Tone selection).
    *   *Step 4*: Media (Image Base64 encoding).
3.  **LOADING**: Displays a pulsing heart animation while waiting for the AI response.
4.  **RESULTS**: Renders the parsed JSON data into a tabbed dashboard (`Results.tsx`).
5.  **ERROR**: Error handling state if the API call fails or validation errors occur.

## 🧠 AI Integration Strategy

### Service Layer (`services/gemini.ts`)
We use the **Google GenAI SDK** to interface with the model.

*   **Model**: `gemini-2.5-flash` (Chosen for speed and multimodal capabilities).
*   **Input**:
    *   **Text**: A structured prompt containing user details and specific instructions.
    *   **Images**: User photos are converted to Base64 and sent as inline data parts.
*   **Output Configuration**:
    *   `responseMimeType`: `application/json`
    *   `responseSchema`: A strict TypeScript-defined schema ensures the AI returns data exactly as the UI expects it, preventing parsing errors.

### Data Schema
The AI is instructed to return a `DatingProfileResult` object containing:
*   `brandIdentity`: Archetype, Tagline, Color Palette.
*   `bios`: Variations for different lengths and apps (Tinder, Bumble, Hinge).
*   `photoAdvice`: "Keep", "Discard", and "New Ideas" lists.
*   `optimization`: Q&A Prompts and Openers.

## 📂 Directory Structure

```
/
├── App.tsx                 # Main State Machine
├── types.ts                # Shared Interfaces & Enums
├── index.tsx               # Entry point
├── index.html              # HTML shell & Import Maps
├── services/
│   └── gemini.ts           # API interaction logic & Schema definition
└── components/
    ├── Introduction.tsx    # Landing View
    ├── Interview.tsx       # Data Collection Wizard
    └── Results.tsx         # Data Visualization Dashboard
```

## 🎨 Design System

*   **Styling**: Utility-first CSS using Tailwind.
*   **Typography**: `Playfair Display` for headings (Romantic/Classy feel) and `Inter` for UI text (Clean/Modern).
*   **Color Palette**: Primary `Rose-500` for branding, `Slate-900` for text, and soft gradients for backgrounds.
*   **Responsiveness**: Mobile-first design approach. The `Interview` component uses a fixed step-progress header, while `Results` uses a tabbed interface on mobile and a grid layout on desktop.