import style from '../../../styles/Body.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';

export default function SearchBar() {
  return (
    <div className={style.collectionSearch}>
       <SearchIcon style={{paddingLeft: '5px', paddingRight: '5px'}}/>
       <InputBase></InputBase>
    </div>
  )
}
