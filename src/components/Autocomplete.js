import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import FormControl from '@mui/material/FormControl'

export default function AutocompleteComponent(props) {
  const [value, setValue] = useState();
  const options = props?.data;
  console.log(props?.data)
  return (
      <Autocomplete
        sx={{ width: "50%" }}
        value={value}
        onChange={(event, newValue) => {
          console.log(event, newValue)
          setValue(newValue);
          props.getData(newValue)
        }}
        getOptionLabel={(option) => { return option.name }}
        options={options}
        renderInput={(params) => (
          <TextField {...params} onChange={(e)=>props.setText(e.target.value)} label="Search Places" variant="outlined" />
        )}
      />  
  );
};
