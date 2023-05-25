import { Button } from "react-bootstrap"
import { KeyObject } from "../../Utils/Interfaces";
import React, {ChangeEvent, useState, useEffect} from "react";
import { error } from "console";

function ButtonTree({dichotomousKey, setDichotomousKey}:{dichotomousKey: KeyObject|undefined, setDichotomousKey:React.Dispatch<React.SetStateAction<KeyObject|undefined>>}) {

    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [isDone, setIsDone] = useState<boolean>(false);
    const [isStart, setIsStart] = useState<boolean>(true);
    const [finalSelection, setFinalSelection] = useState<string>('');
    const [history, setHistory] = useState<Array<number>>([]);

    // Sets Dichotomous key to undefined to trigger conditional rendering of parent component
    const handleGoBack = () => {
        setDichotomousKey(undefined);
    }

    const handlePrevious = () => {
        if (history.length > 0) {
        setIsDone(false);
        setCurrentIndex(history[history.length-1]);
        const previousHistory:Array<number> = history;
        previousHistory.pop();
        setHistory(previousHistory);
        }
    }

    useEffect (() => {
        if (history.length != 0){
            setIsStart(true)
            console.log(history.length)
        } else {
            setIsStart(false)
        }
    },[history.length])

    // TODO: come up with a better way to check dichotomousKey isn't defined before everything
    const handleSelection = (currentSubKey: string) => {
        
        if (dichotomousKey !== undefined && typeof dichotomousKey[currentIndex][currentSubKey].goTo === "number") {
            const nextHistory:Array<number> = history;
            nextHistory.push(currentIndex);
            setHistory(nextHistory);
            setCurrentIndex(Number(dichotomousKey[currentIndex][currentSubKey].goTo));
        } else if (dichotomousKey !== undefined && typeof dichotomousKey[currentIndex][currentSubKey].goTo === "string") {
            const nextHistory:Array<number> = history;
            nextHistory.push(currentIndex);
            setHistory(nextHistory);
            setFinalSelection(String(dichotomousKey[currentIndex][currentSubKey].goTo));
            setIsDone(true);
        } else {
            throw new Error("Invalid dichotomous key (3)");
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

    return (dichotomousKey !== undefined) ? 
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
        </> :
        <>
        Something went extremely wrong. You have fallen into the deep recesses of the program, 
        for this was only put here to make typescript happy and should not logically be possible.
        Be afraid. Be very afraid.
        </>

}

export default ButtonTree
