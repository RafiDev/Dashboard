import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const SortButton = ({ handleSort }) => {
  const classes = useStyles();
  const [sort, setSort] = useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
    handleSort(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        value={sort}
        onChange={handleChange}
        displayEmpty
        className={classes.selectEmpty}
        inputProps={{ "aria-label": "Sort by" }}
      >
        <MenuItem value="" disabled>
          Sort by
        </MenuItem>
        <MenuItem value={"vote_average.desc"}>Rating</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortButton;