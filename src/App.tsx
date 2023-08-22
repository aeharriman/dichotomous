import React, {useState} from "react";
import './App.css';
import InputPage from './Components/InputPage/InputPage';
import { KeyObject } from "./Utils/Interfaces";


function App() {

  const [dichotomousKey, setDichotomousKey] = useState<KeyObject>({})

// If using react-router,
    //   <Route component={withAuthenticationRequired(component)} {...args} />
  return (
        <InputPage 
            dichotomousKey={dichotomousKey}
            setDichotomousKey={setDichotomousKey}
          />
  );
}

export default App;
