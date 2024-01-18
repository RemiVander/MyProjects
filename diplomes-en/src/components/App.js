import logo from './logo.svg';
import logoEn from './logo-ministere-education-nationale.jpg';
import './App.css';
import Diplomas from './Diplomas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoEn} className="App-logo" alt="logo" />
        <p>
          Liste des diplômes de l'Education Nationale mise à jour le 13 novembre 2023
        </p>
        <Diplomas />
      </header>
    </div>
  );
}

export default App;
