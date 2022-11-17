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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFiles = exports.uploadFile = void 0;
var parse_multipart_data_1 = require("parse-multipart-data");
var uploadFile = function (req, res, filesArr) { return __awaiter(void 0, void 0, void 0, function () {
    var indexSeparadorContentType, boundaryKeyValue, boundary, parts;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        try {
            indexSeparadorContentType = (_b = (_a = req.headers['content-type']) === null || _a === void 0 ? void 0 : _a.indexOf(';')) !== null && _b !== void 0 ? _b : -1;
            if (indexSeparadorContentType == -1) {
                console.log('dump Content Type-header = [' + req.headers['content-type'] + ']');
                res.status(400).send('Header Content-Type invalido');
                return [2 /*return*/];
            }
            boundaryKeyValue = req.headers['content-type'].substring(((_c = req.headers['content-type'].indexOf(';')) !== null && _c !== void 0 ? _c : -1) + 1);
            console.log('dump boundaryKeyValue = [' + boundaryKeyValue + ']');
            boundary = boundaryKeyValue.substring(boundaryKeyValue.indexOf('boundary=') + 9);
            console.log('dump boundary = [' + boundary + ']');
            console.log('dump typeof req.body = [' + typeof req.body + ']');
            console.table(req.body);
            parts = (0, parse_multipart_data_1.parse)(req.body, boundary);
            // Adicionar apenas o primeiro buffer
            filesArr.push(parts[0]);
            console.table(filesArr);
            res.send();
        }
        catch (exc) {
            console.log(exc);
            res.status(500).send('Erro no servidor :(');
        }
        return [2 /*return*/];
    });
}); };
exports.uploadFile = uploadFile;
var listFiles = function (req, res, filesArr) { return __awaiter(void 0, void 0, void 0, function () {
    var base64Output, _i, filesArr_1, iFile;
    return __generator(this, function (_a) {
        base64Output = [];
        for (_i = 0, filesArr_1 = filesArr; _i < filesArr_1.length; _i++) {
            iFile = filesArr_1[_i];
            base64Output.push({
                filename: iFile.filename,
                name: iFile.name,
                type: iFile.type,
                base64Data: iFile.data.toString('base64')
            });
        }
        res.send(base64Output);
        return [2 /*return*/];
    });
}); };
exports.listFiles = listFiles;
