import React from 'react';
// material-ui
import {AppBar, CssBaseline, Toolbar, Grid, Typography, Container, Link} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// flow quick start
import AuthCluster from "./components/auth-cluster"
import ProfileUsers from "./components/profile-cluster"
 
 
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/FlowFans">
        Flowfans
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


// All Flow User 
// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function App() {
  const classes = useStyles();

 
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
          😻Flow Quick Start （Testnet） 
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Current User Profile */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Flow User Profile
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              You can share your personal information on the<a href="https://docs.onflow.org/"> Flow blockchain</a> now. 
              <a href="https://github.com/aturX/flow-fcl-quickstart"> Visit Docs </a>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <AuthCluster />
                </Grid>
              </Grid>
            </div>
 
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* Show All Flow User Profile */}
          <ProfileUsers/>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
           <a href="https://docs.onflow.org/flow-js-sdk/flow-app-quickstart/">Created on Flow</a>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Shows how developers can quickly build dApps on Flow!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
 