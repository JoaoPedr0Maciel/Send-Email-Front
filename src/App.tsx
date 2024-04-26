import { FormEvent, useState } from "react";
import { api } from "./api/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function App() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState<string | boolean>(false);

  async function SendEmail(e: FormEvent) {
    e.preventDefault();

    setIsLoading(true);

    try {
      await api.post("/send", {
        name,
        lastName,
        email,
      });

      setIsLoading("Enviado");

      setName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      console.error("Erro ao enviar email:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex max-lg:flex-col items-center min-h-screen justify-center gap-3 bg-white">
      <form
        onSubmit={SendEmail}
        className="bg-[#FEFFFF] flex flex-col items-center justify-center gap-3 px-5 max-lg:w-[300px] max-lg:h-[200px] w-[450px] h-[300px] shadow-2xl rounded-xl"
      >
        <div className="flex items-center justify-center gap-3 w-full">
          <input
            className="bg-[#E4EFFC] w-full px-2 py-2 rounded-lg border-none outline-none"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="bg-[#E4EFFC] w-full px-2 py-2 rounded-lg border-none outline-none"
            type="text"
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
          className="bg-[#E4EFFC] px-2 py-2 w-full rounded-lg border-none outline-none"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-gradient-to-r from-emerald-900/70 to-emerald-300 flex justify-center items-center w-full py-2 font-bold text-white rounded-lg"
          type="submit"
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          ) : (
            "Enviar"
          )}
        </button>
      </form>
      <div className="bg-gradient-to-r from-emerald-900/70 to-emerald-300 px-5 py-3 flex flex-col gap-2 justify-center max-lg:w-[300px] max-lg:h-[200px]  w-[450px] h-[300px]  shadow-2xl rounded-xl">
        <h1 className="text-2xl lg:text-3xl text-white font-base ">
          Assinatura Mensal
        </h1>
        <p className="text-gray-300">Você Vai pagar:</p>
        <p className="text-4xl text-white font-medium">R$ 100,00</p>
        <p className="text-sm text-gray-300">
          Após o vencimento da mensalidade, seu plano sera desligado e só sera
          ligado após o pagamento.
        </p>
      </div>
    </div>
  );
}

export default App;
