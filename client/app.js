import React from 'react'

import { StateLegislators} from './components'

import Routes from './routes'
import DataMap from '../client/components/map';
import { Route, Switch } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <h2>State Legislators 🚀</h2>
      <div className="datamap-outer-conainer">
      <Switch>
            
            <Route path="/state/:state" component={StateLegislators} />
            <Route path="/" component={DataMap} />
      </Switch>
      
      
      </div>
      
    
    </div>
  )
}

export default App
