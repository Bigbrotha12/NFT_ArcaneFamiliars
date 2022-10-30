import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Pagination, Stack } from '@mui/material';

export default function SearchBar() {
  return (
    <div className="bg-white h-14 relative top-0 w-full flex flex-row justify-between align-middle">
      <FamiliarCount count={6} />
      <div className="pt-4">
        <SearchIcon />
        <InputBase></InputBase>
      </div>
      <Stack sx={{paddingTop: "1rem", paddingLeft: "1rem"}}>
        <Pagination count={5} color="secondary" />
      </Stack>
    </div>
  )
}

function FamiliarCount(props: any) {
  return (
    <div className="pt-4 pl-4 font-bold">
      <p>Familiars: {props.count}</p>
    </div>
  )
}
