import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'

import { PresetProvider } from './hooks/PresetContext'
import Generate from './pages/Generate'
import './popup.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function Popup() {
  return (
    <div className='dark bg-zinc-800 min-w-[400px] pb-4'>
      <PresetProvider>
        <ThemeProvider theme={theme}>
          <Generate />
        </ThemeProvider>
      </PresetProvider>
    </div>
  )
}

export default Popup
