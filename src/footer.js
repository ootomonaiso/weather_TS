import { Grid, Box, Divider } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Divider sx={{ mx: 5, bgcolor: 'lightgray' }} />  {/* 水平線 */}
      <Grid>
        <Box component='p' className='center-item' color='gray'>
          © {new Date().getFullYear()} 駆け出しむらぽん
        </Box>
      </Grid>
    </footer>
  )
}

export default Footer
