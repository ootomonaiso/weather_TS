import { useState } from 'react';
import {
  Box, IconButton, Divider, SwipeableDrawer,
  List, ListItemButton, ListItemIcon, ListItemText, ListItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { locationList } from './location_list';

const Sidebar = ({ setLocation })=> {
  const [open, setOpen] = useState(false);

  // 地点選択時のアクション
  const onChangeLocation = (enName) => {
    const currentLocationData = locationList.find((lo) => enName === lo.enName);
    setLocation(currentLocationData);
  }

  // サイドバーの開閉
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  // 地点リスト
  const list = (
    <Box
      sx={{ width: 250 }}
      role='locations'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <PublicIcon fontSize='large' sx={{ color: 'royalblue' }} />
          </ListItemIcon>
          <ListItemText primary='地点一覧' />
        </ListItem>
      </List>
      <Divider />
      <List>
        {locationList.map((location, index) => (
          <ListItem key={location.enName} disablePadding>
            <ListItemButton onClick={() => onChangeLocation(location.enName)}>
              <ListItemIcon>
                <LocationOnIcon sx={{ color: 'red' }} />
              </ListItemIcon>
              <ListItemText primary={location.jpName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <div>
      <IconButton edge='start' sx={{ mr: 2, color: 'white' }} onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor='left'
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list}
      </SwipeableDrawer>
    </div>
  )
}

export default Sidebar
