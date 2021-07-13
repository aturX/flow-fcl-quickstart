import React from 'react';
// material-ui
import {AppBar,Button,Card,CardActions,CardContent,CardMedia,CssBaseline} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
// flow quick start
import AuthCluster from "./components/auth-cluster"
 
// import {InitCluster} from "./init-cluster"
// import {useCurrentUser} from "./hooks/current-user"
// import {ProfileCluster} from "./profile-cluster"


// export default function App() {
//   // const cu = useCurrentUser()

//   return (
//     <div style={{margin:'0 auto', border: '1px solid #000', width: '1000px', height: '900px' }}>
      
//       {/* <InitCluster address={cu.addr} />
//       <hr></hr>
//       <ProfileCluster address="0xba1132bc08f82fe2" />
//       <hr></hr>
//       <ProfileCluster address="0xf117a8efa34ffd58" /> */}
//     </div>
//   )
// }



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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function App() {
  const classes = useStyles();
 
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Flow Quick Start （Testnet）
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Flow User Profile
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              You can share your personal information on the Flow blockchain now. 
              <a href="https://github.com/aturX/flow-fcl-quickstart">Visit Code</a>
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
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Created by Flow 
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