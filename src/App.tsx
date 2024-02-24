import Benjamin from './components/Benjamin';

function App() {
  return (
    <div className="container">
      <header>
        <h1>Über the Arcades</h1>
        <p className="subheading">A Ptololox project, with Walter Benjamin</p>
      </header>
      <div className="benjamin-container">
        <Benjamin />
      </div>
      <footer>&copy; {new Date().getFullYear()} Joshua D. Graber</footer>
    </div>
  );
}

export default App;
