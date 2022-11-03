import Button from "../components/common/Button";
import Layout from "../components/common/Layout";
import axios from "axios";
import Input from "../components/common/Formulario/Input";
import { useState } from "react";
import { QtdVotosRoute } from "../utils/apiRoutes";

const listaQtdVotos = ({ dados }) => {
  return (
    <div>
      <Layout title="Quantidade de Votos">
        <h1 className="text-xl font-bold">Votos Positivos</h1>
        <div className="mt-5">
          <ul className="overflow-auto h-60">
            {dados.map((dado, index) => (
              <li key={index}>
                <div className="flex justify-between mb-3">
                  <h1 className="">
                    Quantidade de Votos positivos da sessão {dado.id}:{" "}
                    {dado.qtd_votospos}
                  </h1>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-28 mt-6">
          <Button
            label="Voltar"
            customClass="bg-red-600 hover:bg-red-500 "
            href="/"
          />
        </div>
      </Layout>
    </div>
  );
};

listaQtdVotos.getInitialProps = async () => {
  const response = await axios.get(
    "http://localhost:5000/listaQuantidadeVotos"
  );

  return { dados: response.data };
};

export default listaQtdVotos;
