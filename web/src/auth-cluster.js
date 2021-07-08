import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {fetchProfile} from "./flow/fetch-profile.script"
// import {isInitialized} from "./flow/is-initialized.script"
// import {initProfile} from "./flow/init-profile.tx"
function testProfile(){
  fetchProfile("0x43c16a2556e95fcc").then((d)=>{
      console.log(d)
  })
}

const useStyles = makeStyles((theme) => ({
  margin: {
    marginLeft: theme.spacing(1),
  } 
}));
 
export function AuthCluster() {
    const classes = useStyles();
    const [user, setUser] = useState({loggedIn: null})
    useEffect(()=>fcl.currentUser().subscribe(setUser), [])

    if (user.loggedIn) {
      return (
        <Typography gutterBottom>
             <Button onClick={testProfile} variant="outlined" color="primary" className={classes.margin}>
                   Test
                </Button>
             <Button variant="outlined" color="primary" className={classes.margin}>
                   {user?.addr ?? "No Address"} 
                </Button>
             <Button onClick={fcl.unauthenticate} variant="contained" color="primary" className={classes.margin}>
                   Log Out
                  </Button>
          </Typography>
        
      )
    } else {
      return (
        <Button onClick={fcl.authenticate} variant="contained" color="primary">     
                Log In/Sign Up
              </Button>
      )
    }
}