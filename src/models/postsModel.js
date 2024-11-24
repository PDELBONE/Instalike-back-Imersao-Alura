import 'dotenv/config';
import conectarAoBanco from "../config/dbConfig.js";
import { ObjectId } from "mongodb";

// Conecta-se ao banco de dados MongoDB usando a string de conexão fornecida no ambiente.
// A função `conectarAoBanco` provavelmente contém a lógica para estabelecer a conexão.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts da coleção "posts" no banco de dados "imersao-Instabytes".
export async function getTodosPosts() {
    // Obtém o banco de dados "imersao-Instabytes".
    const db = conexao.db("imersao-Instabytes");
    // Obtém a coleção "posts" dentro do banco de dados.
    const colecao = db.collection("posts");
    // Executa uma consulta para encontrar todos os documentos na coleção e retorna os resultados como um array.
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
        const db = conexao.db("imersao-Instabytes");
        const colecao = db.collection("posts");
        return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-Instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});
}