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

// Selecionar todos Votos

app.get("/listaVoto", async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM voto`);
    console.log(rows);
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

// Selecionar quantidade de votos das sessões

app.get("/listaQuantidadeVotos/", async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT id, qtd_votospos FROM sessao`);
    console.log(rows);
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

// Selecionar todas sessões

app.get("/listaSessao", async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM sessao`);
    console.log(rows);
    return res.status(200).send(rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

// Inserir Voto

app.post("/inserirVoto/", async (req, res) => {
  const { voto, estado, sessao } = req.body;
  console.log(voto);
  console.log(estado);
  console.log(Number(sessao));

  const id = sessao;

  await pool.query(
    `INSERT INTO voto (resposta, estado, sessao_voto) VALUES ('${voto}', '${estado}', ${sessao})
`
  );

  if (voto == "nao" || voto == "não" || voto == "Nao" || voto == "Não") {
    let qtdNeg;
    try {
      const QtdNeg = await pool
        .query(`SELECT qtd_votosneg from sessao where id = ${id}`)
        .then((resp) => {
          let qtdNegBanco = resp.rows[0].qtd_votosneg;
          qtdNeg = qtdNegBanco;
          qtdNeg++;

          pool.query(
            `UPDATE sessao SET qtd_votosneg = ${qtdNeg} where id = ${id}
          `
          );
        });

      console.log(qtdNeg);

      return res.status(200).send(res.qtdNeg);
    } catch (error) {
      return res.status(400).send(error);
    }
  } else if (voto == "sim" || voto == "Sim") {
    let qtdSim;
    try {
      const QtdSim = await pool
        .query(`SELECT qtd_votospos from sessao where id = ${id}`)
        .then((resp) => {
          let qtdSimBanco = resp.rows[0].qtd_votospos;
          qtdSim = qtdSimBanco;
          qtdSim++;

          pool.query(
            `UPDATE sessao SET qtd_votospos = ${qtdSim} where id = ${id}
          `
          );
        });

      console.log(qtdSim);

      return res.status(200).send(res.qtdSim);
    } catch (error) {
      return res.status(400).send(error);
    }
  } else {
    pool.query(
      `UPDATE sessao SET qtd_votospos = ${qtdSim} where id = ${id}
    `
    );
  }
});

// Inserir Sessão

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

// Deletar Sessão

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

// Atualizar Sessão

app.put("/atualizarSessao/", async (req, res) => {
  const { id, nome, tipo, estado, descricao } = req.body;

  console.log(id);

  try {
    const newSessao = await pool.query(
      `UPDATE sessao SET nome = '${nome}', tipo = '${tipo}', estado = '${estado}', descricao = '${descricao}'  where id = ${id}`
    );
    return res.status(200).send(newSessao.rows);
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
