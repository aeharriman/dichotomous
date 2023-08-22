import Description from "../Description/Description";
import InputForm from "../InputForm/InputForm";
import './InputPage.css';
import ButtonTree from "../ButtonTree/ButtonTree";
import { KeyObject } from "../../Utils/Interfaces";


// set dichotomousKey to interface later
function InputPage ({dichotomousKey, setDichotomousKey}:{dichotomousKey: KeyObject, setDichotomousKey:React.Dispatch<React.SetStateAction<KeyObject>>}) {


    // InputPage is the parent of Description, InputForm, and ButtonTree

return (Object.keys(dichotomousKey).length === 0) ? 
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