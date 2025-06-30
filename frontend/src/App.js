import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [mensagem, setMensagem] = useState('');
  const [cepData, setCepData] = useState(null);
  const [erroCep, setErroCep] = useState('');
  const latitude = cepData?.location?.coordinates?.latitude;
  const longitude = cepData?.location?.coordinates?.longitude;
  const mapsUrl = latitude && longitude ? `https://www.google.com/maps?q=${latitude},${longitude}` : null;
  
  useEffect(() => {
    axios.get('http://localhost:5000/sua-rota')
      .then(response => setMensagem(response.data))
      .catch(error => setMensagem('Erro ao conectar com o backend'));
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <h1>API BRASIL</h1>
        <p>Bem vindo a aplicação BRASIL!</p>
        <p>Esta aplicação foi projetada para ajudá-lo a interagir com várias APIs no Brasil.</p>
        <p>Explore os recursos e funcionalidades para começar.</p>
        <p className='backend-connection'>{mensagem}</p>
      </div>

      <div className="cep-search">
        <h2>Buscar CEP</h2>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const cep = e.target.cep.value;
          setErroCep('');
          setCepData(null);
          try {
            const response = await axios.get(`http://localhost:5000/cep/v2/${cep}`);
            setCepData(response.data);
          } catch (error) {
            setErroCep('Erro ao buscar CEP');
          }
        }}>
          <input type="text" name="cep" placeholder="Digite o CEP" />
          <button type="submit">Buscar</button>
        </form>
        {erroCep && <p style={{ color: 'red' }}>{erroCep}</p>}
        {cepData && (
          <div className="cep-result">
            <p><strong>CEP:</strong> {cepData.cep}</p>
            <p><strong>Logradouro:</strong> {cepData.street}</p>
            <p><strong>Bairro:</strong> {cepData.neighborhood}</p>
            <p><strong>Cidade:</strong> {cepData.city}</p>
            <p><strong>Estado:</strong> {cepData.state}</p>

            <button className='limpar-button' onClick={() => setCepData(null)}>Limpar</button>
            <button className='ver-mapa-button' onClick={() => {
              if (mapsUrl) {
                window.open(mapsUrl, '_blank');
              }
            }}>Ver no mapa</button>
          </div>
          
          
        )}
        
      </div>  
    </div>
  );
}

export default App;