# AI-Powered To-Do App

A premium, AI-enhanced task management application built with Next.js, Tailwind CSS, and Google Gemini.

## Features

-   **Eisenhower Matrix Classification**: Tasks are categorized as Do First, Schedule, Delegate, or Delete.
-   **Manual Classification**: Users can manually set urgency and importance.
-   **Google Calendar Integration**: Click any task to create a Google Calendar event.
-   **Premium UI**: Dark mode, glassmorphism, and smooth animations.
-   **Task Management**: Create, complete, and delete tasks.

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd vast-ring
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    -   Rename `.env.example` to `.env.local`.
    -   Add your `GEMINI_API_KEY` (optional, if AI features are re-enabled).

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

## Deployment

This application is optimized for deployment on [Vercel](https://vercel.com).

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Vercel will automatically detect Next.js and configure the build settings.
4.  Deploy!

## Tech Stack

-   **Framework**: Next.js 14 (Pages Router)
-   **Styling**: Tailwind CSS, Lucide React
-   **State Management**: React Context API
-   **Storage**: LocalStorage
