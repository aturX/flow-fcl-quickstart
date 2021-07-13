import {Card,CardContent,CardMedia,Typography,Grid,TextField,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAllUser } from "../hooks/use-current-user"

const useStyles = makeStyles(() => ({
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
    margin: {
        margin: '6px',
    } 
  }));


function ProfileCluster(profile) {
    const classes = useStyles();
 
    if (profile == null) return null

    console.log("ProfileCluster-profile", profile)
    const user = profile.user
    return (
        <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={user?.avatar || "https://gateway.pinata.cloud/ipfs/Qma575jjqegeTQZbE1ArV6Xo43giQwipUz2yz78x3a9ssF"}
          title="avatar"
        />
        <CardContent className={classes.cardContent}>
        
          <Typography gutterBottom variant="h5" component="h3">
                {user?.name || "Current User"}
            <Button  color="primary" className={classes.margin}>{user?.address ?? "No Address"}  </Button>
               
          </Typography>
   
          <Typography>
            {user?.info || "The user has not left a message."}
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
              value={user?.name || "Current User"}
              variant="outlined"
            />
        </Typography>
           {/* FNS: Flow Service Name ， fns.flow */}
          <Typography align="center" component={'div'} color="textPrimary" className={classes.margin}>   
            <TextField
              id="outlined-multiline-flexible2"
              label="FNS"
              size="small"
              multiline
              value={user?.fns || ""}
              variant="outlined"
            />
        </Typography>
          {/* ROLE: User Developer Fans ... */}
        <Typography align="center" component={'div'} color="textPrimary" className={classes.margin}>   
            <TextField
              id="outlined-multiline-flexible3"
              label="Role"
              size="small"
              multiline
              value={user?.role || ""}
              variant="outlined"
            />
        </Typography>
        {/* Info: like flow and nft , nba top shot fans  */}
        <Typography align="center" component={'div'} color="textPrimary" className={classes.margin}> 
          <TextField
          id="outlined-multiline-flexible4"
          label="Info"
          size="small"
          multiline
          rows={2}
          value={user?.info || ""}
          variant="outlined"
        />
        </Typography>
                {/* Avatar Image */}
        <Typography align="center" component={'div'} color="textPrimary" className={classes.margin}> 
          <TextField
          id="outlined-multiline-flexible5"
          label="Avatar Image on IPFS"
          size="small"
          multiline
          rows={2}
          value={user?.avatar || ""}
          variant="outlined"
        />
        </Typography>
            
        </CardContent>
      </Card>
    )
  }

export default function ProfileUsers() {

    const {addresses, users} = useAllUser()
    
    return (
        <Grid container spacing={4}>
        {addresses?.map((address) => (
          <Grid item key={address} xs={12} sm={6} md={4}>
            <ProfileCluster user={users[address]}/>
          </Grid>
        ))}
      </Grid>
        
    )
}