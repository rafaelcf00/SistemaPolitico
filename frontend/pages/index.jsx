import Button from "../components/common/Button";
import Layout from "../components/common/Layout";
import axios from "axios";
import Input from "../components/common/Formulario/Input";
import { useState } from "react";

const Home = ({ dados }) => {
  return (
    <div>
      <Layout title="Sessões Disponíveis">
        <div className="flex justify-between mb-12 ">
          <div className="w-28">
            <Button
              label="Novo"
              customClass="bg-yellow-600 hover:bg-yellow-500"
              href="/cadastroSessao"
            />
          </div>
          <div className="w-28">
            <Button
              label="Inserir Voto"
              customClass="bg-green-600 hover:bg-green-500"
              href="/cadastroVoto"
            />
          </div>
        </div>

        <ul className="overflow-auto h-60">
          {dados.map((dado, index) => (
            <li key={index}>
              <div>
                <div className="flex justify-between mb-3">
                  <h1 className="">
                    Sessão {dado.id}: {dado.nome}
                  </h1>
                </div>

                <h2 className="mb-3">Tipo de Sessão: {dado.tipo}</h2>
                <h2 className="mb-3">Descição da Sessão: {dado.descricao} </h2>
              </div>

              <br />
            </li>
          ))}
        </ul>
        <div className="mt-12 flex w-full justify-between">
          <Button
            label="Listar Votos"
            customClass="bg-gray-600 hover:bg-gray-500"
            href="listaVotos/"
          />
          <Button
            label="Quantidade de Votos"
            customClass="bg-gray-600 hover:bg-gray-500"
            href="listaQtdVotos/"
          />
        </div>
      </Layout>
    </div>
  );
};

Home.getInitialProps = async () => {
  const response = await axios.get("http://localhost:5000/listaSessao");

  return { dados: response.data };
};

export default Home;
