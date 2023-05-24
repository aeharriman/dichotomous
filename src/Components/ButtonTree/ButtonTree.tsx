import { Button } from "react-bootstrap"
import { KeyObject } from "../../Utils/Interfaces";
import React, {ChangeEvent, useState, useEffect} from "react";
import { error } from "console";

function ButtonTree({dichotomousKey, setDichotomousKey}:{dichotomousKey: KeyObject|undefined, setDichotomousKey:React.Dispatch<React.SetStateAction<KeyObject|undefined>>}) {

    // Sets Dichotomous key to undefined to trigger conditional rendering of parent component
    const handleGoBack = () => {
        setDichotomousKey(undefined);
    }

    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [isDone, setIsDone] = useState<boolean>(false);

    // TODO: come up with a better way to check dichotomousKey isnt defined before everything
    const handleSelection = (currentSubKey: string) => {
        if (dichotomousKey !== undefined && typeof dichotomousKey[currentIndex][currentSubKey].goTo === "number") {
            setCurrentIndex(Number(dichotomousKey[currentIndex][currentSubKey].goTo))
        } else if (dichotomousKey !== undefined) {
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
        !isDone ?
        <> 
        <p>{JSON.stringify(dichotomousKey)}</p>

        <div style={{display: 'flex'}}>
            {createButtons(dichotomousKey, currentIndex)}
        </div>

        <Button onClick={handleGoBack}>Go Back</Button>
        </> : <>
        <p>{JSON.stringify(dichotomousKey)}</p>

        <div style={{display: 'flex'}}>
            {createButtons(dichotomousKey, currentIndex)}
        </div>

        <Button onClick={handleGoBack}>Go Back</Button>
        </> :
        <>
        Something went extremely wrong. You have fallen into the deep recesses of the program, 
        for this was only put here to make typescript happy and should not logically be possible.
        Be afraid. Be very afraid.
        </>

}

export default ButtonTree
