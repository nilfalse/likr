SHELL := /bin/bash

MIGRATE_BIN = ./node_modules/.bin/node-pg-migrate
# https://stackoverflow.com/a/14061796/725901
ifeq (migrate,$(firstword $(MAKECMDGOALS)))
  MIGRATE_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(MIGRATE_ARGS):;@:)
endif

MIGRATION_SOURCES = $(wildcard src/migrations/*.ts)
MIGRATIONS = $(MIGRATION_SOURCES:src/%.ts=%.js)

SRC = tools/config.js tools/util/_fileReader.js $(MIGRATIONS)

.PHONY : all logging migrate clean

all : logging

logging : tools/config.js
	sudo ./node_modules/.bin/bunyan -p '*' \
--level 'debug' \
--condition "this.name == '$$(node --eval="const {config} = require('./tools/config'); console.log(config.name)")'" \
--output short \
--time local

migrate : tools/config.js ${MIGRATIONS}
	DATABASE_URL=$$(node --eval="const {config} = require('./tools/config'); console.log(config.db)") \
${MIGRATE_BIN} --ignore-pattern '\..*|.*\.md' ${MIGRATE_ARGS}

$(MIGRATIONS) : ${MIGRATION_SOURCES}
	./node_modules/.bin/tsc -p src/migrations

tools/config.js : src/node/config.ts src/node/util/_fileReader.ts
	./node_modules/.bin/tsc $< --target es2017 --lib es2017,dom --module commonjs --moduleResolution node
	mkdir -p tools/util
	mv src/node/util/_fileReader.js tools/util/_fileReader.js
	mv src/node/config.js $@

clean :
	- rm -f $(SRC)
	- rm -rf tools/util
