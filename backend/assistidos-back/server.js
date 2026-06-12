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

//Pasta para uploads
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
//Garante que a pasta existe
fs.mkdirSync(path.join(dirname, 'uploads'), { recursive: true });

const app = express(); //Inicializar o express
app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(dirname, 'uploads')));


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
app.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({
                message: 'Preencha todos os campos'
            });
        }

        if (username.trim().length < 3) {
            return res.status(400).json({
                message: 'O nome de usuário deve ter pelo menos 3 caracteres'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'E-mail inválido'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'A senha deve ter pelo menos 6 caracteres'
            });
        }

        const emailExistente = await usuarioRepo.findOneBy({ email });

        if (emailExistente) {
            return res.status(400).json({
                message: 'Este e-mail já está cadastrado'
            });
        }

        const usuarioExistente = await usuarioRepo.findOneBy({ username });

        if (usuarioExistente) {
            return res.status(400).json({
                message: 'Este nome de usuário já está em uso'
            });
        }

        const pass = bcrypt.hashSync(password, BCRYPT_ROUNDS); //criptografando senha

        const result = await usuarioRepo.insert({
            email, username, password: pass, avatar: '', created_at: new Date()
        });

        const user = await usuarioRepo.findOneBy({ email });
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(200).json({ message: 'Registrado com sucesso', token })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Erro ao registrar usuário'
        });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Preencha e-mail e senha' });
        }

        const user = await usuarioRepo.findOneBy({ email }); //comparando email com email no banco

        if (!user) {
            return res.status(401).json({
                message: 'E-mail ou senha incorretos'
            });
        }

        const isSame = bcrypt.compareSync(password, user.password); //comparando senha com a senha criptografada no banco

        if (!isSame) {
            return res.status(401).json({
                message: 'E-mail ou senha incorretos'
            });
        }

        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, {
            expiresIn: '7d'
        });
        res.status(200).json({ message: 'Logado com sucesso', token, user: { id: user.id, username: user.username, email: user.email, avatar: user.avatar } });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Erro interno do servidor'
        });

    }
});



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
    const result = await tituloRepo.find({ relations: { 'user': true, 'type': true }, where: { 'user': req.user.id } });
    res.status(200).json(result);
})

//Atualizando as informações do titulo
app.put('/titulos', verifyBearer, async (req, res) => {
    const { id, titleName, startDate, endDate, genre, note, comment, image, type } = req.body;

    const titulo = await tituloRepo.findOne({ relations: { 'user': true, 'type': true }, where: { id } });

    if (titulo['user']['id'] == req.user.id) {
        const newType = await tipoRepo.findOneBy({ id: type });

        const result = await tituloRepo.update({ id }, {
            titleName, startDate, endDate: (newType.canHaveEndDate ? endDate : null), genre, note, comment, image, type
        });
        res.status(200).json({ message: 'Título atualizado com sucesso' })
    }
    res.status(401).json({ message: 'Sem permissão' });
})


//Apagando titulo
app.delete('/titulos/:id', verifyBearer, async (req, res) => {
    const id = req.params.id;

    const titulo = await tituloRepo.findOne({ relations: { 'user': true }, where: { id } });
    if (titulo['user']['id'] == req.user.id) {
        const result = await tituloRepo.delete({ id });
        res.status(202).json({ message: 'Titulo apagado com sucesso' })
        return;
    }
    res.status(401).json({ message: 'Sem permissão' });
})

//Input de pesquisa
app.get('/titulos/:query', verifyBearer, async (req, res) => {
    const query = req.params.query;
    const result = await tituloRepo.find({
        relations: { 'user': true, 'type': true }, where: [
            { 'user': req.user.id, titleName: Like(`%${query}%`) },
            { 'user': req.user.id, note: Like(`%${query}%`) },
            { 'user': req.user.id, genre: Like(`%${query}%`) },
            { 'user': req.user.id, startDate: Like(`%${query}%`) },
            { 'user': req.user.id, endDate: Like(`%${query}%`) },
            { 'user': req.user.id, comment: Like(`%${query}%`) }
        ]
    });
    res.status(200).json(result);
})

//Atualizar nome de usuário
app.put('/user', verifyBearer, async (req, res) => {
    try {
        const { id, username } = req.body;

        if (!username) {
            return res.status(400).json({
                message: 'Informe um nome de usuário'
            });
        }

        if (username.trim().length < 3) {
            return res.status(400).json({
                message: 'O nome de usuário deve ter pelo menos 3 caracteres'
            });
        }

        const usuarioExistente = await usuarioRepo.findOneBy({ username });

        if (usuarioExistente) {
            return res.status(400).json({
                message: 'Este nome de usuário já está em uso'
            });
        }

        await usuarioRepo.update({ id }, { username })
        res.status(200).json({ message: 'Nome de usuário atualizado com sucesso' })

    } catch {
        console.log(error);

        return res.status(500).json({
            message: 'Erro ao atualizar usuário'
        });
    }


})


//Pegando informações dos títulos para o perfil 
app.get('/perfil', verifyBearer, async (req, res) => {
    const titulos = await tituloRepo.find({
        relations: { type: true }, where: { user: req.user.id }
    });

    // Filtra apenas os títulos cujo tipo é "filme"
    const filmes = titulos.filter(
        t => t.type?.id === 1
    );

    // Filtra apenas os títulos cujo tipo é "série"
    const series = titulos.filter(
        t => t.type?.id === 2
    );

    // Filtra apenas os títulos cujo tipo é "anime"
    const animes = titulos.filter(
        t => t.type?.id === 3
    );
    //Calculando média das notas
    function mediaNotas(lista) {
        // Evitando divisão por zero
        if (lista.length === 0) return 0;

        // Soma todas as notas da lista
        const soma = lista.reduce(
            (acc, item) => acc + Number(item.note || 0),
            0
        );

        // Calcula a média
        // toFixed(1) mantém apenas 1 casa decimal
        return Number((soma / lista.length).toFixed(1));
    }

    //Descobrindo o título favorito 
    function generoFavorito(lista) {
        // Se não houver títulos
        if (lista.length === 0) return 'Nenhum';

        const contador = {};

        // Percorre todos os títulos e soma +1 cada gênero encontrado
        lista.forEach(item => {
            if (!item.genre) return;

            // separa por vírgula
            const generos = item.genre.split(',');

            // Remove espaços extras do início e do fim
            generos.forEach(genero => {
                const nome = genero.trim();

                //Se algum estiver vazio, só o ignora
                if (!nome) return;

                //Contador para somar a quantidade de cada
                contador[nome] =
                    (contador[nome] || 0) + 1;
            });
        });

        // Se nenhum gênero foi encontrado
        if (Object.keys(contador).length === 0)
            return 'Nenhum';

        // Procura o gênero com maior quantidade
        return Object.keys(contador).reduce((a, b) =>
            contador[a] > contador[b] ? a : b
        );
    }

    //Conversão das datas
    function converterData(data) {
        if (!data) return new Date(0);

        const [dia, mes, ano] = data.split('/');
        return new Date(
            Number(ano),
            Number(mes) - 1,
            Number(dia)
        );
    }

    //Pega o último filme asssistido
    const ultimoFilme = filmes.sort(
        (a, b) =>
            converterData(b.startDate).getTime() - converterData(a.startDate).getTime()
    )[0] || null;

    //Pega a última série assistida + tratamento caso não houver endDate
    const ultimaSerie = series.sort(
        (a, b) =>
            converterData(b.endDate || b.startDate).getTime() - converterData(a.endDate || a.startDate).getTime()
    )[0] || null;

    //Pega o último anime assistido + tratamento caso não houver endDate
    const ultimoAnime = animes.sort(
        (a, b) =>
            converterData(b.endDate || b.startDate).getTime() - converterData(a.endDate || a.startDate).getTime()
    )[0] || null;

    //Respostas sendo enviadas
    res.status(200).json({
        geral: {
            assistidos: titulos.length,
            generoFavorito: generoFavorito(titulos),
            mediaNotas: mediaNotas(titulos)
        },

        filmes: {
            assistidos: filmes.length,
            generoFavorito: generoFavorito(filmes),
            mediaNotas: mediaNotas(filmes)
        },

        series: {
            assistidos: series.length,
            generoFavorito: generoFavorito(series),
            mediaNotas: mediaNotas(series)
        },

        animes: {
            assistidos: animes.length,
            generoFavorito: generoFavorito(animes),
            mediaNotas: mediaNotas(animes)
        },

        ultimos: {
            filme: ultimoFilme,
            serie: ultimaSerie,
            anime: ultimoAnime
        }
    });
});


//Pegando o Avatar
app.post('/user/avatar', verifyBearer, async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ message: 'Imagem não enviada' });
        }

        const base64 = image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64, 'base64');
        const filename = uuidv4() + '.png';
        const filePath = path.join(dirname, 'uploads', filename);

        fs.writeFileSync(filePath, buffer);

        const BASE_URL = process.env.BASE_URL;
        const fileUrl = `${BASE_URL}/uploads/${filename}`;

        await usuarioRepo.update(
            { id: req.user.id },
            { avatar: fileUrl }
        );

        res.status(200).json({
            message: 'Avatar salvo com sucesso',
            avatar: fileUrl
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Erro ao salvar imagem' });
    }
});

app.get('/user/avatar', verifyBearer, async (req, res) => {
    try {
        const usuario = await usuarioRepo.findOne({
            where: { id: req.user.id },
            select: ['avatar']
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json({ avatar: usuario.avatar });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Erro ao buscar avatar' });
    }
});

app.delete('/titulos', verifyBearer, async (req, res) => {
    try {
        await tituloRepo.delete({ user: req.user.id });
        return res.status(200).json({ message: 'Todos os títulos foram removidos' });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Erro ao limpar dados' });
    }
});


app.listen({ port: 3001, host: '0.0.0.0' }, () => console.log(`Assistidos rodando na porta 3001 acesse por http://localhost:3001`))

