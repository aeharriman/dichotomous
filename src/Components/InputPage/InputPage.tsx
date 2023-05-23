import Description from "../Description/Description";
import InputForm from "../InputForm/InputForm";
import './InputPage.css';

// set dichotomousKey to interface later
function InputPage ({dichotomousKey, setDichotomousKey}:{dichotomousKey: any, setDichotomousKey:React.Dispatch<React.SetStateAction<any|undefined>>}) {


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
        </div>
    </>
}

export default InputPage