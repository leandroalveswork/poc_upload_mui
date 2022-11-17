import express, { Request, Response } from 'express';
import cors from "cors";
import { IncomingMessage, Server } from 'http';
import { uploadFile, listFiles, Input } from './controller/fileController';
import bodyParser from 'body-parser';
import { FileRequest } from './controller/FileRequest';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
const bodyParserOptions: bodyParser.Options = {
  inflate: true,
  limit: '3000kb',
  type: '*/*',
  verify: (req: FileRequest, res: Response, buf: Buffer) => {
    const indexSeparadorContentType = req.headers['content-type']?.indexOf(';') ?? -1;
    if (indexSeparadorContentType == -1)
      return;    
    req.buffer = buf;
  }
};

let filesArr: Input[] = [];

app.get('/files', async (req, res) => listFiles(req, res, filesArr));
app.post('/upload', bodyParser.raw(bodyParserOptions), async (req, res) => uploadFile(req, res, filesArr));

const backendHost = 'localhost:8080';
const portaHost = parseInt(backendHost.substring(backendHost.indexOf(':') + 1));
const server = app.listen(portaHost, () => console.log('🚀 Servidor escutando na url: http://' + backendHost));