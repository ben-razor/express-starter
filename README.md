# ExpressJS Starter

Starting point for creating [ExpressJS](https://expressjs.com/) API backends.

Uses [rollup.js](https://rollupjs.org/guide/en/) to create small builds for fast deployment.

# Preparing a build for export

To create the build run **npm run rollup**.

The only files that need copying to the production server are **package.json** and the **build** subdirectory.

Then run **npm run prod** to start the server.

Or run **nohup npm run prod &** to start it in the background.
