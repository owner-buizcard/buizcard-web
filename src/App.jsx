import CustomTheme from './theme/CustomTheme'
import ScrollTop from './components/ScrollTop'
import ThemeRoutes from './routes'

const App =()=>{

  return (
  <CustomTheme>
    <ScrollTop>
      <ThemeRoutes/>
    </ScrollTop>
  </CustomTheme>
  )
}

export default App
