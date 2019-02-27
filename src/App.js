import React, { useState, useEffect, useRef } from "react";

import "./App.css";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUpWardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownWardIcon from "@material-ui/icons/ArrowDownward";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  toDoHeader: {
    marginTop: 50
  },
  listItemText: {
    maxWidth: 430,
    overflowWrap: "break-word",
    marginRight: 100,
    fontSize: 18
  },
  iconButton: {
    color: "blue"
  }
});

function App(props) {
  const [listItems, setListItems] = useState([]);
  let input = useRef(null);

  useEffect(() => {
    if (listItems.length > 1) {
      let tempList = [...listItems];
      let firstObj = tempList[0];
      let lastObj = tempList[tempList.length - 1];

      firstObj.first = true;
      firstObj.last = false;

      lastObj.first = false;
      lastObj.last = true;

      tempList.forEach(element => {
        if (element !== firstObj && element !== lastObj) {
          element.first = false;
          element.last = false;
        }
      });

      tempList.forEach(element => {
        element.id = tempList.indexOf(element);
      });

      setListItems(tempList);
    }
  });

  const { classes } = props;

  function moveItemUp(item) {
    const tempList = [...listItems];
    let selObjIndex = tempList.indexOf(item);
    let prevObjIndex = selObjIndex - 1;
    if (prevObjIndex >= 0) {
      let selObj = tempList[selObjIndex];
      let prevObj = tempList[prevObjIndex];

      tempList[selObjIndex] = prevObj;
      tempList[prevObjIndex] = selObj;

      setListItems(tempList);
    } else alert("This item is already the first item in the list");
  }
  function moveItemDown(item) {
    const tempList = [...listItems];
    let selObjIndex = tempList.indexOf(item);
    let nextObjIndex = selObjIndex + 1;
    if (nextObjIndex < tempList.length) {
      let selObj = tempList[selObjIndex];
      let nextObj = tempList[nextObjIndex];

      tempList[selObjIndex] = nextObj;
      tempList[nextObjIndex] = selObj;

      setListItems(tempList);
    } else alert("This item is already the last item in the list");
  }

  function deleteItem(passedItem) {
    const tempList = [...listItems];

    tempList.splice(tempList.indexOf(passedItem), 1);
    setListItems(tempList);
  }
  function addListItem() {
    if (
      input.current.value === "" ||
      input.current.value === null ||
      !input.current.value.replace(/\s/g, "").length
    ) {
      alert("textpls");
    } else {
      const tempList = [...listItems];
      const itemId = tempList.length;

      const listObj = {
        text: input.current.value,
        id: itemId,
        first: true,
        last: true
      };
      tempList.push(listObj);

      setListItems(tempList);
      input.current.value = "";
    }
  }

  return (
    <div className="App">
      <Typography variant="h5" color="primary" className={classes.toDoHeader}>
        My to do list
      </Typography>
      <div className="ListContainer">
        <List>
          {listItems.map(item => (
            <ListItem key={item.id}>
              <ListItemText
                disableTypography
                primary={item.text}
                className={classes.listItemText}
              />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={deleteItem.bind(this, item)}
                  color="primary"
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={moveItemUp.bind(this, item)}
                  color="primary"
                  disabled={item.first}
                >
                  <ArrowUpWardIcon />
                </IconButton>
                <IconButton
                  onClick={moveItemDown.bind(this, item)}
                  color="primary"
                  disabled={item.last}
                >
                  <ArrowDownWardIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <input ref={input} type="text" placeholder="Task to do" />

        <br />
        <Button
          onClick={addListItem}
          color="primary"
          variant="contained"
          className={classes.button}
        >
          Add item
        </Button>
      </div>
    </div>
  );
}

export default withStyles(styles)(App);
