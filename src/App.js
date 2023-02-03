import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div
        className="App"
      >
        <Switch>
          <Route path="/" component={ Login } exact />
          <Route path="/search" component={ Search } exact />
          <Route path="/album/:id" component={ Album } exact />
          <Route path="/favorites" component={ Favorites } exact />
          <Route path="/profile" component={ Profile } exact />
          <Route path="/profile/edit" component={ ProfileEdit } exact />
          <Route path="*" component={ NotFound } exact />
        </Switch>
      </div>
    );
  }
}

export default App;
