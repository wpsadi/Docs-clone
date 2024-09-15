// env.config.js
const dotenv = import("dotenv");

// Load environment variables from the .env file
dotenv.then((d) => d.config());
