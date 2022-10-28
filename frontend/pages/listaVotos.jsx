import axios from "axios";
import Button from "../components/common/Button";
import Layout from "../components/common/Layout";
const listaVotos = ({ dados }) => (
  <div>
    <Layout title="Lista de Votos">
      <div className="overflow-auto h-60">
        <ul>
          {dados.map((dado, index) => (
            <li key={index}>
              <h2>
                Voto da sessão {dado.sessao_voto}: {dado.resposta}, Estado:{" "}
                {dado.estado}
              </h2>

              <br />
            </li>
          ))}
        </ul>
      </div>

      <div className="w-28 mt-20">
        <Button
          label="Voltar"
          customClass="bg-red-600 hover:bg-red-500 "
          href="/"
        />
      </div>
    </Layout>
  </div>
);

listaVotos.getInitialProps = async () => {
  const response = await axios.get("http://localhost:5000/listaVoto/");

  return { dados: response.data };
};

export default listaVotos;
