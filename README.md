🎬 TMDB Clone — Media Application

Frontend application for browsing movies and TV content using the TMDB API.

This project focuses not only on UI implementation but on architecture, state management, and system design principles.

👨‍💻 About

I am a Software Development Engineer (SDE) focused on building scalable frontend systems and understanding how tools work under the hood.

This project represents a deliberate approach:
- building features without abstractions first
- then evolving the system with modern tools
- finally transitioning to full type safety

🎯 Goals

This project is being developed in multiple stages:

1. Classic Redux Implementation (current)
- manual Redux setup (without Redux Toolkit)
- async logic via Thunks
- full control over state flow
- no hidden abstractions

2. Modernization (planned)
- Redux Toolkit
- createSlice / createAsyncThunk
- RTK Query

3. TypeScript Migration (planned)
- fully typed API layer
- typed store and selectors
- safer and more maintainable codebase

🏗 Architecture

The application follows a layered architecture:

core → → shared → blocks → layout → pages 

Principles:
- UI is decoupled from data fetching
- all async logic lives in Redux (thunks)
- components are split by responsibility
- no direct API calls inside UI

⚙️ Tech Stack
- React (functional components)
- Redux (classic)
- Redux Thunk
- scss (BEM)
- custom utility functions
- custom UI components

🧭 Long-Term Vision

This project is an evolution path:
- from manual Redux → modern state management
- from JavaScript → TypeScript
- from feature development → system design

💬 Final Note

This is not just a pet project.

It is a demonstration of:
- architectural thinking
- understanding of trade-offs
- ability to build scalable frontend systems