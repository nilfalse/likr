## This directory is intentionally left empty.

Upon migration it will be populated with compiled versions of TypeScript migrations.

# See `./src/migrations/` instead

The typical flow to create a new migration in current setup is:
1. run `node-pg-migrate create my awesome migration -j ts`
1. move the new file from `./migrations/` to `./src/migrations/`

