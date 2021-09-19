import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  ListItemIcon,
} from '@material-ui/core';
import {
  Public as PublicIcon,
  Home as HomeIcon,
  Search as SearchIcon,
} from '@material-ui/icons';

import {Auth, API } from 'aws-amplify';

import { useHistory } from 'react-router';

const drawerWidth = 340;
const MAX_POST_CONTENT_LENGTH = 140;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: 'relative',
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
  },
  toolbar: theme.mixins.toolbar,
  textField: {
    width: drawerWidth,
  },
  list: {
    // overflowWrap: 'break-word',
    width: 300,
  },
}));

export default function Sidebar({activeListItem}) {
  const classes = useStyles();
  const history = useHistory();

  const [value, setValue] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');

  const handleChange = event => {
    setValue(event.target.value);
    if (event.target.value.length > MAX_POST_CONTENT_LENGTH) {
      setIsError(true);
      setHelperText(MAX_POST_CONTENT_LENGTH - event.target.value.length);
    } else {
      setIsError(false);
      setHelperText('');
    }
  };

  const signOut = () => {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem
            button
            selected={activeListItem === 'Home'}
            onClick={() => { history.push('/')}}
            key='home'
          >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          selected={activeListItem === 'form-dialer'}
          onClick={() => {
            Auth.currentAuthenticatedUser().then((user) => {
              history.push('/form-dialer');
            })
          }}
          key='form-dialer'
        >
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Form Dialer" />
        </ListItem>
        <ListItem
          button
          selected={activeListItem === 'search'}
          onClick={() => {
            Auth.currentAuthenticatedUser().then((user) => {
              history.push('search');
            })
          }}
          key='search'
        >
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
      </List>
    </Drawer>
  )
}