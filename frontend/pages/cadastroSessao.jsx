import React from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Formulario/Input";
import Layout from "../components/common/Layout";
import { useState } from "react";
import axios from "axios";
import { SessaoRoute } from "../utils/apiRoutes";

const CadastroSessao = () => {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [descricao, setDescricao] = useState("");
  const [submit, setSubmit] = useState(false);

  const Submit = async () => {
    await axios.post(SessaoRoute, { nome, tipo, estado, descricao });
    setSubmit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nome, tipo, estado, descricao);
    Submit();
  };

  return (
    <Layout title="Cadastro de Sessão">
      <form onSubmit={handleSubmit}>
        <Input
          id="inputNome"
          label="Nome"
          placeholder="Insira o nome da sessão"
          value={nome}
          onChange={setNome}
        />
        <Input
          id="inputSessao"
          label="Tipo da Sessão"
          placeholder="Insira o tipo da sessão"
          value={tipo}
          onChange={setTipo}
        />
        <Input
          id="inputEstado"
          label="Estado"
          placeholder="Insira o estado da sessão"
          value={estado}
          onChange={setEstado}
        />

        <div className="flex flex-col mb-4">
          <label className="font-bold" htmlFor="inputDescricao">
            Descrição da Sessão
          </label>
          <textarea
            className="bg-gray-100 mt-2 p-3"
            id="inputDescricao"
            placeholder="Insira a descrição da Sessão"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></textarea>
        </div>
        <div className="flex mt-8">
          <div className="mr-3 w-28">
            <Button
              label="Salvar"
              customClass="bg-green-600 hover:bg-green-500"
              href=""
              onClick={handleSubmit}
            />
          </div>
          <div className="w-28">
            <Button
              label="Voltar"
              customClass="bg-red-600 hover:bg-red-500"
              href="/"
            />
          </div>
        </div>
      </form>
      {submit && (
        <h1 className="bg-green-600 p-3 mt-9 text-white">
          Cadastro de sessão efetuado com sucesso
        </h1>
      )}
    </Layout>
  );
};

export default CadastroSessao;
