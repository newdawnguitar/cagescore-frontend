import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

class ShowFighters extends Component {

  state = {
    requestData: []
  }

  componentDidMount(){
    this.getFighters = this.getFighters.bind(this);
    //get all fighters from db
    var self = this;
    axios.get('http://127.0.01:5000/api/test/fighters')
    .then(function(res){
      self.setState({requestData:res.data.data})
      //var data = res.data;
      //console.log("data:", data)
    })
    .catch(function(err){
      console.log('error', err)
    })
  }

  getFighters(){
    const fighters = []
    this.state.requestData.forEach((fighter)=>{
      fighters.push(
        <ListItem>
          <ListItemText
            primary={fighter.name}
          />
        </ListItem>
      )
    })
    return(
      <div>
      <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <div>
              <List>
                {fighters}
              </List>
            </div>
          </Grid>
          </Grid>
      </div>
    )
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            All Fighters
          </Typography>
          {this.getFighters()}

        </CardContent>
        <CardActions>
          <Button size="small">Refresh</Button>
        </CardActions>
      </Card>
    );
  }
}

export default ShowFighters;
