import React from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="input-box" style={{ textAlign: "center", marginBottom: "20px" }}>
      <TextField
        label="Search Services"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, phone, or address"
      />
    </div>
  );
};

export default SearchBar;
