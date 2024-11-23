import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

// Conecta ao banco de dados MongoDB usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);


// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts(params) {
    // Seleciona o banco de dados "Imersao-instabyte"
    const db = conexao.db("Imersao-instabyte");
  
    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");
  
    // Busca todos os documentos da coleção "posts" e retorna como um array
    return colecao.find().toArray();
  }

export async function criarPost(novoPost) {
    
    const db = conexao.db("Imersao-instabyte");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    
  const db = conexao.db("Imersao-instabyte");
  const colecao = db.collection("posts");
  const objId = ObjectId.createFromHexString(id)
  return colecao.updateOne({_id: new ObjectId(objId)},{$set:novoPost});
}