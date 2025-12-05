import "./App.css";
import SearchBox from "./components/SearchBox";

export default function App() {
  return (
    <div className="app-root">
      <div className="card">
        <h1>Search Autocomplete</h1>
        <p className="subtitle">Type at 2 characters...</p>
        <SearchBox />
      </div>
    </div>
  );
}
