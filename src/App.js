import "./App.css";
import FamilyTree from "./components/family-tree/FamilyTree";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <FamilyTree />
    </div>
  );
}

export default App;
