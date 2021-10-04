import './App.css';
import TagGenerator from "./components/TagGenerator/TagGenerator";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
      <div className="App container">
        <TagGenerator name="Sara" />
      </div>  
  );
}
