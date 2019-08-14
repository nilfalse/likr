.PHONY: build static clean

build: static
	mkdir build
	mv static-app/public build/cdn

static:
	cd static-app && npm i && npm run build

clean:
	- rm -rf build static-app/.cache static-app/public
