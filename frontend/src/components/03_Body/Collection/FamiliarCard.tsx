import React from "react";
import { Familiar } from "../../../app/Definitions";
import Material from "../../../assets/Material";
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
    <Material.Grid xs={6} md={4} lg={3}>
      <Material.Card sx={{ 
          maxWidth: 345, 
          marginTop: "10px", 
          marginBottom: "10px"}}>
          <Material.CardHeader 
          title={familiar.name}
          subheader={familiar.affinity + " Familiar - " + familiar.rarity} />
          <Material.CardMedia 
          component="img"
          height="150"
          image={familiar.image_url}
          alt={familiar.name}
          />
    
          <Material.CardContent>
            <Material.Typography variant="body2" color="text.secondary">
              {familiar.description}
            </Material.Typography>
          </Material.CardContent>
          
          <Material.CardActions sx={{display: "flex", justifyContent:"space-between"}}>
            <Material.Typography>View Details</Material.Typography>
            {/* <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            >
              <ExpandMoreIcon />
            </ExpandMore> */}
          </Material.CardActions>
          
          <Material.Collapse in={false} timeout="auto" unmountOnExit>
          {/* <CardContent>
            <CustomTable stats={props.familiarStats}/>
          </CardContent> */}
        </Material.Collapse>
        
        </Material.Card>
      </Material.Grid>
  )
}
