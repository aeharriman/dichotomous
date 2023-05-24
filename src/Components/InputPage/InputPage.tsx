import Description from "../Description/Description";
import InputForm from "../InputForm/InputForm";
import './InputPage.css';
import ButtonTree from "../ButtonTree/ButtonTree";
import { useEffect } from "react";


// set dichotomousKey to interface later
function InputPage ({dichotomousKey, setDichotomousKey}:{dichotomousKey: string | undefined, setDichotomousKey:React.Dispatch<React.SetStateAction<string|undefined>>}) {



return (dichotomousKey === undefined) ? 
    <>
        <div className="container p-5" id="container">
            <Description />
            <InputForm
                dichotomousKey={dichotomousKey}
                setDichotomousKey={setDichotomousKey}
            />
        </div> 
    </> :
    <>
        <div className="container p-5" id="container">
            <Description />
            <ButtonTree 
                dichotomousKey={dichotomousKey}
                setDichotomousKey={setDichotomousKey}
            />
        </div>
    </>

}

export default InputPage