import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'

import { PresetProvider } from './hooks/PresetContext'
import PresetMenu from './pages/PresetMenu'
import './popup.css'


const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function Options() {
  return (
    <div className='dark bg-zinc-800 min-w-screen min-h-screen'>
      <PresetProvider>
        <ThemeProvider theme={theme}>
          <PresetMenu />
        </ThemeProvider>
      </PresetProvider>
    </div>
  )
}

export default Options
