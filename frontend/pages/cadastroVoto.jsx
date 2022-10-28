import { useState } from "react";
import axios from "axios";
import { VotoRoute, getSessaoRoute } from "../utils/apiRoutes";
import Layout from "../components/common/Layout";
import Button from "../components/common/Button";
import Input from "../components/common/Formulario/Input";

const Formulario = () => {
  const [voto, setVoto] = useState("");
  const [estado, setEstado] = useState("");
  const [sessao, setSessao] = useState("");
  const [submit, setSubmit] = useState(false);

  const Submit = async () => {
    await axios.post(VotoRoute, { voto, estado, sessao });
    setSubmit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(voto);
    console.log(estado);
    console.log(sessao);

    Submit();
  };

  return (
    <Layout title="Cadastro de Voto">
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            label="Insira o Voto "
            type="text"
            id="inputVoto"
            value={voto}
            placeholder="Digite sim ou nao"
            onChange={setVoto}
          />
          <Input
            label="Insira o Estado "
            type="text"
            id="inputEstado"
            value={estado}
            placeholder="Digite o estado da sessão"
            onChange={setEstado}
          />
          <Input
            label="Insira a sessão que deseja votar (É possível ver as sessões disponíveis na Home da página): "
            type="number"
            id="inputSessao"
            value={sessao}
            placeholder="Insira o número da sessão"
            onChange={setSessao}
          />
        </div>
        <div className="flex mt-8">
          <div className="mr-3 w-28">
            <Button
              label="Salvar"
              customClass="bg-green-600 hover:bg-green-500 "
              href=""
              onClick={handleSubmit}
            />
          </div>
          <div className="w-28">
            <Button
              label="Voltar"
              customClass="bg-red-600 hover:bg-red-500 "
              href="/"
            />
          </div>
        </div>
      </form>
      {submit && (
        <h1 className="bg-green-600 p-3 mt-9 text-white">
          Cadastro de voto efetuado com sucesso
        </h1>
      )}
    </Layout>
  );
};

export default Formulario;
