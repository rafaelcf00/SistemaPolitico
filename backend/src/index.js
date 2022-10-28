const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();
const PORT = 5000;
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
const app = express();

app.use(express.json());
app.use(cors());

app.get("/listaVoto", async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM voto`);
    console.log(rows);
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.get("/listaVoto/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT resposta, estado FROM voto where sessao_voto = ${id}`
    );
    console.log(rows);
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.get("/listaSessao", async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM sessao`);
    console.log(rows);
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.get("/listaSessao/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT id, nome FROM sessao where id = ${id}`
    );
    console.log(rows);
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post("/inserirVoto/", async (req, res) => {
  const { voto, estado, sessao } = req.body;
  console.log(voto);
  console.log(estado);
  console.log(Number(sessao));
  try {
    const newVoto = await pool.query(
      `INSERT INTO voto (resposta, estado, sessao_voto) VALUES ('${voto}', '${estado}', ${sessao})`
    );
    return res.status(200).send(newVoto.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post("/inserirSessao/", async (req, res) => {
  const { nome, tipo, estado, descricao } = req.body;

  try {
    const newSessao = await pool.query(
      `INSERT INTO sessao(nome, tipo, estado, descricao) VALUES ('${nome}', '${tipo}', '${estado}', '${descricao}')`
    );
    return res.status(200).send(newSessao.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.delete("/deleteSessao/", async (req, res) => {
  const { id } = req.body;

  console.log(id);

  try {
    const newSessao = await pool.query(`DELETE FROM sessao WHERE id = ${id}`);
    return res.status(200).send(newSessao.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
