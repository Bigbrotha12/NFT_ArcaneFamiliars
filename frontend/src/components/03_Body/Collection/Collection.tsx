import React from "react";
import { Affinity, Familiar, Rarity } from "../../../app/Definitions";
import { ControllerContext, UserContext } from "../../../state/Context";
// import { Typography, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import FamiliarCard from './FamiliarCard';
import SearchBar from "./SearchBar";
// import SearchBar from './SearchBar';
//import ComingSoon from "../../Common/ComingSoon";

export default function Collection() {
  const controller = React.useContext(ControllerContext);
  const [userInfo,] = React.useContext(UserContext);
  const [userAssets, setUserAssets]: 
    [Familiar[] | null, React.Dispatch<React.SetStateAction<Familiar[] | null>>] = 
    React.useState<Array<Familiar> | null>(null);

  function createCards(familiars: Array<Familiar>): Array<JSX.Element> {
    return familiars.map( (familiar, index) => {
      return <FamiliarCard key={index} familiar={familiar} />
    });
  }

  // If user info is available, fetch NFT data from cache or IMX
  React.useEffect(() => {
    
    if(userInfo.address !== null) {
      controller.getUserFamiliars(userInfo.address)
      .then( assets => {
        if(assets === null) {
          console.error("NFTs could not be found");
        } else {
          setUserAssets(assets);
        }
      });
    }
  },[userInfo.address]);

  // if user assets have been fetched, display array of cards.
  return (
    <div className="h-full w-full">
      <SearchBar />
      <Grid sx={{margin: "0px", padding: "4px", height: "100%"}} container spacing={1}>
          {userAssets ?
          createCards(sampleAssets) : 
          <p>No Familiars to show</p>}
      </Grid>
    </div>
  //   <Box /*className={style.collectionContainer}*/ sx={{flexGrow: 1}}>
  //     <div /*className={style.collectionHeader}*/ >
  //       <Typography variant="h5">Familiar Collection</Typography>
  //       <SearchBar />
  //     </div>
  //     <Divider />
  //     <Grid container spacing={2}>
  //       {myArray.map( (value) => {
  //         return (
  //           <Grid key={value} xs={4}>
  //             <FamiliarCard familiarData={familiarData} familiarStats={familiarStats}/>
  //           </Grid>
  //         )
  //       })}
  //     </Grid>
  //   </Box>
  
  )
}

const sampleAssets: Array<Familiar> = [
  {
    _id: 0,
    familiarId: 0,
    name: "White Dog",
    description: "A mage's best friend",
    image_url: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/images/0001.png",
    image: "White Dog",
    affinity: Affinity.Light,
    HP: 220,
    MP: 120,
    attack: 80,
    defense: 66,
    arcane: 120,
    speed: 170,
    ability_1: "Brave",
    ability_2: "Sturdy",
    ability_3: "none",
    ability_4: "none",
    rarity: Rarity.common,
    generation: 1
  },
  {
    _id: 0,
    familiarId: 0,
    name: "White Dog",
    description: "A mage's best friend",
    image_url: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/images/0001.png",
    image: "White Dog",
    affinity: Affinity.Light,
    HP: 220,
    MP: 120,
    attack: 80,
    defense: 66,
    arcane: 120,
    speed: 170,
    ability_1: "Brave",
    ability_2: "Sturdy",
    ability_3: "none",
    ability_4: "none",
    rarity: Rarity.common,
    generation: 1
  },
  {
    _id: 0,
    familiarId: 0,
    name: "White Dog",
    description: "A mage's best friend",
    image_url: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/images/0001.png",
    image: "White Dog",
    affinity: Affinity.Light,
    HP: 220,
    MP: 120,
    attack: 80,
    defense: 66,
    arcane: 120,
    speed: 170,
    ability_1: "Brave",
    ability_2: "Sturdy",
    ability_3: "none",
    ability_4: "none",
    rarity: Rarity.common,
    generation: 1
  },
  {
    _id: 0,
    familiarId: 0,
    name: "White Dog",
    description: "A mage's best friend",
    image_url: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/images/0001.png",
    image: "White Dog",
    affinity: Affinity.Light,
    HP: 220,
    MP: 120,
    attack: 80,
    defense: 66,
    arcane: 120,
    speed: 170,
    ability_1: "Brave",
    ability_2: "Sturdy",
    ability_3: "none",
    ability_4: "none",
    rarity: Rarity.common,
    generation: 1
  },
  {
    _id: 0,
    familiarId: 0,
    name: "White Dog",
    description: "A mage's best friend",
    image_url: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/images/0001.png",
    image: "White Dog",
    affinity: Affinity.Light,
    HP: 220,
    MP: 120,
    attack: 80,
    defense: 66,
    arcane: 120,
    speed: 170,
    ability_1: "Brave",
    ability_2: "Sturdy",
    ability_3: "none",
    ability_4: "none",
    rarity: Rarity.common,
    generation: 1
  },
  {
    _id: 0,
    familiarId: 0,
    name: "White Dog",
    description: "A mage's best friend",
    image_url: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/images/0001.png",
    image: "White Dog",
    affinity: Affinity.Light,
    HP: 220,
    MP: 120,
    attack: 80,
    defense: 66,
    arcane: 120,
    speed: 170,
    ability_1: "Brave",
    ability_2: "Sturdy",
    ability_3: "none",
    ability_4: "none",
    rarity: Rarity.common,
    generation: 1
  }
]


