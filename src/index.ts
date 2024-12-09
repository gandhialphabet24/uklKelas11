import express from "express";
import cors from "cors";
import userR from "./routes/userR";
import barangR from "./routes/barangR";

const app = express();

app.use(cors());
app.use(`/user`, userR);
app.use(`/barang`, barangR);
//Start code here
const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
