import { Typography, Collapse, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton } from '@mui/material';
import React from 'react';
import { AppConfig } from '../../../constants/AppConfig';
import BasicTable from './StatTable';

export default function Collection() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
      <Card sx={{ 
        maxWidth: 345, 
        marginTop: "10px", 
        marginBottom: "10px"}}>
        <CardHeader 
        title="White Dog"
        subheader="Light Familiar - Common" />
        <CardMedia 
        component="img"
        height="150"
        image={AppConfig.GameFiles.images + "0001.png"}
        alt="White Dog"
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This Familiar summoned from the plane of Light makes quick work of its enemies.
            Its speed and attack power is almost unrivalled among familiars and, best of all,
            makes for a great friend.
          </Typography>
        </CardContent>
        
        <CardActions sx={{display: "flex", justifyContent:"space-between"}}>
          <Typography>List in Marketplace</Typography>
          <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <BasicTable />
        </CardContent>
      </Collapse>
      </Card>
  )
}

const ExpandMore = ((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
});
