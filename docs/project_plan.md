AI-Powered Workout Generator: Development Plan 🗓️
This document outlines the 50-step development plan for the AI-Powered Workout Generator application. Each step is represented as a checklist item to facilitate tracking progress within Windsurf or any Markdown-compatible tool.

Phase 1: Foundation & Core Multi-Tenancy (Weeks 1-8)
1.1. Project Setup & DevOps
[x] Initialize Git repository.

[x] Set up basic Node.js (Express/Fastify) backend with TypeScript.

[x] Set up React frontend with TypeScript.

[x] Configure ESLint, Prettier, and basic linting/formatting rules for both frontend and backend.

[x] Implement Dockerfiles for Node.js backend and React frontend.

[x] Set up docker-compose.yml for local development (backend, PostgreSQL, frontend).

[x] Configure basic CI/CD pipeline (e.g., GitHub Actions) for linting, testing, and Docker image builds.

[ ] Establish GCP project and initial IAM roles.

[x] Implement dotenv for local environment variable management.

[x] Set up pino or winston for structured logging in Node.js.

1.2. Database & Basic Authentication
[x] Design initial PostgreSQL schema with gyms table and tenant_id on all user-related tables.

[x] Implement database connection pooling and ORM (Prisma/TypeORM) setup.

[x] Develop User model (email, password hash, roles).

[x] Implement Superuser seed for initial platform admin.

[x] Develop Superuser login and password reset functionality (email integration).

[x] Implement JWT-based authentication for superuser.

[x] Implement tenant_id extraction from JWT and basic tenant context middleware.

[x] Implement Row-Level Security (RLS) policies on the gyms table (and other core tenant tables as they're added) to enforce data isolation.

1.3. Superuser Features (Minimum Viable)
[x] Develop API and basic UI for Superuser to view registered gyms.
    - API: GET /api/superuser/gyms implemented with RBAC middleware
    - Returns all gyms with superuser context (bypasses RLS)
    - Authentication and authorization working correctly

[x] Develop API and basic UI for Superuser to set/update platform-wide Terms & Conditions.
    - API: POST /api/superuser/terms-and-conditions implemented
    - Zod schema validation for content field
    - Creates new T&C or updates existing (singleton pattern)
    - Secured with RBAC middleware for SUPERUSER role only

[x] Develop API for Superuser to manually activate/deactivate a gym (for testing).
    - API: POST /api/superuser/toggle-gym-status implemented
    - Accepts gymId (UUID) and isActive (boolean) parameters
    - Database schema updated with isActive field on Gym model
    - Prisma migration applied successfully
    - Validates gym existence before updating status

[ ] Develop basic UI for Superuser features.
    - APIs are complete and tested, ready for frontend implementation

Phase 2: Tenant Onboarding & Core Gym Management (Weeks 9-16)
2.1. Tenant Sign-up & Trial
[ ] Develop Gym Owner sign-up API (creates gym, tenant admin user).

[ ] Implement 30-day trial logic upon new gym signup.

[ ] Develop Gym Owner onboarding flow on frontend (initial setup).

[ ] Implement T&C display and acceptance during sign-up.

2.2. Tenant Admin Management
[ ] Implement tenant-aware login for Tenant Admins (email, password).

[ ] Develop API and UI for Tenant Admin to manage coach accounts (create, update, delete).

[ ] Develop API and UI for Tenant Admin to manage gym user accounts (create, update, delete).

2.3. Branding & Customization
[ ] Design database schema for tenant branding (logo URL, color palette).

[ ] Develop API for Tenant Admin to upload gym logo to cloud storage (e.g., GCS).

[ ] Develop API for Tenant Admin to define custom color scheme.

[ ] Implement dynamic theme loading on the frontend based on tenant's settings.

2.4. Subscription & Billing (MVP Integration)
[ ] Integrate Stripe API for customer creation and subscription plan definition.

[ ] Develop API for Tenant Admin to add credit card details (Stripe Elements on frontend).

[ ] Develop API to link Stripe subscription to internal gym record.

[ ] Implement basic subscription tracking (active/trial status).

Phase 3: AI Workout Generation & Coach Features (Weeks 17-26)
3.1. Exercise & Workout Foundation
[ ] Design database schema for exercises (name, description, tags, active/inactive status).

[ ] Design database schema for workouts (date, name, coach, exercises, sets/reps, warm-up, scaling options).

[ ] Develop API for Coaches to manually add/edit/delete exercises.

[ ] Develop API for Coaches to mark exercises as "inactive".

3.2. AI LLM Integration (Google Gemini)
[ ] Integrate Google Gemini API client into the Node.js backend.

[ ] Create a dedicated LLM prompt engineering module to guide workout generation, ensuring prompts explicitly request a warm-up and 1-2 scaling options per exercise.

[ ] Develop API endpoint for coaches to submit workout generation parameters to the LLM module.

[ ] Develop API to receive and parse LLM-generated workout suggestions, extracting warm-up and scaling options.

[ ] Implement UI for coaches to input workout parameters.

[ ] Display LLM-suggested workout on frontend for review and editing, including the warm-up section and collapsible/expandable scaling options for each exercise.

3.3. Workout Management (Coach)
[ ] Develop API for coaches to edit and save LLM-suggested workouts.

[ ] Implement UI for coaches to edit workout details.

[ ] Develop API for coaches to manually create workouts from existing exercises (no quota debit).

[ ] Develop API to assign workouts to specific dates.

[ ] Implement scrolling calendar UI for coaches to view/assign workouts.

3.4. Subscription Quota Tracking
[ ] Integrate workout generation count with subscription quota (decrement on AI-generated workout save/assign).

[ ] Develop API to view current workout quota usage for a gym.

Phase 4: User Experience & Reporting (Weeks 27-36)
4.1. User Workout Viewing & Logging
[ ] Implement tenant-aware login for gym users.

[ ] Develop API for users to view their assigned workouts for the day/week.

[ ] Implement scrolling calendar UI for users to see scheduled workouts.

[ ] Develop API for users to log workout results (sets, reps, weight, notes).

[ ] Implement UI for users to input workout results.

[ ] Develop API for users to mark workouts as "favorite."

4.2. Workout History & Search (Coach)
[ ] Develop API for coaches to search and view previous workouts.

[ ] Implement UI for workout search and display.

[ ] Develop API for coaches to archive workouts.

[ ] Develop API for coaches to "repeat" (copy) previous workouts.

4.3. Benchmark Tracking
[ ] Design database schema for benchmark workouts (e.g., 1RM, Hero WODs) and user-specific results.

[ ] Develop API for users to log results for benchmark workouts.

[ ] Implement UI for users to view their benchmark history.

[ ] Develop API for coaches to view individual user benchmark results.

4.4. Reporting
[ ] Develop API for Tenant Admins to retrieve gym usage reports (users, workouts logged per user, workouts created AI/Manual).

[ ] Implement UI for Tenant Admin reporting dashboard.

[ ] Develop API for Superuser to retrieve aggregated platform usage reports.

4.5. "Coach View" for Users
[ ] Implement a frontend toggle or route for coaches to switch to a "user view."

[ ] Ensure this view has the ability for the coach to log their own workouts.

4.6. Leaderboard & Gamification
[ ] Design database schema for user_workout_logs (user_id, workout_id, completed_at, tenant_id).

[ ] Develop optimized PostgreSQL queries to count completed workouts per user within a specific tenant_id for the last 30 and 60 days.

[ ] Develop API endpoint to retrieve leaderboard data for a given tenant_id.

[ ] Develop frontend component for the Leaderboard as the primary home screen element.

[ ] Implement logic to display user's rank within the leaderboard.

[ ] Integrate the tagline "Consistency is the secret sauce of success."

[ ] Implement toggle for 30-day and 60-day views.

Phase 5: Refinement, Scalability & Hardening (Weeks 37-44)
[ ] Advanced Subscription Features: Implement subscription plan upgrade/downgrade logic (Stripe webhooks).

[ ] Implement add-on purchasing for users/workouts.

[ ] Develop API for Tenant Admin to view billing history and invoices (Stripe customer portal integration).

[ ] Security & Data Isolation Review: Conduct a thorough security audit of RLS policies and application-level authorization.

[ ] Implement DAST/SAST in CI/CD.

[ ] Regularly review Node.js dependencies for vulnerabilities.

[ ] Performance Optimization: Optimize database queries (indexing, query review).

[ ] Implement API caching (e.g., Redis) for frequently accessed, static data (e.g., exercise list).

[ ] Optimize LLM calls (caching, prompt efficiency).

[ ] Deployment & Monitoring: Finalize Kubernetes deployment configurations (pods, services, ingress, horizontal pod autoscaling).

[ ] Set up comprehensive logging and monitoring (GCP Cloud Logging, Cloud Monitoring, Grafana/Prometheus).

[ ] Configure alerts for system health and performance issues.

[ ] Superuser Deactivation & T&C Compliance: Refine Superuser workflow for deactivating gym accounts based on T&C violations.

[ ] Implement automated checks or alerts for potential T&C breaches (e.g., excessive usage if not paying for add-ons).

[ ] Documentation & Support: Create comprehensive API documentation (Swagger/OpenAPI).

[ ] Develop user guides for Tenant Admins, Coaches, and Users.

[ ] Set up customer support channels.

Phase 6: Iteration & Future Enhancements (Post-Launch)
[ ] Implement "Hero" workout tracking and leaderboards (opt-in).

[ ] Notifications (email, in-app) for new workouts, performance milestones, subscription changes.

[ ] User profiles with more detailed fitness metrics.

[ ] Integrations with wearables (e.g., Apple Health, Google Fit).

[ ] Advanced AI features: personalized workout adjustments based on logged results, injury prevention.

[ ] Coach communication features with users.

[ ] Community features for users within a gym.

[ ] More sophisticated reporting and analytics.

[ ] Mobile application development (Native or React Native).

[ ] Explore LLM fine-tuning for highly specific workout generation.