import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(StringConexao) {
    let mongoCliente;
    
    try {
        mongoCliente = new MongoClient(StringConexao);
        console.log('Conectando ao cluster do banco de dados...');
        await mongoCliente.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');

        return mongoCliente;
    } catch(erro) {
        console.error('Falha na conexao com o banco!', erro);
        process.exit();
    }
}