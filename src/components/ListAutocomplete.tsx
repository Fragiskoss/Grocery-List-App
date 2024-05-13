import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

// Define an interface for the list items
interface List {
  id: string;
  title: string;
}

const ListAutocomplete = () => {
  const [lists, setLists] = useState<List[]>([]); 
  const router = useRouter();

  useEffect(() => {
    const fetchLists = async () => {
      const response = await fetch("/api/lists");
      if (response.ok) {
        const data = (await response.json()) as List[]; 
        setLists(data);
      } else {
        console.error("Failed to fetch lists");
      }
    };

    fetchLists();
  }, []);

  return (
    <Autocomplete
      options={lists}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a grocery list"
          variant="outlined"
        />
      )}
      onChange={(event, list) => {
        if (list) {
          router.push(`/lists/${list.id}`);
        }
      }}
    />
  );
};

export default ListAutocomplete;
