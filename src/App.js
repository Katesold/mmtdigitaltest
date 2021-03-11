import { useEffect, useState } from 'react';
import Basket from './Basket';
import { apiCall } from './utils';
import './App.scss';

function App() {

  const [data, setData] = useState([]);

  async function callApi() {
    const responseData = await apiCall();
    setData(responseData);
  }

useEffect(() => {
  callApi();
}, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Basket
        </h1>
      </header>
      <Basket data={data} />
    </div>
  );
}

export default App;
