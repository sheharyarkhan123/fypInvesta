import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route , Switch } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import CreateStartUp from './pages/CreateStartUp'
import { About } from './pages/About'
import { Discover } from './pages/Discover'
import { CardPage } from './pages/CardPage'
import Dashboard from './pages/Dashboard'
import  ProjectPage  from './pages/ProjectPage'
import { PaymentPage } from './pages/PaymentPage'
import { Provider } from 'react-redux'
import { store } from './store'
import PrivateRoute from './routes/privateRouter'
import ReturnInvestment from './pages/returnInvestment'
import PaymentDonePage from './pages/paymentDone'
import Loading from './pages/Loading'

function App () {
  return (
    <Provider store={store}>
      <div className='App'>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/signin' component={Signin}></Route>
            <Route exact path='/signup' component={Signup}></Route>
            <PrivateRoute exact path='/CreateStartUp' component={CreateStartUp}/>
            <Route exact path='/about' component={About}></Route>
            <Route exact path='/discover' component={Discover}></Route>
            <PrivateRoute exact path='/cardPage' component={CardPage}></PrivateRoute>
            <PrivateRoute
              exact
              path='/dashboard'
              component={Dashboard}
            ></PrivateRoute>
            <PrivateRoute exact
            path='/ProjectPage'
            component={ProjectPage}/>
            <PrivateRoute exact path='/PaymentPage' component={PaymentPage}></PrivateRoute>
            <PrivateRoute exact path='/return-investment' component={ReturnInvestment}></PrivateRoute>
            <PrivateRoute exact path='/payment-done' component={PaymentDonePage}></PrivateRoute>
            <PrivateRoute exact path='/loading' component={Loading}></PrivateRoute>
            
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
