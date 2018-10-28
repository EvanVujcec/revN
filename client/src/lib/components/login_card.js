import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    objectFit: 'cover'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200
  }
});

class LoginCard extends React.Component {
  state = {
    username: '',
    password: '',
    showPassword: false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            User Login
          </Typography>
          <TextField
            id="username-field"
            className={classNames(classes.margin, classes.textfield)}
            variant="outlined"
            type={'text'}
            label="Username"
            value={this.state.username}
            onChange={this.handleChange('username')}
          />
          <TextField
            id="password-field"
            className={classNames(classes.margin, classes.textfield)}
            variant="outlined"
            type={this.state.showPassword ? 'text' : 'password'}
            label="Password"
            value={this.state.password}
            onChange={this.handleChange('password')}
            InputProp={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Login
          </Button>
        </CardActions>
      </Card>
    );
  }
}

LoginCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginCard);
