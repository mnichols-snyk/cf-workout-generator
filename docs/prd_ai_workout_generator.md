AI-Powered Workout Generator for Gyms: Product Requirements Document (PRD)
1. Introduction 🚀
1.1. Product Vision
To empower gym owners and coaches with an intelligent, customizable platform that leverages AI to generate dynamic, personalized workouts, streamline gym operations, and enhance member engagement, fostering a healthier and more active community.

1.2. Problem Statement
Gyms often struggle with:

Manually creating diverse and engaging workout programs, which is time-consuming and limits trainer capacity.

Lack of tools to efficiently manage users, coaches, and track member progress in a unified, customizable system.

Difficulty in offering personalized experiences at scale, leading to decreased member retention.

Limited insight into gym and user performance metrics.

1.3. Solution Overview
Our application will provide a multi-tenant SaaS platform where gym owners (tenant admins) can manage their gym, coaches, and users, customize their branding, and access usage reports. Coaches will utilize an AI LLM to generate, customize, and assign daily workouts based on defined parameters, track user progress, and manage exercises. Users will access their assigned workouts, log results, and track personal benchmarks. A superuser will oversee subscription plans and platform governance.

2. Goals & Objectives 🎯
Objective 1: Market Entry & Adoption: Acquire 50 paying gym subscriptions within the first 12 months.

Metric: Number of active gym subscriptions.

Target: 50.

Objective 2: Core Feature Usage: Achieve an average of 70% AI-generated workout adoption by coaches within active gyms.

Metric: Ratio of AI-generated workouts to manually created workouts assigned per gym.

Target: 70%.

Objective 3: User Engagement: Achieve an average of 60% daily active users (DAU) to monthly active users (MAU) ratio across all gyms.

Metric: DAU/MAU ratio.

Target: 60%.

Objective 4: Platform Stability & Performance: Maintain 99.9% uptime for all core services.

Metric: Uptime monitoring.

Target: 99.9%.

3. Target Audience & User Personas 🧑‍🤝‍🧑
3.1. Superuser (Platform Admin)
Role: Oversees the entire SaaS platform.

Needs: Manage subscription plans, set platform-wide T&Cs, deactivate gym accounts, monitor overall platform health.

Motivations: Maintain platform integrity, ensure fair usage, optimize revenue, manage scalability.

3.2. Gym Owner / Tenant Admin
Role: Manages a single gym's instance of the application.

Needs: Define branding, manage coaches/users, handle subscriptions/billing, view gym-specific usage reports.

Motivations: Efficiently manage their gym, offer unique value to members, control costs, understand gym performance.

3.3. Coach
Role: Creates, assigns, and manages workouts for gym users.

Needs: AI-powered workout generation with customization, workout editing, saving, assigning, searching, archiving, marking exercises inactive, tracking user progress.

Motivations: Save time on programming, provide personalized and varied workouts, track athlete progress effectively, maintain branding consistency.

3.4. User (Gym Member)
Role: Consumes workouts and logs results.

Needs: View daily workouts, log results, track benchmarks, mark favorite workouts. Primary home screen is a leaderboard.

Motivations: Follow structured programming, track personal fitness journey, achieve fitness goals, engage competitively via the leaderboard.

4. Features & Functional Requirements ✨
4.1. Core Platform (Superuser)
Subscription Plan Management:

Define base monthly charges, included generated workouts, and included users for different subscription tiers.

Define add-on pricing for additional users and generated workouts.

Track all active, trial, and deactivated subscriptions.

Gym Account Management:

View all subscribed gyms.

Ability to deactivate gym accounts for T&C violations.

Set platform-wide Terms and Conditions.

Configure trial period duration (default 30 days).

Usage Monitoring:

Access aggregated platform usage reports.

4.2. Tenant Administration (Gym Owner)
Onboarding & Trial:

Initial sign-up and acceptance of T&Cs to activate 30-day trial.

Branding & Customization:

Upload gym logo.

Define color scheme (primary, secondary, accent colors) for their tenant's app instance.

User & Coach Management:

Create, update, and delete coach accounts.

Create, update, and delete user accounts.

Assign/revoke roles (Coach, User).

Subscription & Billing Management:

View current subscription plan and usage.

Enter/update credit card information for charges.

Select different subscription plans (upgrade/downgrade).

Authorize add-ons (additional users, additional workouts).

Access billing history and invoices.

Reporting:

View gym-specific usage reports: total users, active users, number of workouts logged per user, number of workouts created (AI vs. Manual).

4.3. Coach Functionality
AI Workout Generation:

Define parameters for AI workout generation (e.g., specific days, strength/metabolic/mobility focus, active/inactive exercises, equipment constraints).

Suggest a workout based on parameters using LLM.

Must include a suggested warm-up.

For each exercise, suggest 1-2 scaling options (e.g., easier/harder variations, regressions/progressions).

Ability to edit the AI-suggested workout (including warm-ups and scaling options) before saving/assigning.

Track AI-generated workouts against subscription quota.

Manual Workout Creation:

Manually generate workouts from the exercise database.

Manually created workouts do not count against subscription quota.

Workout Management:

Save generated/edited workouts.

Assign workouts to specific days on a scrolling calendar.

Search, view, and repeat previous workouts.

Archive previous workouts.

Exercise Management:

Mark specific exercises (e.g., burpees, rowing) as "inactive" so they are not included in suggested workouts.

"User View":

Access a view that mirrors the user experience to see workouts as members see them and to log their workouts.

User Progress Tracking:

View individual user workout logs.

View benchmark workout results (e.g., 1RM for bench press, "hero" workouts).

4.4. User Functionality (Gym Member)
Leaderboard (Primary Home Screen Element):

Displays a ranked list of gym members based on the number of workouts completed.

Includes two views: "Last 30 Days" and "Last 60 Days."

Clearly highlights the current user's rank within the list (e.g., "You are 13th out of 60 in your gym").

Features the tagline: "Consistency is the secret sauce of success."

Workout Display:

View scheduled workouts by day in a scrolling calendar (today's workout at top).

Workout Logging:

Log results for completed workouts (sets, reps, weight/time, notes).

Mark a workout as "favorite."

Progress Tracking:

View personal tracking for benchmark workouts (1RM, hero workouts).

4.5. General / Cross-Cutting Concerns
User Management:

All usernames (superuser, tenant admin, coach, user) will be email addresses.

Password reset functionality via email.

Security:

Robust authentication and authorization (RBAC) across all user types and tenants.

Data isolation between tenants.

Secure storage of sensitive information (passwords, credit card details - PCI DSS compliance for CC processing).

Scalability:

Designed for multiple, independent tenants and growing user bases.

Auditability:

Logging of key actions (e.g., workout generation, user management, subscription changes).

5. App Flow (High-Level User Journeys) 🗺️
5.1. New Gym Onboarding Flow
Prospective Gym Owner: Lands on marketing page.

Gym Owner: Clicks "Start Free Trial" or "Subscribe".

Gym Owner: Enters gym details and admin user (email) credentials.

Gym Owner: Reviews and accepts Terms & Conditions.

System: Activates 30-day trial plan for the new tenant.

Gym Owner: Receives confirmation email and logs in as Tenant Admin.

Tenant Admin: Lands on Dashboard, prompted to set up branding and add coaches/users.

5.2. AI Workout Generation & Assignment Flow (Coach)
Coach: Logs into their gym's instance.

Coach: Navigates to "Workout Programming" section.

Coach: Selects "Generate Workout with AI".

Coach: Defines parameters (e.g., date, focus areas, inactive exercises).

Coach: Clicks "Generate".

AI LLM Integration: Processes parameters and suggests a workout structure, including a warm-up and 1-2 scaling options for each exercise.

Coach: Reviews the suggested workout, including warm-up and scaling.

Coach: Edits workout as needed (add/remove exercises, change sets/reps, adjust warm-up, modify scaling options).

Coach: Clicks "Save & Assign".

System: Saves workout, assigns it to the selected day, and debits a workout from the gym's quota if AI-generated.

5.3. User Home Screen & Leaderboard Flow
User: Logs into their gym's instance.

User: Lands directly on their Home Screen, which prominently displays the Leaderboard.

Leaderboard: Defaults to "Last 30 Days" view.

User: Sees a ranked list of gym members.

User: Quickly identifies their own rank within the list (e.g., "You are 5th out of 75 in your gym").

User: Reads the tagline: "Consistency is the secret sauce of success."

User: Has an option to toggle to the "Last 60 Days" view of the leaderboard.

User: Can navigate to "Today's Workout" or other sections from this screen.

5.4. User Logging Workout Flow
User: Logs into their gym's instance.

User: Views "Today's Workout" on their calendar.

User: Clicks on the workout to view details.

User: Clicks "Log Results".

User: Enters actual sets, reps, weight/time for each exercise.

User: Adds any notes.

User: Click "Save Results".

System: Stores workout log, updates user's history and benchmark data.

6. Tech Stack 💻
Frontend:

Framework: React

Language: TypeScript

Styling/UI: Emotion (for CSS-in-JS and theming), potentially Material-UI or Ant Design for components.

State Management: React Query (for data fetching and caching), Zustand or Jotai (for lightweight global state).

Routing: React Router DOM

Backend:

Runtime: Node.js

Framework: Express.js or Fastify (for RESTful APIs)

Language: TypeScript

Database ORM/Query Builder: Prisma or TypeORM (with pg driver for PostgreSQL)

Authentication/Authorization: Passport.js (for JWT/OAuth strategies), custom RBAC middleware.

AI LLM Integration: Google Gemini API (via Node.js client library).

Email Service: Nodemailer (for password resets), integrated with SendGrid/Mailgun.

Subscription/Billing: Stripe API (for credit card processing, subscription management, webhooks).

Logging: Pino or Winston.

Validation: Zod or Joi.

Database:

Primary Database: PostgreSQL (for relational data, multi-tenancy via tenant_id and Row Level Security - RLS).

Infrastructure & DevOps:

Containerization: Docker

Orchestration: Kubernetes (for production deployment, scalability, and service discovery)

Cloud Provider: GCP (Google Cloud Platform - for hosting, Managed PostgreSQL, Kubernetes Engine, Secret Manager, Pub/Sub for messaging, Cloud Logging, Cloud Monitoring).

CI/CD: GitHub Actions or GitLab CI/CD.

Secret Management: GCP Secret Manager.

Infrastructure as Code (IaC): Terraform.

7. Design System 🎨
The application will adopt a modular and themeable design system to support multi-tenancy branding.

Core Principles:

Modularity: UI components are atomic and reusable.

Theming: Easily swap colors, fonts, and potentially component variations based on tenant settings.

Accessibility: Adhere to WCAG 2.1 AA standards.

Responsiveness: Mobile-first approach with graceful degradation for larger screens.

Consistency: Maintain a consistent user experience across the platform, with tenant branding applied only to specific aesthetic elements.

Key Components:

Color Palette: Base palette with defined primary, secondary, accent, success, warning, danger, and neutral colors. Tenant override for primary, secondary, accent.

Typography: Consistent font families, sizes, weights.

Spacing & Layout: Standardized spacing units, grid systems.

Common UI Elements: Buttons, inputs, forms, modals, tables, navigation components.

Branding Elements: Logo display component with tenant-specific upload, dynamically loaded.

Implementation:

Use a CSS-in-JS library (e.g., Emotion or Styled Components) to enable dynamic theme application from the backend.

Context API in React for theme propagation.

A centralized theme object/context that can be dynamically populated based on the authenticated tenant's settings (logo URL, color codes).

Base components that inherit theme values.

8. Backend Setup (Multi-Tenant & Scalable) ☁️
8.1. Multi-Tenancy Strategy: Shared Database, Shared Schema with tenant_id and RLS
Database Level:

All tenant-specific tables (e.g., gyms, users, coaches, workouts, exercises, subscriptions) will have a tenant_id column (UUID or Integer).

PostgreSQL Row Level Security (RLS) will be implemented to enforce strict data isolation. Policies will be defined on tables to ensure that queries initiated by a tenant_id can only access rows belonging to that tenant_id. This is critical for security.

Non-tenant-specific tables (e.g., superuser_plans, platform_terms_and_conditions) will not have tenant_id.

Application Level:

Upon tenant admin or user login, the tenant_id will be extracted from their authentication token (JWT payload).

This tenant_id will be injected into the request context and used by the ORM/database client for all subsequent queries to filter data.

Middleware will be used to ensure tenant_id is present and correctly applied for all tenant-scoped API calls.

Superuser Access: The superuser role will bypass RLS or use specific database roles/credentials that have broader access to manage all tenants and platform-level data.

8.2. Microservices Architecture (Initial / Phased)
While a full microservices architecture can be complex from the start, we'll design with modularity in mind to allow for future splitting into distinct services.

Core Services (Initial Monolith, with clear domain boundaries):

Auth Service: Handles user authentication (login, registration, password reset), token generation (JWTs), and potentially user/role management.

Gym Management Service: Manages gym details, tenant branding, subscription links, and tenant admin functions.

User & Coach Management Service: Manages users and coaches within a specific gym's context.

Workout & Exercise Service: Handles all workouts (creation, generation, assignment, logging, searching, archiving) and exercises (management, inactive status). This will include the LLM integration.

Subscription & Billing Service: Manages subscription plans, subscriptions, billing, and usage tracking. Integrates with Stripe.

Reporting Service: Gathers and aggregates usage data for both tenant and superuser reports.

Inter-Service Communication: Initially, internal module calls or simple HTTP API calls within a single Node.js application. As complexity grows, consider:

RESTful APIs: Standard HTTP for synchronous communication.

Message Queues (e.g., Google Pub/Sub): For asynchronous events (e.g., "workout generated" event, "user subscribed" event) to decouple services and improve scalability.

8.3. Database Schema Design Principles
Tenant ID: Every tenant-specific table has a tenant_id foreign key referencing the gyms table.

UUIDs for IDs: Use UUIDs for primary keys where practical to avoid sequential IDs and improve distribution in sharded environments (future consideration).

Indexing: Proper indexing on tenant_id and frequently queried columns.

Relationships: Clear foreign key relationships.

8.4. LLM Integration
The LLM will be integrated as an external API call (Google Gemini API) from the Workout & Exercise Service.

A dedicated module within this service will handle prompt engineering, API calls, and parsing of LLM responses.

Caching (e.g., Redis) can be explored for frequently generated workout types or exercise data used in prompts to reduce LLM API costs and latency.

8.5. API Design
RESTful API design with clear endpoints and HTTP methods.

JSON for request and response bodies.

Versioning (e.g., /api/v1/).

Thorough input validation on all API endpoints.
