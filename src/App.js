import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import AddFighter from './components/addFighter'
import ShowFighters from './components/showFighters'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

const SHOW_FIGHTERS = "Show Fighters";
const ADD_FIGHTER = "Add Fighter";


class App extends Component {

  showMenu = this.showMenu.bind(this);
  onCloseMenu = this.onCloseMenu.bind(this);
  onAddFighter = this.onAddFighter.bind(this);
  onShowAllFighters = this.onShowAllFighters.bind(this);
  handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  onSaveFighter = this.onSaveFighter.bind(this);

  state={
    showMenu: false,
    selectedComponent: null,
    snackbar:{
      open:false,
      message:''
    }
  }

  handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  onCloseMenu() {
    this.setState({showMenu:false})
  }
  showMenu() {
    this.setState({showMenu:true})
  }

  onAddFighter(){
    console.log("add Fighter");
    this.setState({selectedComponent: ADD_FIGHTER})
    this.onCloseMenu();
  }

  onShowAllFighters(){
    this.setState({selectedComponent: SHOW_FIGHTERS})
    this.onCloseMenu();
    console.log("get all fighters!")
  }

  getComponent(){
    switch(this.state.selectedComponent){
      case SHOW_FIGHTERS:
        return <ShowFighters />
        break;
      case ADD_FIGHTER:
        return <AddFighter
        onSaveFighter={this.onSaveFighter}/>
        break;
      default:
        return <div />
    }
  }

  onSaveFighter(name){
    console.log('name is:', name)
    const self = this;
    axios.post('http://127.0.0.1:5000/api/test/addFighter', {
      name: name
    })
    .then(function(response){
      var snackbar = Object.assign({}, self.state.snackbar, {open:true, message: `added new fighter: ${name}`})
      self.setState({snackbar});
      console.log(`Added new fighter: ${name}`)
    })
    .catch(function(error){
      var snackbar = Object.assign({}, self.state.snackbar, {open:true, message: `error adding fighter: ${error}`})
      console.log('error:', error)
      self.setState({snackbar});
    })
  }



  render() {

    const menuList = (
        <div>
          <List>
            <ListItem button key="Add Fighter" onClick={this.onAddFighter}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Add Fighter" />
            </ListItem>
            <ListItem button key="Add Event">
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary="Add Event" />
            </ListItem>
          </List>
          <Divider />
          <ListItem button key="Show Fighters" onClick={this.onShowAllFighters}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Show Fighters" />
          </ListItem>

        </div>
      );

    return (
      <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />


      <Drawer open={this.state.showMenu} onClose={this.onCloseMenu} >
      {menuList}
        </Drawer>

      <AppBar position="static">
        <Toolbar>
        <IconButton color="inherit" aria-label="Menu"
          onClick={this.showMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            CageScore
          </Typography>
        </Toolbar>
      </AppBar>

      {this.getComponent()}


    {  /*
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        */
      }

      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.snackbar.open}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
          variant="success"
          message={this.state.snackbar.message}
        >

        </Snackbar>
      </div>
    );
  }
}

export default App;
