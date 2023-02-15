import "./App.css";
import Provider from "./Context/Provider";
import Nav from "./Components/Nav";
import Form from "./Components/Form";

function App() {
  return (
    <Provider>
      <div className="App">
        <Nav />
        <Form />
      </div>
    </Provider>
  );
}

export default App;
