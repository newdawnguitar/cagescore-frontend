import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class AddFighter extends Component {
  state = {
    fighterName: ''
  }

  handleChange = (evt)=>{
    this.setState({fighterName:evt.target.value})
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Add Fighter
          </Typography>
          <TextField
          value={this.state.fighterName}
          onChange={this.handleChange}
          required
          id="standard-required"
          label="Name"
          margin="normal"
           variant="outlined"
           fullWidth
        />
        </CardContent>
        <CardActions onClick={this.props.onSaveFighter.bind(this, this.state.fighterName)}>
          <Button size="small">Save</Button>
        </CardActions>
      </Card>
    );
  }
}

export default AddFighter;
