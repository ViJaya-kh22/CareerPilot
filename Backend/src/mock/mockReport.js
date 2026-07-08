
const mockReport = {

  "matchScore": 72,
  "technicalQuestions": [
    {
      "question": "You've worked with Context API for state management. Can you explain a scenario where you might choose Redux over Context API, and what are the trade-offs?",
      "intention": "To evaluate the candidate's understanding of different state management solutions, their pros and cons, and their ability to choose the right tool for a given problem, especially considering they haven't worked with Redux.",
      "answer": "Discuss application complexity, performance concerns with frequent updates, and the need for a centralized, predictable state container. Mention Redux's developer tooling, middleware, and scalability for large applications, contrasted with Context API's simplicity for less complex global state."
    },
    {
      "question": "Describe your approach to integrating REST APIs in your React projects. How do you handle asynchronous data fetching, loading states, and potential errors?",
      "intention": "To assess the candidate's practical experience with API integration, error handling, and user experience considerations in a frontend application.",
      "answer": "Explain using `useEffect` for data fetching, `useState` for loading and error states. Discuss using `try-catch` blocks for error handling, displaying error messages to users, and showing loading indicators while data is being fetched. Mention `axios` or `fetch`."
    },
    {
      "question": "The job description mentions SCSS/CSS preprocessors and responsive design. Can you explain how you've used SCSS in your projects and your methodology for ensuring a consistent responsive layout across different devices?",
      "intention": "To gauge the candidate's practical skills in modern CSS techniques, including preprocessors and implementing responsive UIs.",
      "answer": "Describe using SCSS features like variables, mixins, nesting, and partials to organize styles. For responsive design, explain using media queries, flexible units (rem, em, percentages), and CSS Flexbox or Grid for layout adaptation, possibly mentioning a mobile-first approach."
    },
    {
      "question": "Your projects include JWT Authentication and protected routes. Can you walk us through the full flow of how a user logs in, receives a token, and how that token is then used to access protected resources in your React application?",
      "intention": "To evaluate the candidate's understanding of secure authentication flows, token management, and client-side authorization logic, which is a bonus skill in the JD.",
      "answer": "Explain sending credentials to a backend, receiving a JWT, storing it (e.g., in `localStorage` or `httpOnly` cookies), attaching it to subsequent requests, and using higher-order components or React Router for protected routes by checking token validity."
    },
    {
      "question": "Given your experience with Git/GitHub, describe a scenario where you encountered a complex merge conflict and how you resolved it. What steps did you take?",
      "intention": "To assess the candidate's practical Git skills, problem-solving abilities in a version control context, and readiness for collaborative development, especially as team experience is a gap.",
      "answer": "Describe identifying conflicting files, using `git status` and `git diff`, manually editing the conflicting sections, testing the changes, and then committing the resolution. Emphasize understanding the desired outcome from both branches."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "You mentioned being a self-taught developer and building several projects. Can you describe a significant technical challenge you faced while learning or during a project, and how you approached solving it?",
      "intention": "To assess the candidate's problem-solving skills, initiative, persistence, and ability to learn independently.",
      "answer": "Use the STAR method. Describe the Situation (the challenge), Task (what you needed to do), Action (steps taken, resources consulted, debugging process), and Result (the solution and what you learned)."
    },
    {
      "question": "The job involves working in a product team. Although you haven't worked in a formal team CI/CD environment, how do you envision contributing to a team, collaborating on code, and handling feedback on your work?",
      "intention": "To evaluate the candidate's understanding of teamwork, communication skills, openness to feedback, and their hypothetical approach to collaboration, addressing a stated experience gap.",
      "answer": "Discuss proactive communication, code reviews (both giving and receiving), using version control effectively for collaboration, contributing ideas respectfully, and adapting to team processes. Emphasize a willingness to learn and integrate into a team."
    },
    {
      "question": "Describe a time when you had to prioritize multiple tasks or features for one of your projects. How did you decide what to work on first, and what was the outcome?",
      "intention": "To assess the candidate's organizational skills, ability to prioritize, decision-making process, and understanding of project management principles.",
      "answer": "Use the STAR method. Explain how you evaluated importance and urgency, considered dependencies, or aligned with project goals. Describe the steps you took to manage your workload and the impact of your prioritization decisions on the project."
    }
  ],
  "skillGaps": [
    {
      "skill": "Professional Frontend Development Experience (2-3 years)",
      "severity": "High"
    },
    {
      "skill": "Redux State Management",
      "severity": "Medium"
    },
    {
      "skill": "Team-based CI/CD Workflows",
      "severity": "Medium"
    },
    {
      "skill": "Performance Optimization in React Apps",
      "severity": "Low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "React Core Concepts & Component Design",
      "tasks": [
        "Review React Hooks (useState, useEffect, useContext, useRef, useCallback, useMemo).",
        "Practice building reusable, atomic React components with proper prop-drilling vs. Context API usage.",
        "Refactor an existing project component to improve reusability or performance."
      ]
    },
    {
      "day": 2,
      "focus": "State Management: Redux & Redux Toolkit",
      "tasks": [
        "Study Redux core principles (store, actions, reducers, dispatch).",
        "Learn Redux Toolkit for simplified Redux setup and usage.",
        "Build a small React application or integrate Redux into an existing project to manage a few global states."
      ]
    },
    {
      "day": 3,
      "focus": "Advanced SCSS & Responsive Design Techniques",
      "tasks": [
        "Deep dive into SCSS features: functions, control directives (@if, @for, @each), advanced mixins.",
        "Implement a complex responsive layout using CSS Grid and Flexbox, focusing on mobile-first design.",
        "Practice building a small component with a custom design system using SCSS variables and mixins."
      ]
    },
    {
      "day": 4,
      "focus": "REST API Integration & Robust Error Handling",
      "tasks": [
        "Review best practices for async operations with `async/await` and `try-catch`.",
        "Implement robust API error handling and display user-friendly messages for different error types (e.g., 401, 404, 500).",
        "Practice implementing loading states, empty states, and retry mechanisms for API calls."
      ]
    },
    {
      "day": 5,
      "focus": "React Performance Optimization & Authentication Flows",
      "tasks": [
        "Study and apply React performance techniques: `React.memo`, `useCallback`, `useMemo`, lazy loading, and code splitting.",
        "Optimize a component in one of your existing projects for performance using browser developer tools.",
        "Review and be ready to explain authentication flows, including token refresh strategies, for protected routes."
      ]
    },
    {
      "day": 6,
      "focus": "Git Workflow & CI/CD Fundamentals",
      "tasks": [
        "Practice advanced Git commands: `rebase`, `cherry-pick`, resolving complex merge conflicts.",
        "Research common CI/CD concepts (e.g., automated testing, build, deployment pipelines).",
        "Understand the role of Git hooks and basic branching strategies (e.g., Git Flow, GitHub Flow)."
      ]
    },
    {
      "day": 7,
      "focus": "Mock Interview & Behavioral Question Practice",
      "tasks": [
        "Conduct a mock technical interview focusing on all covered topics and identified skill gaps.",
        "Practice answering behavioral questions using the STAR method, tailoring responses to highlight your strengths and self-learning ability.",
        "Refine your project descriptions to clearly articulate technical challenges and solutions from a frontend perspective."
      ]
    }
  ],
  "user": {
    "$oid": "6a4a3a2f497e1f3a687ef416"
  },
  "createdAt": {
    "$date": "2026-07-05T11:10:06.636Z"
  },
  "updatedAt": {
    "$date": "2026-07-05T11:10:06.636Z"
  },
  "__v": 0
}


export default mockReport;