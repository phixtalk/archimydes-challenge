import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import UsersList from "./pages/UsersList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={"/"} exact component={UsersList} />
        <Route path={"/users"} exact component={UsersList} />
        <Route path={"/users/create"} component={UsersList} />
        <Route path={"/users/:id/edit"} component={UsersList} />
      </BrowserRouter>
    </div>
  );
}

export default App;
