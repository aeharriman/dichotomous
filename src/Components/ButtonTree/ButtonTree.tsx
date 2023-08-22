import { Button } from "react-bootstrap"
import { KeyObject } from "../../Utils/Interfaces";
import React, {useState, useEffect} from "react";

function ButtonTree({dichotomousKey, setDichotomousKey}:{dichotomousKey: KeyObject, setDichotomousKey:React.Dispatch<React.SetStateAction<KeyObject>>}) {

    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [isDone, setIsDone] = useState<boolean>(false);
    const [isStart, setIsStart] = useState<boolean>(true);
    const [finalSelection, setFinalSelection] = useState<string>('');
    const [history, setHistory] = useState<Array<number>>([]);

    // Sets Dichotomous key to length 0, triggers conditional rendering from parent component (InputPage)
    // function for "Go Back to Key Entry Page" button click to call
    const handleGoBack = () => {
        setDichotomousKey({});
    }

    // Function for "Previous" Button to call
    const handlePrevious = () => {
        if (history.length > 0) {
        setIsDone(false);
        // Move history back
        setCurrentIndex(history[history.length-1]);
        // Set current history to previous
        const previousHistory:Array<number> = history;
        previousHistory.pop();
        setHistory(previousHistory);
        }
    }

    // When the history length changes, check if you are at start
    useEffect (() => {
        if (history.length !== 0){
            setIsStart(true)
            console.log(history.length)
        } else {
            setIsStart(false)
        }
    },[history.length])


    // TODO: come up with a better way to check dichotomousKey isn't defined before everything
    const handleSelection = (currentSubKey: string) => {
        
        if (typeof dichotomousKey[currentIndex][currentSubKey].goTo === "number") {
            const nextHistory:Array<number> = history;
            nextHistory.push(currentIndex);
            setHistory(nextHistory);
            setCurrentIndex(Number(dichotomousKey[currentIndex][currentSubKey].goTo));
        } else if (typeof dichotomousKey[currentIndex][currentSubKey].goTo === "string") {
            const nextHistory:Array<number> = history;
            nextHistory.push(currentIndex);
            setHistory(nextHistory);
            setFinalSelection(String(dichotomousKey[currentIndex][currentSubKey].goTo));
            setIsDone(true);
        } else {
            // TODO: handle this gracefully (maybe display a modal)
            throw new Error("Invalid dichotomous key (1)");
        }
        
    }

    const createButtons = (wholeKey: KeyObject, currentMainKey: number) => {
        const buttons = []
        // for each subkey in mainkey/current index
        for (let subKey in wholeKey[currentMainKey]){

            // console.log(currentMainKey)
            // console.log(subKey)
            // console.log(currentMainKey + subKey)

            buttons.push(
                <Button key={currentMainKey + subKey}
                    onClick = {() => handleSelection(subKey)}
                >
                {wholeKey[currentMainKey][subKey].text}
                </Button>
            )
        }
        return buttons
    }

    return ( 
        <> 
        {/* <p>{JSON.stringify(dichotomousKey)}</p> */}

        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center',width: '500px', border: 'solid 5px black', padding: '3rem'}}>
            {!isDone ? (
                createButtons(dichotomousKey, currentIndex)
            ) : (
                <h1>{finalSelection}</h1>
            )}
        </div>

        {isStart ? (
        <Button onClick={handlePrevious}>Previous</Button>
        ) : <></>}

        <Button onClick={handleGoBack}>Go back to key entry page</Button>
        </> )

}

export default ButtonTree
