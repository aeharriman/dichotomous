import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import InputPage from './Components/InputPage/InputPage';
import { KeyObject } from "./Utils/Interfaces";


function App() {

  // change any to dichotomousKey interface after creating that
  const [dichotomousKey, setDichotomousKey] = useState<KeyObject | undefined>()


  return (
        <InputPage 
            dichotomousKey={dichotomousKey}
            setDichotomousKey={setDichotomousKey}
          />
  );
}

export default App;
