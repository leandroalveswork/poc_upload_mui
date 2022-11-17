import { Request, Response } from "express";
import { parse as parseMultipart } from 'parse-multipart-data';

declare type Input = {
    filename?: string;
    name?: string;
    type: string;
    data: Buffer;
};

declare type Base64Output = {
    filename?: string;
    name?: string;
    type: string;
    base64Data: string;
}

const uploadFile = async (req: Request, res: Response, filesArr: Input[]) => {
    try {
        
        // Validar o header contet-type
        const indexSeparadorContentType = req.headers['content-type']?.indexOf(';') ?? -1;
        if (indexSeparadorContentType == -1) {
            res.status(400).send('Header Content-Type invalido');
            return;
        }
            
        // Extrair o boundary (separador dos buffers)
        const boundaryKeyValue = (req.headers['content-type'] as string).substring(((req.headers['content-type'] as string).indexOf(';') ?? -1) + 1);
        const boundary = boundaryKeyValue.substring(boundaryKeyValue.indexOf('boundary=') + 9);
        
        // Obter os buffers
        const parts = parseMultipart(req.body, boundary);
        
        // Adicionar apenas o primeiro buffer
        filesArr.push(parts[0]);
        
        res.send();
    } catch (exc) {
        console.log(exc);
        res.status(500).send('Erro no servidor :(');
    }
}

const listFiles = async (req: Request, res: Response, filesArr: Input[]) => {
    
    // Parsear em base64 string
    let base64Output: Base64Output[] = [];
    for (let iFile of filesArr) {
        base64Output.push({
            filename: iFile.filename,
            name: iFile.name,
            type: iFile.type,
            base64Data: iFile.data.toString('base64')
        });
    }
    
    res.send(base64Output);
}

export { uploadFile, listFiles, Input };
