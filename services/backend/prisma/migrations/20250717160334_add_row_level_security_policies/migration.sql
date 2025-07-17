-- Enable Row Level Security on tenant-specific tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Gym" ENABLE ROW LEVEL SECURITY;

-- Create a function to get the current tenant ID from the application context
-- This will be set by the application when establishing database connections
CREATE OR REPLACE FUNCTION current_tenant_id() RETURNS text AS $$
BEGIN
  RETURN current_setting('app.tenant_id', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if the current user is a superuser
CREATE OR REPLACE FUNCTION is_superuser() RETURNS boolean AS $$
BEGIN
  RETURN current_setting('app.is_superuser', true)::boolean;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policy for User table
-- Users can only see users from their own gym, unless they are superusers
CREATE POLICY tenant_isolation_policy_users ON "User"
  FOR ALL
  USING (
    is_superuser() = true OR 
    "gymId" = current_tenant_id()
  );

-- RLS Policy for Gym table
-- Users can only see their own gym, unless they are superusers
CREATE POLICY tenant_isolation_policy_gyms ON "Gym"
  FOR ALL
  USING (
    is_superuser() = true OR 
    "id" = current_tenant_id()
  );

-- Note: Superuser bypass is handled at the application level
-- through the is_superuser() function and tenant context management
-- No additional database-level policies needed for postgres role

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION current_tenant_id() TO PUBLIC;
GRANT EXECUTE ON FUNCTION is_superuser() TO PUBLIC;
