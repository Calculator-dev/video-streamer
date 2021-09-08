import StreamList from "./components/StreamList";
import StreamCreate from "./components/StreamCreate";
import StreamDelete from "./components/StreamDelete";
import StreamEdit from "./components/StreamEdit";
import StreamShow from "./components/StreamShow";
import Header from "./components/Header";
import history from "./history";

import { Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
function App() {


  return (
    <Router history={history}>
      <Header />
      <div >
        <Switch>
          <Route path="/" component={StreamList} exact />
          <Route path="/streams/new" component={() => <StreamCreate />} exact />
          <Route path="/streams/edit/:id" component={StreamEdit} exact />
          <Route path="/streams/delete/:id" component={StreamDelete} exact />
          <Route path="/streams/:id" component={StreamShow} exact />
        </Switch>
      </div>
      <CssBaseline />
    </Router>
  );
}

export default App;