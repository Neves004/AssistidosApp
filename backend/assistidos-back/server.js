import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { AppDataSource } from './datasource.js';
import { Usuario } from "./entity/Usuario.js";
import { Titulo } from "./entity/Titulo.js";
import { Tipo } from "./entity/Tipo.js";
import { Like } from 'typeorm';

AppDataSource.initialize().then(() => {
    console.log('Banco criado slk, compens')
})

// Criação dos repositório para as tabelas
const usuarioRepo = AppDataSource.getRepository(Usuario);
const tituloRepo = AppDataSource.getRepository(Titulo);
const tipoRepo = AppDataSource.getRepository(Tipo);

dotenv.config();

const BCRYPT_ROUNDS = 10;

const app = express(); //Inicializar o express
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//Pasta para uploads
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
//Garante que a pasta existe
fs.mkdirSync(path.join(dirname, 'uploads'), { recursive: true });

const JWT_SECRET = process.env.JWT_SECRET;

//conferir token
const verifyBearer = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Sem token de autorização' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedPayload = jwt.verify(token, JWT_SECRET);
        req.user = decodedPayload;

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token de autorização mal-formado ou vencido.' });
    }
}


//Autenticação
app.post('/register', async (requisicao, resposta) => {
    const { email, username, password } = requisicao.body;
    const pass = bcrypt.hashSync(password, BCRYPT_ROUNDS); //criptografando senha
    const result = await usuarioRepo.insert({
        email, username, password: pass, avatar: '', created_at: new Date()
    });
    const user = await usuarioRepo.findOneBy({ email, username });
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, {
        expiresIn: '7d'
    });

    resposta.status(200).json({ message: 'Registrado com sucesso', token })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await usuarioRepo.findOneBy({ email });
    const isSame = bcrypt.compareSync(password, user.password); //comparando senha com a senha criptografada no banco

    if (isSame) {
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, {
            expiresIn: '7d'
        });
        res.status(200).json({ message: 'Logado com sucesso', token });
    } else {
        res.status(401).json({ message: 'E-mail ou senha incorretos' });
    }
})

//Inserindo os titulos no BD
app.post('/titulos', verifyBearer, async (req, res) => {
    const { titleName, startDate, endDate, genre, note, comment, image, type } = req.body;
    console.log(req.user);
    const result = await tituloRepo.insert({
        titleName, startDate, endDate, genre, note, comment, image, type, user: req.user.id
    });
    res.status(200).json({ message: 'Título registrado com sucesso' })
})

//Pegando o tipo
app.get('/tipos', verifyBearer, async (req, res) => {
    const result = await tipoRepo.find();
    res.status(200).json(result)
})

//Pegando as informações do titulo
app.get('/titulos', verifyBearer, async (req, res) => {
    const result = await tituloRepo.find({relations: {'user': true, 'type': true}, where: {'user': req.user.id}});
    res.status(200).json(result);
})

//Atualizando as informações do titulo
app.put('/titulos', verifyBearer, async (req, res) => {
    const { id, titleName, startDate, endDate, genre, note, comment, image, type } = req.body;

    const titulo = await tituloRepo.findOne({relations: {'user': true, 'type': true}, where: {id}});

    if (titulo['user']['id'] == req.user.id) {
        const newType = await tipoRepo.findOneBy({id: type});

        const result = await tituloRepo.update({ id }, {
            titleName, startDate, endDate:(newType.canHaveEndDate?endDate:null), genre, note, comment, image, type
        });
        res.status(200).json({ message: 'Título atualizado com sucesso' })
    }
    res.status(401).json({message: 'Sem permissão'});
})


//Apagando titulo
app.delete('/titulos/:id', verifyBearer, async(req,res) =>{
    const id = req.params.id;

    const titulo = await tituloRepo.findOne({relations: {'user':true}, where:{id}});
    if(titulo['user']['id'] == req.user.id){
        const result = await tituloRepo.delete({id});
        res.status(202).json({message: 'Titulo apagado com sucesso'})
        return;
    }
    res.status(401).json({message: 'Sem permissão'});
})

app.get('/titulos/:query', verifyBearer, async(req,res)=>{
    const query = req.params.query;
     const result = await tituloRepo.find({relations: {'user': true, 'type': true}, where: {'user': req.user.id,titleName:Like(`%${query}%`)}});
    res.status(200).json(result);
})

app.listen({ port: 3001, host: '0.0.0.0' }, () => console.log(`Assistidos rodando na porta 3001 acesse por http://localhost:3001`))

