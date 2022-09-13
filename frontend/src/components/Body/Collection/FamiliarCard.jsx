import { AppConfig } from '../../../constants/AppConfig';
import { Typography, IconButton, Collapse, Card, CardActions, CardContent, CardHeader, CardMedia, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomTable from './CustomTable';

export default function FamiliarCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = ((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  });

  return (
    <Card sx={{ 
        maxWidth: 345, 
        marginTop: "10px", 
        marginBottom: "10px"}}>
        <CardHeader 
        title={props.familiarData.name}
        subheader={props.familiarData.affinity + " Familiar - " + props.familiarData.rarity} />
        <CardMedia 
        component="img"
        height="150"
        image={AppConfig.GameFiles.images + props.familiarData.familiarId +".png"}
        alt={props.familiarData.name}
        />
  
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.familiarData.description}
          </Typography>
        </CardContent>
        
        <CardActions sx={{display: "flex", justifyContent:"space-between"}}>
          <Typography>View Details</Typography>
          <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CustomTable stats={props.familiarStats}/>
        </CardContent>
      </Collapse>
      </Card>
  )
}
