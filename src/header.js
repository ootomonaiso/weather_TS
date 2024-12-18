import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Sidebar from './sidebar';

const Header = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ bgcolor: 'navy' }}>
        <Toolbar>
          <Sidebar {...props} />  {/* サイドバー配置 */}
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            天気予報アプリ
            <WbSunnyIcon sx={{ color: 'orange' }} />
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
