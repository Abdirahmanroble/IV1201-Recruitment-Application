"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConfig_1 = __importDefault(require("./integration/dbConfig"));
const login_1 = require("./controller/login");
const personRoutes_1 = __importDefault(require("./routes/personRoutes"));
const cors_1 = __importDefault(require("cors"));
function testDatabaseConnection() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield dbConfig_1.default.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  });
}
testDatabaseConnection().catch((error) => {
  console.error("Database connection failed:", error);
});
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(
  (0, cors_1.default)({
    origin: "http://localhost:4000",
  })
);
app.get("/", (req, res) => {
  res.send("Sever is up and running!");
});
app.post("/user", login_1.getUser);
app.post("/user", login_1.getUser);
//Login
app.use(personRoutes_1.default);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// app.get("/users", (req: Request, res: Response) => {
//   // res.send("Sever is up and running!");
//   res.json(Person);
// });
/* app.get("/tables", async (req: Request, res: Response) => {
  try {
    const [results] = await db.query(
      "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';"
    );
    res.json(results);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).send("Internal Server Error");
  }
}); */
