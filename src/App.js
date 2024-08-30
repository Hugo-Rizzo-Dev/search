import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './Styles.css'

import api from './Services/api';


function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

async function handleSearch(){
    if(input === ''){
      alert("Insira algum CEP")
      return;
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data);
      setInput("");
    }
    catch{
      alert("Erro ao buscar CEP");
      setInput("");

    }
  }

  return (
    <div className="container">
    <h1 className="title">CEP Search</h1>

    <div className="containerInput">
      <input type="text" placeholder="Enter your zip code..." value={input} onChange={(e) => setInput(e.target.value)} />
      <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="White"/>
      </button>
    </div>

    {Object.keys(cep).length > 0 && (
    <main className='main'>
      <h2>CEP: {cep.cep}</h2>

      <span>{cep.logradouro}</span>
      <span>{cep.complemento}</span>
      <span>{cep.bairro}</span>
      <span>{cep.localidade} - {cep.uf}</span>
      <span></span>
    </main>
    )}

    </div>
  );
}

export default App;
