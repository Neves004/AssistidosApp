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
import multer from "multer";


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
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueName = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

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

const verifyAdmin = (req, res, next) => {
    console.log('USER:', req.user);
    if (req.user) {
        if (req.user.role) {
            if (req.user.role === 'superadmin') {
                next();
            } else {
                res.status(401).json({ message: 'Não autorizado' });
            }
        } else {
            res.status(401).json({ message: 'Não autorizado' });
        }
    } else {
        res.status(401).json({ message: 'Não autorizado' });
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
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(200).json({ message: 'Registrado com sucesso', token, user: { id: user.id, username: user.username, email: user.email, avatar: user.avatar, role: user.role } })

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

        //att última atvvd
        await usuarioRepo.update(
            { id: user.id },
            { last_login: new Date() }
        );

        const token = jwt.sign({ id: user.id, username: user.username, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: '7d'
        });
        res.status(200).json({ message: 'Logado com sucesso', token, user: { id: user.id, username: user.username, email: user.email, avatar: user.avatar, role: user.role } });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Erro interno do servidor'
        });

    }
});


//Inserindo os titulos no BD
app.post('/titulos', verifyBearer, upload.single('image'), async (req, res) => {
    try {
        const { titleName, startDate, endDate, genre, note, comment, type } = req.body;

        const fileUrl = req.file
            ? `uploads/${req.file.filename}`
            : null;

        if (!fileUrl) {
            return res.status(400).json({ message: 'Imagem obrigatória' });
        }

        if (endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (start.valueOf() > end.valueOf()) {
                return res.status(400).json({
                    message: 'Data final deveria ser posterior à inicial'
                });
            }
        }

        await tituloRepo.insert({ titleName, startDate, endDate, genre, note, comment, image: fileUrl, type, user: req.user.id });

        return res.status(200).json({
            message: 'Título registrado com sucesso'
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Erro interno' });
    }
});


//Pegando o tipo
app.get('/tipos', verifyBearer, async (req, res) => {
    const result = await tipoRepo.find();
    res.status(200).json(result)
})



//Pegando as informações do titulo
app.get('/titulos', verifyBearer, async (req, res) => {
    const { query, type, sort } = req.query;

    const qb = tituloRepo.createQueryBuilder('t')
        .leftJoinAndSelect('t.user', 'user')
        .leftJoinAndSelect('t.type', 'type')
        .where('user.id = :userId', { userId: req.user.id });

    // BUSCA (texto)
    if (query) {
        qb.andWhere(
            `(t.titleName LIKE :q OR t.genre LIKE :q OR t.comment LIKE :q)`,
            { q: `%${query}%` }
        );
    }

    // FILTRO POR TIPO
    if (type && type !== 'Todos') {
        qb.andWhere('type.id = :type', { type: Number(type) });
    }

    // ORDENAÇÃO
    switch (sort) {
        case 'highest':
            qb.orderBy('t.note', 'DESC');
            break;

        case 'lowest':
            qb.orderBy('t.note', 'ASC');
            break;

        case 'old':
            qb.orderBy('t.startDate', 'ASC');
            break;

        default:
            qb.orderBy('t.startDate', 'DESC');
            break;
    }

    const result = await qb.getMany();

    return res.status(200).json(result);
});

//Atualizando as informações do titulo
app.put('/titulos', verifyBearer, upload.single('image'), async (req, res) => {
    const { id, titleName, startDate, endDate, genre, note, comment, type } = req.body;

    const titulo = await tituloRepo.findOne({
        relations: { user: true, type: true },
        where: { id }
    });

    if (titulo.user.id != req.user.id) {
        return res.status(401).json({ message: 'Sem permissão' });
    }

    const newType = await tipoRepo.findOneBy({ id: type });

    if (endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start.valueOf() > end.valueOf()) {
            return res.status(400).json({
                message: 'Data final deveria ser posterior à data inicial'
            });
        }
    }

    const fileUrl = req.file
        ? `uploads/${req.file.filename}`
        : titulo.image;

    await tituloRepo.update({ id }, { titleName, startDate, endDate: (newType.canHaveEndDate ? endDate : null), genre, note, comment, image: fileUrl, type });

    return res.status(200).json({ message: 'Título atualizado com sucesso' });
});

//Apagando titulo
app.delete('/titulos/:id', verifyBearer, async (req, res) => {
    const id = req.params.id;

    const titulo = await tituloRepo.findOne({ relations: { 'user': true }, where: { id } });
    if (titulo['user']['id'] == req.user.id) {
        fs.rmSync(titulo.image);
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
            { 'user': req.user.id, note: (`%${query}%`) },
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

    const titulos = await tituloRepo.createQueryBuilder('t')
    .leftJoinAndSelect('t.type', 'type')
    .leftJoinAndSelect('t.user', 'user')
    .where('user.id='+req.user.id).getMany();

    console.log(titulos)
    console.log(req.user)
    console.log(req.user.id)

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
app.post('/user/avatar', verifyBearer, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Imagem não enviada' });
        }

        const fileUrl = `uploads/${req.file.filename}`;

        await usuarioRepo.update(
            { id: req.user.id },
            { avatar: fileUrl }
        );

        return res.status(200).json({
            message: 'Avatar salvo com sucesso',
            avatar: fileUrl
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Erro ao salvar imagem' });
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


/* ROTAS SUPERADMIN */
app.get('/admin/dashboard', verifyBearer, verifyAdmin, async (req, res) => {
    try {

        const usuarios = await usuarioRepo.count();
        const titulos = await tituloRepo.count();

        const filmes = await tituloRepo.count({
            relations: {
                type: true
            },
            where: {
                type: {
                    id: 1
                }
            }
        });

        const series = await tituloRepo.count({
            relations: {
                type: true
            },
            where: {
                type: {
                    id: 2
                }
            }
        });

        const animes = await tituloRepo.count({
            relations: {
                type: true
            },
            where: {
                type: {
                    id: 3
                }
            }
        });

        const listaTitulos = await tituloRepo.find({
            relations: {
                type: true
            }
        });

        // ===== GÊNERO FAVORITO =====

        const generos = {};

        listaTitulos.forEach(titulo => {
            const genero = titulo.genre;

            if (!generos[genero]) {
                generos[genero] = 0;
            }

            generos[genero]++;
        });

        let generoFavorito = 'Nenhum';
        let maiorQuantidade = 0;

        Object.entries(generos).forEach(
            ([genero, quantidade]) => {

                if (quantidade > maiorQuantidade) {
                    maiorQuantidade = quantidade;
                    generoFavorito = genero;
                }
            }
        );

        // ===== TIPO FAVORITO =====

        let tipoFavorito = 'Nenhum';
        let maiorTipo = 0;

        if (filmes > maiorTipo) {
            maiorTipo = filmes;
            tipoFavorito = 'Filmes';
        }

        if (series > maiorTipo) {
            maiorTipo = series;
            tipoFavorito = 'Séries';
        }

        if (animes > maiorTipo) {
            maiorTipo = animes;
            tipoFavorito = 'Animes';
        }

        return res.json({
            usuarios,
            titulos,
            filmes,
            series,
            animes,
            generoFavorito,
            tipoFavorito
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Erro ao gerar dashboard'
        });
    }
});

app.get('/admin/top-users', verifyBearer, verifyAdmin, async (req, res) => {
    try {
        const ranking = await tituloRepo.createQueryBuilder('titulo')
            .innerJoin('titulo.user', 'usuario') // Usa a relação 'user' que está na entidade Titulo
            .select([
                'usuario.id AS id',
                'usuario.username AS username',
                'usuario.avatar AS avatar'
            ])
            .addSelect('COUNT(titulo.id)', 'totalTitulos')
            .groupBy('usuario.id')
            .orderBy('totalTitulos', 'DESC')
            .limit(5)
            .getRawMany();


        return res.json(
            ranking
        );

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: 'Erro ao gerar ranking'
        });

    }
});

app.get('/admin/users', verifyBearer, verifyAdmin, async (req, res) => {
    try {

        const usuarios = await usuarioRepo.find({
            select: {
                id: true,
                email: true,
                username: true,
                avatar: true,
                created_at: true,
                role: true,
            },
            order: {
                created_at: 'DESC'
            },
            'where': {'role': 'user'}
        });

        return res.json(usuarios);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: 'Erro ao listar usuários'
        });
    }
});

app.get('/admin/users/:id', verifyBearer, verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const user = await usuarioRepo.findOne({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({
                message: 'Usuário não encontrado'
            });
        }

        const titulos = await tituloRepo.find({
            where: {
                user: { id: user.id }
            },
            relations: {
                type: true
            }
        });

        const totalTitulos = titulos.length;

        // ======================
        // CONTAGEM POR TIPO
        // ======================
        const filmes = titulos.filter(t => t.type?.id === 1).length;
        const series = titulos.filter(t => t.type?.id === 2).length;
        const animes = titulos.filter(t => t.type?.id === 3).length;

        // ======================
        // GÊNEROS POR TIPO
        // ======================
        const generos = {
            filmes: {},
            series: {},
            animes: {}
        };

        titulos.forEach(t => {
            const tipo = t.type?.id;
            const genero = t.genre?.trim();

            if (!tipo || !genero) return;

            if (tipo === 1) {
                generos.filmes[genero] = (generos.filmes[genero] || 0) + 1;
            }

            if (tipo === 2) {
                generos.series[genero] = (generos.series[genero] || 0) + 1;
            }

            if (tipo === 3) {
                generos.animes[genero] = (generos.animes[genero] || 0) + 1;
            }
        });

        // ======================
        // FUNÇÃO TOP GÊNERO
        // ======================
        function getTop(obj) {
            let top = 'Nenhum';
            let max = 0;

            Object.entries(obj).forEach(([g, qtd]) => {
                if (qtd > max) {
                    max = qtd;
                    top = g;
                }
            });

            return top;
        }

        // ======================
        // ÚLTIMOS TÍTULOS
        // ======================
        const ultimosTitulos = titulos
            .slice()
            .reverse()
            .slice(0, 5);

        // ======================
        // TEMPO INATIVO
        // ======================
        function getTempoInativo(data) {
            if (!data) return 'Nunca acessou';

            const diffMs = Date.now() - new Date(data).getTime();

            const minutos = Math.floor(diffMs / 60000);
            const horas = Math.floor(minutos / 60);
            const dias = Math.floor(horas / 24);

            if (dias > 0) return `${dias} dia(s)`;
            if (horas > 0) return `${horas} hora(s)`;
            if (minutos > 0) return `${minutos} min`;

            return 'Agora mesmo';
        }


        return res.json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                created_at: user.created_at,
                last_activity: user.last_activity,
            },

            tempoInativo: getTempoInativo(user.last_activity),

            totalTitulos,
            filmes: filmes??0,
            series: series??0,
            animes: animes??0,

            generoFavoritoFilmes: getTop(generos.filmes),
            generoFavoritoSeries: getTop(generos.series),
            generoFavoritoAnimes: getTop(generos.animes),

            ultimosTitulos
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Erro ao buscar usuário'
        });
    }
});

app.delete('/admin/users/:id', verifyBearer, verifyAdmin, async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await usuarioRepo.findOneBy({ id: userId });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // deletar títulos primeiro
        await tituloRepo.delete({
            user: { id: userId }
        });

        // deletar usuário
        const result = await usuarioRepo.delete(userId);

        console.log('DELETE RESULT:', result);

        return res.status(200).json({
            message: 'Conta deletada com sucesso'
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Erro ao deletar conta'
        });
    }
});

app.get('/cover/:name', verifyBearer, async (req, res) => {
    const tmdbKey = process.env.TMDB_SECRET;
    const name = req.params.name;

    const responseMovie = await fetch('https://api.themoviedb.org/3/search/movie?query='+name,
        {
            headers: {
                'Authorization': 'Bearer ' + tmdbKey
            }
        }
    );

    const responseTv = await fetch('https://api.themoviedb.org/3/search/tv?query='+name,
        {
            headers: {
                'Authorization': 'Bearer ' + tmdbKey
            }
        }
    );

    const results = await responseMovie.json();
    const resultsTV = await responseTv.json();

    const covers = []

    results.results.forEach((v, i) => {
        covers.push({path: `https://image.tmdb.org/t/p/w500${v.poster_path}`})
    })
    resultsTV.results.forEach((v, i) => {
        covers.push({path: `https://image.tmdb.org/t/p/w500${v.poster_path}`})
    })

    res.status(200).json(covers);


})

app.listen({ port: 3001, host: '0.0.0.0' }, () => console.log(`Assistidos rodando na porta 3001 acesse por http://localhost:3001`))

