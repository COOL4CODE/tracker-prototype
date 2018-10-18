import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
//import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
//import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

// Assets
import sim_img from './resources/images/cory-checketts-533117-unsplash.jpg';
import sim from './resources/images/SIM.jpg';
import logo1 from './resources/images/noun_Assets_1646562.png';
import logo2 from './resources/images/noun_Community_421816.png';
import logo3 from './resources/images/noun_statistics_143946.png';
import logo4 from './resources/images/noun_Search_1833820.png';
import './Home.css';

class Home extends Component{

    constructor(){
        super();

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleClickSearch  = this.handleClickSearch.bind(this);

        this.state={
            open: false,

            // UI Elements
            hash: '',
            placa: '',
            marca: '',
            linea: '',
            modelo: '',
            serial: '',
            colors: '',
            createdAt: '',
            city: '',
            state: '',
            country: '',
            image: '',
            tickets: [],
            logs: [],
            request: []
        }
    }

    handleClickSearch =()=>{

        axios.get('http://localhost:3003/assets')
         .then(res => {
            console.log("Full object:");
            console.log(res.data);
            var main = res.data;
            var tickets = main.tickets;
            var logs = main.log;
            var request = main.request;

            this.setState({
                hash: main.hash,
                placa: main.placa,
                marca: main.marca,
                linea: main.linea,
                modelo: main.modelo,
                serial: main.engineSerial,
                colors: main.colors,
                createdAt: main.createdAt,
                city: main.city,
                state: main.state,
                country: main.country,
                image: main.imagen,
                tickets: tickets,
                logs: logs,
                request: request

            }, () => {
                console.log(this.state.hash);
                console.log(this.state.tickets);
                console.log(this.state.logs);
                console.log(this.state.request);
            })

            
        })      

    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSearchChange = (e) => {
        if(e.target.id === 'search'){
            console.log(e.target.value);
        }
    }

    render(){

        const { classes } = this.props;

        return (
            <div> 
              <main className={classes.separate}>
                <div className={classes.heroUnit}>
                  <div className={classes.heroContent}>
                    <div className={classes.root}>
                        <Grid container item xs={12} spacing={24} style={{ marginBottom: '16px' }}>
                            <Typography gutterBottom variant="headline" style={{ width: '100%' }}>
                                <center>¿Qué tramite desea realizar?</center> 
                            </Typography>
                            
                        </Grid>
                        <Grid container spacing={8}>
                            <Grid container item xs={12} spacing={16}>
                                <Grid item xs={6}>
                                    <Card className={classes.cardOnDialog} >
                                        <CardMedia
                                            style={{ background: 'linear-gradient(60deg, #26c6da, #00acc1)' }}
                                            className={classes.media}
                                            //image={sim}
                                            //backgroundColor='#ffa726'
                                            //image="https://www.elespectador.com/sites/default/files/sim_suba_8844841.jpg"
                                            title="Contemplative Reptile" >
                                            <img src={logo1} id="header-color"></img>
                                        </CardMedia>

                                        <CardContent>
                                            <Typography gutterBottom variant="body2" style={{ fontWeight: '600' }}>
                                                Entidades Certificadoras de Bienes
                                            </Typography>
                                            <Typography component="p">
                                                Usa <i><b>Tracker</b></i> para certificar bienes: Inmuebles, vehiculos etc. 
                                            </Typography>
                                        </CardContent>
                                        
                                        <CardActions>
                                            <Button variant="contained" color="secondary" size="small">
                                                Iniciar
                                            </Button>
                                            <Button size="small" color="primary">
                                                Necesitas ayuda?
                                            </Button>
                                        </CardActions>
                                        
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>

                                    <Card className={classes.cardOnDialog} >
                                        <CardMedia
                                            className={classes.media}
                                            style={{ background: 'linear-gradient(60deg, #26c6da, #00acc1)' }}
                                            //image={sim}
                                            //image="http://www.motor.com.co/files/article_main/uploads/2015/07/15/55a6cd88cd6bd.jpeg"
                                            title="Contemplative Reptile" >
                                            <img src={logo2} id="header-color"></img>
                                        </CardMedia>

                                        <CardContent>
                                            <Typography gutterBottom variant="body2" style={{ fontWeight: '600' }}>
                                                Entidades Certificadoras de Personas  
                                            </Typography>
                                            <Typography component="p">
                                                Usa <i><b>Tracker</b></i> para certificar personas naturales o jurídicas.
                                            </Typography>
                                        </CardContent>
                                        
                                        <CardActions>
                                            <Button variant="contained" color="secondary" size="small" >
                                                Iniciar
                                            </Button>
                                            <Button size="small" color="primary">
                                                Necesitas ayuda?
                                            </Button>
                                        </CardActions>  
                                    </Card>

                                </Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={16}>
                                <Grid item xs={6}>
                                    <Card className={classes.cardOnDialog} >
                                        <CardMedia
                                            className={classes.media}
                                            style={{ background: 'linear-gradient(60deg, #26c6da, #00acc1)' }}
                                            //image={sim}
                                            //image="https://www.elespectador.com/sites/default/files/sim_suba_8844841.jpg"
                                            title="Contemplative Reptile" >
                                            <img src={logo3} id="header-color"></img>
                                        </CardMedia>

                                        <CardContent>
                                            <Typography gutterBottom variant="body2" style={{ fontWeight: '600' }}>
                                                Consulta de Estadísticas
                                            </Typography>
                                            <Typography component="p"> 
                                                Información de interes pública sobre datos estadísticos en <i><b>Tracker</b></i>.
                                            </Typography>
                                        </CardContent>
                                        
                                        <CardActions>
                                            <Button variant="contained" color="secondary" size="small" >
                                                Iniciar
                                            </Button>
                                            <Button size="small" color="primary">
                                                Necesitas ayuda?
                                            </Button>
                                        </CardActions>
                                        
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>

                                    <Card className={classes.cardOnDialog} >
                                        <CardMedia
                                            className={classes.media}
                                            style={{ background: 'linear-gradient(60deg, #26c6da, #00acc1)' }}
                                            //image={sim}
                                            //image="http://www.motor.com.co/files/article_main/uploads/2015/07/15/55a6cd88cd6bd.jpeg"
                                            title="Contemplative Reptile" >
                                            <img src={logo4} id="header-color"></img>
                                        </CardMedia>

                                        <CardContent>
                                            <Typography gutterBottom variant="body2" style={{ fontWeight: '600' }}>
                                                Consulta de Bienes 
                                            </Typography>
                                            <Typography component="p">
                                                ¿Necesitas verificar la legalidad bienes a tramitar?. Usando <i><b>Tracker</b></i> podrás consultar información.
                                            </Typography>
                                        </CardContent>
                                        
                                        <CardActions>
                                            <Button variant="contained" color="secondary" size="small" 
                                                onClick={this.handleClickOpen} >
                                                Iniciar
                                            </Button>
                                            <Button size="small" color="primary">
                                                Necesitas ayuda?
                                            </Button>
                                        </CardActions>
                                        
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                  </div>
                </div>
              </main>

              <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            Consultar
                        </Typography>
                        <Button color="inherit" onClick={this.handleClose}>
                            Close
                        </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent style={{marginTop: '80px'}}>
                        <DialogContentText>
                            Para realizar la búsqueda de una propiedad a continuación ingrese la identificación (Placa vehículo, No. Registro catastro etc)
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="search"
                            label="Identificación"
                            type="email"
                            onChange={this.handleSearchChange}
                            fullWidth/>
                        <Button variant="contained" 
                                color="secondary" 
                                className={classes.button} 
                                onClick={this.handleClickSearch}>
                            Buscar
                        </Button>

                        <Grid item xs={12}>
                            <Paper className={classes.paper} style={{ marginTop: '25px' }}>
                            

                            <Grid container spacing={8}>
                                <Grid container item xs={12} spacing={8}>
                                    <Grid item xs={12}>
                                        <Grid container wrap="nowrap" spacing={16}>
                                        
                                        <Grid container item xs zeroMinWidth>
                                            <Grid item xs={12} style={{ marginTop: '20px', textAlign: 'left' }}>
                                               <Chip label={this.state.hash} className={classes.chip} />
                                            </Grid>
                                            <Grid item xs={12} style={{ marginTop: '20px', textAlign: 'left' }}>
                                                Placa: {this.state.placa}
                                            </Grid>
                                            <Grid item xs={12} style={{ marginTop: '20px', textAlign: 'left' }}>
                                                Marca: {this.state.marca}
                                            </Grid>
                                            <Grid item xs={12} style={{ marginTop: '20px', textAlign: 'left' }}>
                                                Modelo: {this.state.modelo}
                                            </Grid>
                                            <Grid item xs={12} style={{ marginTop: '20px', textAlign: 'left' }}>
                                                Serial del motor: {this.state.serial}
                                            </Grid>
                                            <Grid item xs={12} style={{ marginTop: '20px', textAlign: 'left' }}>
                                                Colores: {this.state.colors}
                                            </Grid>
                                            <Grid item xs={12} style={{ marginTop: '20px', textAlign: 'left' }}>
                                                Dirección radicación: {this.state.city}, {this.state.state}, {this.state.country}
                                            </Grid>
                                           
                                            <Grid item xs={12} className="custom-text-parent-info" style={{ marginTop: '10px', textAlign: 'left' }}>
                                                <Button variant="contained" color="secondary" className={classes.button}>
                                                    Tramite de traspaso</Button>
                                            </Grid>
                                        </Grid>
                                        </Grid>
                                    </Grid>  
                                
                                </Grid>
                            </Grid>

                            </Paper>
                        </Grid>
                    </DialogContent>
                    </Dialog>

            </div>
        );
    }
}

/// Styles
const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    flex: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    heroUnit: {
      backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
      maxWidth: 950,
      margin: '0 auto',
      padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
      marginTop: theme.spacing.unit * 4,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    separate: {
      marginTop: 20  
    },
    purpleAvatar: {
      margin: 10,
      color: '#fff',
      //backgroundColor: deepPurple[500],
      width: 60,
      height: 60
    },
    chips: {
      flexGrow: 1,
      textAlign: 'left',
      display: 'inline-flex'
    },
    card: {
      display: 'flex',
    },
      media: {
        // ⚠️ object-fit is not supported by IE11.
        objectFit: 'cover',
      },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      textAlign: 'left'
    },
    cover: {
      width: 105,
      height: 140,
      backgroundSize: 'contain'
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    rootGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
      padding: '6px 6px 6px 6px;',
      backgroundColor: '#d3d3d347'
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    button: {
      paddingLeft: '18px'
    },
    paperCustom: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      backgroundColor: '#d3d3d347',
    },
    table: {
      //width: '100%',
    },
    cardOnDialog: {
      maxWidth: 400,
    },
    media: {
      height: 130,
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
  

export default withStyles(styles) (Home);