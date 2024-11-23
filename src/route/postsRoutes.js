import express from "express";
import multer from "multer";
import cors from "cors";
import { listarposts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postscontroller.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}


// Configura o armazenamento de imagens para o upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para as imagens: "uploads/"
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo
    cb(null, file.originalname);
  }
});

// Define o middleware Multer com as configurações de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Função que define as rotas da aplicação
const routes = (app) => {
  // Habilita o middleware para analisar o corpo das requisições JSON
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para listar todos os posts (implementação provavelmente em postscontroller.js)
  app.get("/posts", listarposts);

  // Rota POST para criar um novo post (implementação provavelmente em postscontroller.js)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem
  app.post("/upload", upload.single("imagem"), uploadImagem);
    // - upload.single("imagem"): Configura o Multer para receber um único arquivo
    //   com o nome "imagem" no corpo da requisição.
    // - uploadImagem: Função que lida com o upload da imagem (implementação 
    //   provavelmente em postscontroller.js) 
    app.put("/upload/:id", atualizarNovoPost )
};

export default routes;