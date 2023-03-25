import {useState} from 'react'
function App() {
  const[city, setCity] = useState("")
  const[previsaoTempo, setPrevisaoTempo] = useState(null);

  const cityChange = (event) => {
    setCity(event.target.value)

  };

  const citySearch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=c340a44663c74871aed170616232303&q=${city}&lang=pt`)
    .then((response) => {
      if(response.status === 200){
        return response.json()
      }
    })
    .then((data) => {
      setPrevisaoTempo(data)
      console.log('data ====>', data)
    });
  };

  return (
    <div>
      <main className="container">
        <div className="jumbotron">
          <h2 className='pesquiseAqui'>
            Pesquise aqui a previsão do tempo da cidade que quiser!
          </h2>
          <p>
            Insira o nome da cidade abaixo e clique em pesquisar.
          </p>
          <div className="row mb-4">
            <div className="col-md-6">
              <input
              onChange={cityChange}
              className="form-control" 
              value={city}/>
            </div>
          </div>
          <button onClick={citySearch} className="btn btn-primary">
            Pesquisar
          </button>
          {
            previsaoTempo ? (
              <div className='mt-4 d-flex align-items-center'>
                <div>
                  <img src={previsaoTempo.current.condition.icon}/>
                </div>
                <div>
                  <h3> Previsão do tempo está: {previsaoTempo.current.condition.text}</h3>
                  <p className='lead'>
                    Temp: {previsaoTempo.current.temp_c}c°
                    <div>
                  <div>Cidade: {previsaoTempo.location.name}</div>
                  <div>Estado: {previsaoTempo.location.region}</div>
                  <div>País: {previsaoTempo.location.country}</div>
                </div>
                  </p>
                </div>
              </div>
            ) : null
          }
        </div>
      </main>
    </div>
  );
}

export default App;
