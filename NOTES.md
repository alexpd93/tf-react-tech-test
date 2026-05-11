### 1\. What I built and decisions I made

-   **Persistence & Schema Modelling with Prisma/SQLite:** I moved away from an in-memory store to SQLite to ensure data persistence. I chose Prisma as the ORM to provide a type-safe abstraction over raw SQL. This allowed me to define a clear schema model early on which ensured data integrity across the entire stack and made the querying logic much more readable.

-   **Maintainable Styling with Sass:** I noticed Sass in the job description and as I am familiar with it, I chose to use it to create a scoped and organised design system. I utilised **variables** for colours and spacing to ensure consistent UI and used nesting to keep the CSS scoped to specific components, preventing global style leaks.

-   **Granular Error Objects:** I designed the backend to return field specific error objects rather than generic strings. This decision was made to allow the frontend to map errors directly to their corresponding inputs (like the title or priority fields), creating a much smoother and more intuitive user experience.

-   **Modular Component Architecture:** I separated the UI into distinct, functional components to follow the Single Responsibility Principle. However, I made a choice not to abstract a separate Button component for this project. Given the app's current scale, I felt a custom button component would add unnecessary abstraction and overhead; I prioritised clean, readable JSX within the core task components instead.

* * * * *

### 2\. What I'd improve with more time

-   **Validation (Zod):** I would transition to Zod to define shared schemas between the frontend and backend, reducing manual `if` checks and providing automatic type inference.

-   **Testing Strategy (Jest & Cypress):** I would implement a multi-layered testing approach to ensure the app is reliable. I'd use Jest for unit testing the logic on both the frontend and backend and Cypress would handle end-to-end (E2E) testing to ensure the entire user flow works as expected in a real browser.

-   **State Management (React Context):** Currently, state and handlers are passed down through multiple layers of components (Prop Drilling). For example, the `confirmingId` travels from `App` through `TaskList` to `TaskItem`. For a larger application, I would implement React Context to create a global store. This would allow components to "subscribe" to only the data they need, keeping the component interfaces cleaner and the codebase easier to scale.

-   **Pagination & Search:** As the database grows, I would add `limit/page` parameters and a `search` query using Prisma's `contains` filter to keep the UI performant.

-   **Authentication & Multi-tenancy:** Currently, the task list is global. I would implement a secure authentication layer (e.g., using JWTs or Auth.js) to allow for private user accounts. This would involve updating the Prisma schema to associate tasks with a `userId`, ensuring that users can only view, edit, or delete their own data.

-   **API Expansion (GET by ID):** I would build out the REST API to be more robust. I didn't feel a `GET /api/tasks/:id` endpoint was necessary for the specific features of this initial stage, but I would implement it later to support detail views.

* * * * *

### 3\. Anything I found tricky or interesting

-   **Enums for Data Integrity:** This was my first time working with Enums in a database. I found it interesting how they enforce strict rules on what data is allowed, ensuring that priorities like `low`, `medium`, and `high` are consistent throughout the stack.

-   **End-to-End Model Consistency:** I found it challenging but satisfying to get the Prisma-generated Task model to serve as the backbone for the entire app. Ensuring those database types flowed correctly from the server through to the React components required a lot of focus, but it made the final code feel very stable.

-   **Designing Targeted Errors:** Figuring out how to structure validation errors was a creative challenge. I moved away from generic messages to create a structured object that pins errors to specific fields (like the title or priority), which is much more helpful for the person using the app.

-   **Keeping the List Order Consistent:** I set the database to always show the newest tasks at the top. To make the app feel fast and "live," I had to make sure that when a user adds a task, it also appears at the top of their list immediately. By adding new tasks to the start, I ensured the order stays exactly the same whether the user just added a task or is refreshing the page.

- **Handling the "All" Filter:** It was interesting to bridge the gap between how a user sees the "All" option and how a database actually processes it. To show every task, the database needs to skip a filter entirely rather than searching for a category named "All." I implemented a small translation step to ensure that when a user selects "All," the backend ignores that specific check and returns the full list correctly.
