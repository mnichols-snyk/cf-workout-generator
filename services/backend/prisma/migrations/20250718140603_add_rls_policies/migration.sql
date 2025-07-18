-- Step 1: Grant ownership of the tables to the 'user' role to avoid permission issues.
ALTER TABLE "User" OWNER TO "user";
ALTER TABLE "Gym" OWNER TO "user";

-- Step 2: Enable Row-Level Security on the tables.
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Gym" ENABLE ROW LEVEL SECURITY;

-- Step 3: Create policies to restrict access based on the tenant_id.
-- The tenant_id is set by the application using `SET app.tenant_id = '...'`.
CREATE POLICY tenant_isolation_policy ON "User" FOR ALL
USING ("gymId" = current_setting('app.tenant_id')::uuid);

CREATE POLICY tenant_isolation_policy ON "Gym" FOR ALL
USING (id = current_setting('app.tenant_id')::uuid);

-- Step 4: Create a role that can bypass RLS for administrative tasks.
-- Note: This role is managed at the application level, but we ensure it has rights.
-- In our app, the 'superuser' role bypasses RLS via application logic, not a direct DB role.

-- Step 5: Ensure the 'user' role (used by the application) is subject to RLS.
ALTER TABLE "User" FORCE ROW LEVEL SECURITY;
ALTER TABLE "Gym" FORCE ROW LEVEL SECURITY;
