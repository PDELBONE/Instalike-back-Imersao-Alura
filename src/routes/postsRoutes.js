// Importa o express para criar a aplicação web
import express from "express";

// Importa o multer para lidar com uploads de arquivos
import multer from "multer";

// Importa funções controladoras de posts do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Define como o multer vai armazenar os arquivos
const storage = multer.diskStorage({
  // Define a pasta de destino para os uploads (./uploads)
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo como o nome original
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Configura o multer para usar o storage definido
const upload = multer({ dest: "./uploads", storage });

// Função que define as rotas da aplicação
const routes = (app) => {
  // Permite que a aplicação interprete dados JSON enviados no corpo da requisição
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para listar todos os posts (executa a função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (executa a função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware upload.single("imagem") e depois executa a função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função routes para ser usada em outro arquivo
export default routes;