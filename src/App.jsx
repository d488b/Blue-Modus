import "./App.css";
import { Table } from "./components/table";
import { initialData } from "./json/data";

function App() {
  return (
    <div>
      <h1>Data Table</h1>
      <Table initialData={initialData} />
    </div>
  );
}

export default App;
