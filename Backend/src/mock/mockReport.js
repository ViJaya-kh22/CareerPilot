
const mockReport = {
"matchScore": 85,
"technicalQuestions": [
{
"question": "In your CareerPilot project, you used Axios for API integration. How would you handle a scenario where an API request fails or takes too long to respond?",
"intention": "To evaluate the candidate's understanding of error handling, asynchronous programming, and user experience considerations.",
"answer": "The candidate should discuss using try-catch blocks with async/await and Axios interceptors for global error handling. They should mention setting timeouts in Axios configurations and implementing UI states like loading spinners or error messages to inform the user."
},
{
"question": "The job description emphasizes clean and reusable code. How do you determine when a piece of UI should be turned into a reusable React component?",
"intention": "To assess the candidate's understanding of component-based architecture and DRY (Don't Repeat Yourself) principles.",
"answer": "Focus on identifying repetitive patterns in the UI and logic. Mention criteria such as props-driven customization, state encapsulation, and keeping components small for better maintainability and testing."
},
{
"question": "How would you implement the drag-and-drop functionality in TaskFlow without using a third-party library, or how would you optimize it if using one?",
"intention": "To test deep knowledge of DOM events or efficiency in using external libraries.",
"answer": "Explain the use of HTML5 Drag and Drop API events like onDragStart, onDragOver, and onDrop. If using a library like react-beautiful-dnd, focus on managing the underlying state array efficiently to prevent unnecessary re-renders."
},
{
"question": "Since TypeScript is a preferred skill for this role, can you explain the benefits of using Interfaces versus Types when defining component props?",
"intention": "To gauge the candidate's theoretical knowledge of TypeScript despite it being a missing skill in their resume.",
"answer": "Discuss how Interfaces are generally better for public APIs and support declaration merging, whereas Types are more flexible for unions, intersections, and aliases. Mention how either choice improves code reliability through compile-time checking."
}
],
"behavioralQuestions": [
{
"question": "Describe a situation where you had a disagreement with a team member or peer regarding a technical implementation. How did you resolve it?",
"intention": "To evaluate communication skills, professional maturity, and ability to work in Agile teams.",
"answer": "Use the STAR method. Focus on objective reasoning, looking at pros and cons of both approaches, and reaching a consensus that prioritizes the project's goals over personal preference."
},
{
"question": "Tell me about a time you had to learn a new technology or tool quickly to complete a project.",
"intention": "To assess adaptability and the 'passion for learning' mentioned in the self-description.",
"answer": "Apply the STAR structure to describe a specific tool (e.g., Firebase or JWT). Highlight the learning resources used (documentation, tutorials) and the successful application of that knowledge within a tight deadline."
},
{
"question": "Give an example of a difficult bug you encountered in production or during development and the steps you took to debug it.",
"intention": "To evaluate analytical thinking and familiarity with debugging tools.",
"answer": "Use the STAR method to describe the symptom of the bug. Mention using React DevTools, Chrome Debugger, or console logging to isolate the root cause and explain the logic behind the final fix."
}
],
"skillGaps": [
{
"skill": "TypeScript",
"severity": "Medium"
},
{
"skill": "Unit Testing (Jest/React Testing Library)",
"severity": "Medium"
},
{
"skill": "Redux / Advanced State Management",
"severity": "Low"
},
{
"skill": "Performance Optimization (Lighthouse, Memoization)",
"severity": "Low"
}
],
"preparationPlan": [
{
"day": "1",
"focus": "JavaScript Fundamentals & ES6+",
"tasks": [
"Review Closures, Promises, and Async/Await.",
"Practice array methods (map, filter, reduce) common in React development.",
"Solve 3-5 coding challenges on platforms like LeetCode or HackerRank focused on strings and arrays."
]
},
{
"day": "2",
"focus": "React Core & Hooks",
"tasks": [
"Deep dive into useEffect dependency arrays and cleanup functions.",
"Review the Virtual DOM concept and how React reconciliation works.",
"Re-read documentation on useMemo and useCallback for performance optimization."
]
},
{
"day": "3",
"focus": "State Management & API Integration",
"tasks": [
"Build a small project using React Context API to manage a global theme or user session.",
"Practice writing custom hooks for fetching data with Axios.",
"Review JWT authentication flow and how to store tokens securely."
]
},
{
"day": "4",
"focus": "TypeScript Basics",
"tasks": [
"Learn basic types, interfaces, and enums.",
"Convert a small JavaScript React component into a TypeScript component (.tsx).",
"Understand how to type event handlers and API responses."
]
},
{
"day": "5",
"focus": "Testing Fundamentals",
"tasks": [
"Watch a tutorial on Jest and React Testing Library (RTL).",
"Write 2-3 simple unit tests for a reusable component (e.g., a Button or Input).",
"Understand the difference between unit, integration, and E2E testing."
]
},
{
"day": "6",
"focus": "CSS, Responsive Design & Debugging",
"tasks": [
"Review CSS Grid and Flexbox layouts for responsiveness.",
"Practice identifying performance bottlenecks using Chrome DevTools Performance tab.",
"Review common Tailwind CSS patterns for rapid UI development."
]
},
{
"day": "7",
"focus": "Soft Skills & Project Walkthrough",
"tasks": [
"Prepare STAR method responses for the behavioral questions listed in this report.",
"Practice explaining the technical architecture of 'CareerPilot' and 'TaskFlow' clearly.",
"Conduct a mock interview focusing on explaining 'why' technical choices were made."
]
}
]
}

export default mockReport;