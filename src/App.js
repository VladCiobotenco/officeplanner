// src/App.js

import './App.css'; 

function App() {
  return (
    <div className="App">
      <header className="login-header"> 
        
        {/* TITLUL */}
        <h1 className="login-title">Bine ați venit pe pagina de logare a Molson Coors!</h1>
        
        
        {/* CONTAINER PENTRU INPUT-URI */}
        <div className="login-visual-container">
            
            {/* DREPTUNGHIUL 1: Nume utilizator */}
            <div className="input-group">
                <label htmlFor="username">Nume utilizator</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder=" " // Lasă dreptunghiul gol vizual
                    disabled // Asigură că nu se poate scrie
                />
            </div>
            
            {/* DREPTUNGHIUL 2: Parolă */}
            <div className="input-group">
                <label htmlFor="password">Parolă</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder=" " 
                    disabled // Asigură că nu se poate scrie
                />
            </div>
            
            {/* Un buton vizual, nefuncțional */}
            <button className="login-button" disabled>
                Logare (Vizual)
            </button>
            
        </div>
      </header>
    </div>
  );
  
}
export default App;