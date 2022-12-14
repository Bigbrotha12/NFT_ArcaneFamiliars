import React from "react";
import { Familiar } from "../../../app/Definitions";
import { ControllerContext, UserContext } from "../../../state/Context";
import Material from "../../../assets/Material";
import FamiliarCard from './FamiliarCard';
import SearchBar from "./SearchBar";

export default function Collection() {
  const controller = React.useContext(ControllerContext);
  const [userInfo,] = React.useContext(UserContext);
  const [userAssets, setUserAssets]: 
    [Familiar[] | null, React.Dispatch<React.SetStateAction<Familiar[] | null>>] = 
    React.useState<Array<Familiar> | null>(null);

  function createCards(familiars: Array<Familiar>): Array<JSX.Element | null> {
    return familiars.map( (familiar, index) => {
      if(Object.keys(familiar).length === 0) {return null}

      return <FamiliarCard key={index} familiar={familiar} />
    });
  }

  // If user info is available, fetch NFT data from cache or IMX
  React.useEffect(() => {
    
    if(userInfo.address !== null) {
      controller.getUserFamiliars(userInfo.address)
      .then( assets => {
        console.log(assets);
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
      <Material.Grid sx={{margin: "auto", padding: "4px", height: "100%", width: "100%"}} container spacing={1}>
          {userAssets ?
          createCards(userAssets) : 
          <p className="m-auto">No Familiars to show</p>}
      </Material.Grid>
    </div>
  )
}

// const sampleAssets: Array<Familiar> = [
//   {
//     _id: 0,
//     familiarId: 0,
//     name: "White Dog",
//     description: "A mage's best friend",
//     image_url: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/images/0001.png",
//     image: "White Dog",
//     affinity: Affinity.Light,
//     HP: 220,
//     MP: 120,
//     attack: 80,
//     defense: 66,
//     arcane: 120,
//     speed: 170,
//     ability_1: "Brave",
//     ability_2: "Sturdy",
//     ability_3: "none",
//     ability_4: "none",
//     rarity: Rarity.common,
//     generation: 1
//   },
//   {
//     _id: 0,
//     familiarId: 0,
//     name: "White Dog",
//     description: "A mage's best friend",
//     image_url: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/images/0001.png",
//     image: "White Dog",
//     affinity: Affinity.Light,
//     HP: 220,
//     MP: 120,
//     attack: 80,
//     defense: 66,
//     arcane: 120,
//     speed: 170,
//     ability_1: "Brave",
//     ability_2: "Sturdy",
//     ability_3: "none",
//     ability_4: "none",
//     rarity: Rarity.common,
//     generation: 1
//   },
//   {
//     _id: 0,
//     familiarId: 0,
//     name: "White Dog",
//     description: "A mage's best friend",
//     image_url: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/images/0001.png",
//     image: "White Dog",
//     affinity: Affinity.Light,
//     HP: 220,
//     MP: 120,
//     attack: 80,
//     defense: 66,
//     arcane: 120,
//     speed: 170,
//     ability_1: "Brave",
//     ability_2: "Sturdy",
//     ability_3: "none",
//     ability_4: "none",
//     rarity: Rarity.common,
//     generation: 1
//   },
//   {
//     _id: 0,
//     familiarId: 0,
//     name: "White Dog",
//     description: "A mage's best friend",
//     image_url: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/images/0001.png",
//     image: "White Dog",
//     affinity: Affinity.Light,
//     HP: 220,
//     MP: 120,
//     attack: 80,
//     defense: 66,
//     arcane: 120,
//     speed: 170,
//     ability_1: "Brave",
//     ability_2: "Sturdy",
//     ability_3: "none",
//     ability_4: "none",
//     rarity: Rarity.common,
//     generation: 1
//   },
//   {
//     _id: 0,
//     familiarId: 0,
//     name: "White Dog",
//     description: "A mage's best friend",
//     image_url: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/images/0001.png",
//     image: "White Dog",
//     affinity: Affinity.Light,
//     HP: 220,
//     MP: 120,
//     attack: 80,
//     defense: 66,
//     arcane: 120,
//     speed: 170,
//     ability_1: "Brave",
//     ability_2: "Sturdy",
//     ability_3: "none",
//     ability_4: "none",
//     rarity: Rarity.common,
//     generation: 1
//   },
//   {
//     _id: 0,
//     familiarId: 0,
//     name: "White Dog",
//     description: "A mage's best friend",
//     image_url: "http://my-unity-game.s3-website-us-east-1.amazonaws.com/images/0001.png",
//     image: "White Dog",
//     affinity: Affinity.Light,
//     HP: 220,
//     MP: 120,
//     attack: 80,
//     defense: 66,
//     arcane: 120,
//     speed: 170,
//     ability_1: "Brave",
//     ability_2: "Sturdy",
//     ability_3: "none",
//     ability_4: "none",
//     rarity: Rarity.common,
//     generation: 1
//   }
// ]


