import React, {useState} from "react"  
import * as fcl from "@onflow/fcl"
import {Button,Card,CardContent,CardMedia,Typography,TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import {useCurrentUser} from "../hooks/use-current-user"
import {useInit} from "../hooks/use-create-profile"
import { useUpdateProfile } from "../hooks/use-update-profile";
 

const useStyles = makeStyles((theme) => ({
  margin: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
}));

const AuthCluster = () => {
    const classes = useStyles()

    // get user status
    const user = useCurrentUser()
    const init = useInit(user.addr)
    const profile = init.profile
   
    const up = useUpdateProfile(profile)
    const [textAvatar, setTextAvatar] = useState(null) 
    const [textName, setTextName] = useState(null) 
    const [textFns, setTextFns] = useState(null) 
    const [textRole, setTextRole] = useState(null) 
    const [textInfo, setTextInfo] = useState(null) 


    const avatarChange = (event) => {
      if(event.target.value === profile.avatar){
        setTextAvatar(profile.avatar);
      }else{
        setTextAvatar(event.target.value);
      }
      console.log(textName)
    }
    const nameChange = (event) => {
          if(event.target.value === profile.name){
            setTextName(profile.name);
          }else{
            setTextName(event.target.value);
          }
          console.log(textName)
    }
    const fnsChange = (event) => {
      if(event.target.value === profile.fns){
        setTextFns(profile.fns);
      }else{
        setTextFns(event.target.value);
      }
      console.log(textFns)
    }
    const roleChange = (event) => {
      if(event.target.value === profile.role){
        setTextRole(profile.role);
      }else{
        setTextRole(event.target.value);
      }
      console.log(textRole)
    }
    const infoChange = (event) => {
      if(event.target.value === profile.info){
        setTextInfo(profile.info);
      }else{
        setTextInfo(event.target.value);
      }
      console.log(textInfo)
    }

    const avatarClick = () => {
      console.log("newtextAvatar", textAvatar)
      up.updateAvatar(textAvatar)
    }
    const nameClick = () => {
      console.log("newtextName", textName)
      up.updateName(textName)
    }
    const fnsClick = () => {
      console.log("newtextFns", textFns)
      up.updateFns(textFns)
    }
    const roleClick = () => {
      console.log("newtextRole", textRole)
      up.updateRole(textRole)
    }
    const infoClick = () => {
      console.log("newtextInfo", textInfo)
      up.updateInfo(textInfo)
    }


    if (user.loggedIn) {

      return (
        <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={profile?.avatar || "https://gateway.pinata.cloud/ipfs/Qma575jjqegeTQZbE1ArV6Xo43giQwipUz2yz78x3a9ssF"}
          title="avatar"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {profile?.name ?? "Current User"}
          </Typography>
          <Typography gutterBottom>
             <Button onClick={init.exec} variant="outlined" color="primary" className={classes.margin}>
                   {init.isCreated ? "Created" : "Init"}
                </Button>
             <Button variant="outlined" color="primary" className={classes.margin}>
                   {user?.addr ?? "No Address"} 
                </Button>
             <Button onClick={fcl.unauthenticate} variant="contained" color="primary" className={classes.margin}>
                   Log Out
                  </Button>
          </Typography>
        </CardContent>
        <CardContent>
          {/* Name: User name */}
          <Typography align="center" component={'div'} color="textPrimary" className={classes.margin}>   
            <TextField
              id="outlined-multiline-flexible1"
              label="Name"
              size="small"
              multiline
              value={ textName || profile?.name || ""}
              onChange={nameChange}
              variant="outlined"
            />
            <Button color="primary" onClick={nameClick}>Update</Button>
        </Typography>
           {/* FNS: Flow Service Name ， fns.flow */}
          <Typography align="center" component={'div'} color="textPrimary" className={classes.margin}>   
            <TextField
              id="outlined-multiline-flexible2"
              label="FNS"
              size="small"
              multiline
              value={textFns || profile?.fns || ""}
              onChange={fnsChange}
              variant="outlined"
            />
            <Button color="primary" onClick={fnsClick}>Update</Button>
        </Typography>
          {/* ROLE: User Developer Fans ... */}
        <Typography align="center" component={'div'} color="textPrimary" className={classes.margin}>   
            <TextField
              id="outlined-multiline-flexible3"
              label="Role"
              size="small"
              multiline
              value={textRole || profile?.role || ""}
              onChange={roleChange}
              variant="outlined"
            />
            <Button color="primary" onClick={roleClick}>Update</Button>
        </Typography>
        {/* Info: like flow and nft , nba top shot fans  */}
        <Typography align="center" component={'div'} color="textPrimary" className={classes.margin}> 
          <TextField
          id="outlined-multiline-flexible4"
          label="Info"
          size="small"
          multiline
          rows={2}
          value={textInfo || profile?.info || ""}
          onChange={infoChange}
          variant="outlined"
        />
          <Button color="primary" onClick={infoClick}>Update</Button>
        </Typography>
                {/* Avatar Image */}
        <Typography align="center" component={'div'} color="textPrimary" className={classes.margin}> 
          <TextField
          id="outlined-multiline-flexible5"
          label="Avatar Image on IPFS"
          size="small"
          multiline
          rows={2}
          value={textAvatar || profile?.avatar || ""}
          onChange={avatarChange}
          variant="outlined"
        />
          <Button color="primary" onClick={avatarClick}>Update</Button>
        </Typography>
            
        </CardContent>
 
      </Card>
  
        
      )
    } else {
      return (
        <Button onClick={fcl.authenticate} variant="contained" color="primary">     
                Log In/Sign Up
              </Button>
      )
    }

}

export default AuthCluster