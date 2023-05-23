import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import InputPage from './Components/InputPage/InputPage';


function App() {

  // change any to dichotomousKey inteface after creating that
  const [dichotomousKey, setDichotomousKey] = useState<any | undefined>()


  return (
        <InputPage 
            dichotomousKey={dichotomousKey}
            setDichotomousKey={setDichotomousKey}
          />
  );
}

export default App;
