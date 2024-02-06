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
function testDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield DAO_1.default.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
testDatabaseConnection().catch((error) => {
    console.error('Database connection failed:', error);
});
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Sever is up and running!');
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
