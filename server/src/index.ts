import httpServer from "./app.js";


const PORT = process.env.PORT || 3000

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
}) 
// console.log('index.ts')