# 💘 CupidBrand - AI Dating Consultant

**CupidBrand** is an AI-powered personal branding expert for dating profiles. It analyzes a user's personality, vibe, and photos to craft a consistent, attractive, and authentic dating persona across multiple platforms (Tinder, Bumble, Hinge).

## ✨ Features

*   **Brand Identity Generation**: Determines your romantic "archetype" (e.g., The Intellectual Adventurer), emotional vibe, and aesthetic color palette.
*   **Bio Rewriting**: Generates multiple bio variations (Short, Medium, Long) and platform-specific versions based on a selected tone (Bold, Funny, Classy, etc.).
*   **AI Photo Audit**: Analyzes uploaded photos to provide constructive feedback on what to keep, what to discard, and ideas for new shots.
*   **Profile Optimization**: Provides winning opening lines, answers to common prompt questions, and a list of "Red Flags" to avoid.

## 🛠️ Tech Stack

*   **Frontend**: React 19, TypeScript
*   **Styling**: Tailwind CSS (via CDN for lightweight setup)
*   **AI Model**: Google Gemini 2.5 Flash (via `@google/genai` SDK)
*   **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
You need a **Google Gemini API Key**. You can get one for free at [Google AI Studio](https://aistudio.google.com/).

### Installation

1.  **Clone the repository**
2.  **Install dependencies** (if moving to a local build environment like Vite):
    ```bash
    npm install
    ```
3.  **Environment Setup**:
    Ensure your environment enables access to `process.env.API_KEY`.
    *   If using **Vite**: Create a `.env` file and add `VITE_API_KEY=your_key`, then update `services/gemini.ts` to use `import.meta.env.VITE_API_KEY`.
    *   If using **Google Cloud / IDX**: Use the integrated environment variable manager.

### Usage

1.  **Introduction**: Click "Build My Brand" to start.
2.  **Interview**:
    *   **Basics**: Name, Age, Profession.
    *   **Personality**: Hobbies and Vibe.
    *   **Goals**: Target partner description and Tone selection.
    *   **Photos**: Upload up to 3 images for analysis.
3.  **Analysis**: The app sends this data to Gemini 2.5 Flash.
4.  **Results**: View your comprehensive dating brand kit.

## 🔒 Privacy Note

This application processes text and images using the Google Gemini API. Ensure you comply with Google's [Generative AI User Data Policy](https://policies.google.com/terms/generative-ai/user-data-policy).