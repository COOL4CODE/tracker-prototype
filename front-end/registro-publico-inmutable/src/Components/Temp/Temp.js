import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Temp extends Component {
	state = { showAlertMsg: false,  alertMsg: "", transactionHash: "" };
	_handleBuyAsset = () => {
		axios.post('http://localhost:3003/assets-transfer', {
			hash: ''
		}).then(res => {
			this.setState({ showAlertMsg: true, alertMsg: res.data.msg, transactionHash: res.data.data.transactionHash.data });			
		});		
	};
	_handleClose = () => {
		this.setState({ showAlertMsg: false, alertMsg: "" });
	};
	render () {
		const { classes } = this.props;
		return (
			<div>
			  <Button variant="contained" color="primary" className={classes.button} onClick={this._handleBuyAsset}>
		        Comprar activo
		      </Button>
		      <Dialog open={this.state.showAlertMsg}
		              onClose={this._handleClose}
		              aria-labelledby="alert-dialog-title"
		              aria-describedby="alert-dialog-description">
	          <DialogTitle id="alert-dialog-title">{this.state.alertMsg}</DialogTitle>
	          <DialogContent>
	            <DialogContentText id="alert-dialog-description">
	              <strong>Hash de la transacción:</strong>
	              <p style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{this.state.transactionHash}</p>
	            </DialogContentText>
	          </DialogContent>
	          <DialogActions>
	            <Button onClick={this._handleClose} color="primary" autoFocus>OK</Button>
	          </DialogActions>
	        </Dialog>
			</div>
		)
	}
}

export default withStyles(styles)(Temp);