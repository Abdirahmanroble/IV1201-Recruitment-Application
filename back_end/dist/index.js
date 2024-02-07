"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DAO_1 = __importDefault(require("./integration/DAO"));
const login_1 = require("./controller/login");
const personRoutes_1 = __importDefault(require("./routes/personRoutes"));
function testDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield DAO_1.default.authenticate();
            console.log("Connection has been established successfully.");
        }
        catch (error) {
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
app.get("/", (req, res) => {
    res.send("Sever is up and running!");
});
// app.get("/users", (req: Request, res: Response) => {
//   // res.send("Sever is up and running!");
//   res.json(Person);
// });
app.get("/tables", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield DAO_1.default.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';");
        res.json(results);
    }
    catch (error) {
        console.error("Error fetching tables:", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.post("/user", login_1.getUser);
app.use('/api/person', personRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
