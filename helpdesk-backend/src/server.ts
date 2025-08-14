import { AppDataSource } from "./data-source";
import { app } from "./app";

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err:any) => {
    console.error("DB connection error:", err);
  });
