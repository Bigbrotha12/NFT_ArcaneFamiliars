import React from "react";
import { Familiar } from "../../../app/Definitions";
import { Typography, /*IconButton,*/ Collapse, Card, CardActions, CardContent, CardHeader, CardMedia/*, Box*/ } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import { Familiar } from "../../../app/Definitions";

export default function FamiliarCard(props: any) {
  //const [expanded, /*setExpanded*/] = React.useState(false);
  const familiar: Familiar = props.familiar;

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  // const ExpandMore = ((props) => {
  //   const { expand, ...other } = props;
  //   return <IconButton {...other} />;
  // });

  return (
    <Grid xs={6} md={4} lg={3}>
      <Card sx={{ 
          maxWidth: 345, 
          marginTop: "10px", 
          marginBottom: "10px"}}>
          <CardHeader 
          title={familiar.name}
          subheader={familiar.affinity + " Familiar - " + familiar.rarity} />
          <CardMedia 
          component="img"
          height="150"
          image={familiar.image_url}
          alt={familiar.name}
          />
    
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {familiar.description}
            </Typography>
          </CardContent>
          
          <CardActions sx={{display: "flex", justifyContent:"space-between"}}>
            <Typography>View Details</Typography>
            {/* <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            >
              <ExpandMoreIcon />
            </ExpandMore> */}
          </CardActions>
          
          <Collapse in={false} timeout="auto" unmountOnExit>
          {/* <CardContent>
            <CustomTable stats={props.familiarStats}/>
          </CardContent> */}
        </Collapse>
        
        </Card>
      </Grid>
  )
}
