import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Input, Pagination, Stack } from '@mui/material';

export default function SearchBar() {
  return (
    <div className="bg-white h-14 relative top-0 w-full flex flex-row justify-between align-middle">
      <FamiliarCount count={6} />
      <div className="pt-2">
        <Search />
      </div>
      <Stack sx={{paddingTop: "1rem", paddingLeft: "1rem"}}>
        <Pagination count={5} color="secondary" />
      </Stack>
    </div>
  );
}

function FamiliarCount(props: any) {
  return (
    <div className="pt-4 pl-4 font-bold">
      <p>Familiars: {props.count}</p>
    </div>
  );
}

function Search() {
  return (
    <div className="flex flex-row bg-[#D9D9D9] rounded-[12px] p-1 w-60">
      <div className="mx-4 my-auto">
        <SearchIcon />
      </div>
      <Input placeholder="Search…" />
    </div>
  );
}
