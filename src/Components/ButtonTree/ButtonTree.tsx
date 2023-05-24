import { Button } from "react-bootstrap"
import { KeyObject } from "../../Utils/Interfaces";
import React, {ChangeEvent, useState, useEffect} from "react";

function ButtonTree({dichotomousKey, setDichotomousKey}:{dichotomousKey: string|undefined, setDichotomousKey:React.Dispatch<React.SetStateAction<string|undefined>>}) {

    // Sets Dichotomous key to undefined to trigger conditional rendering of parent component
    const handleGoBack = () => {
        setDichotomousKey(undefined);
    }

    let finalKey: KeyObject;

    // Arrow function that returns a KeyObject.
    // Alternatively for non-arrow function:
    // function finalKey(): KeyObject {
    const getFinalKey: (dichotomousKey: string) => KeyObject = () => {
        // Stops typescript from complaining it could be undefined
        if (typeof dichotomousKey === "string") {

            // Splits into array of separate lines
            const lines = dichotomousKey.match(/\d\.\w\..+?(?=\d\.\w\.|$)/gs);
            // console.log(lines)

            // Makes an empty object to fill
            let parsed: KeyObject = {};

            if (lines !== null) {

                lines.forEach(line => {
                    
                    // Remove any leading/trailing whitespace
                    line = line.trim();

                    // Splits into neccessary parts one by one and names them
                    const [identifierText = '', target = ''] = line.split(/ *\.{2,} */).map(part => part.trim());
                    const [identifier = '', text = ''] = identifierText.split(/\.\s+(?=[^\.]+$)/).map(part => part.trim());
                    const [mainKeyText, subKey] = identifier.split('.');
                    
                    const mainKey = parseFloat(mainKeyText);
                    // Fills object with correct parts from this line
                    if (mainKey && subKey && text && target) {
                        // Sets up the object correctly for adding subkeys if the main key hasn't been used yet
                        if (!parsed[mainKey]) parsed[mainKey] = {};
                        parsed[mainKey][subKey] = {
                            text: text,
                            goTo: isNaN(parseFloat(target)) ? target : parseFloat(target),
                        };
                    }
                });

                console.log(parsed);

                // Final result given default text:
                // {
                //     '1': { 
                //       'a': { text: 'found in water', goTo: 2 },
                //       'b': { text: 'found on land', goTo: 3 }
                //     },
                //     '2': { 
                //       'a': { text: 'grows in salt water', goTo: 'seaweed' },
                //       'b': { text: 'does not grow in salt water', goTo: 'water-lily' } 
                //     },
                //     '3': {
                //       'a': { text: 'real plant', goTo: 4 },
                //       'b': { text: 'not a real plant', goTo: 'astroturf' } 
                //     },
                //     '4': {
                //       'a': { text: 'grows more than 50 m tall', goTo: 'fir tree' },
                //       'b': { text: 'grows less than 50 m tall', goTo: 5 } 
                //     },
                //     '5': {
                //       'a': { text: 'produces yellow flowers', goTo: 'dandelion' },
                //       'b': { text: 'does not produce yellow flowers', goTo: 'apple tree' } 
                //     }
                // }
                return parsed;
            } else { 
                throw new Error("Invalid dichotomous key (1)");
            }
        } else {
            throw new Error("Invalid dichotomous key (2)");
        }
    }

    if (typeof dichotomousKey === "string") {
        finalKey = getFinalKey(dichotomousKey); 
    }

    const [currentIndex, setCurrentIndex] = useState<number>(1);

    // const handleSelection()

    const createButtons = (wholeKey: KeyObject, currentMainKey: number) => {
        const buttons = []
        // for each subkey in mainkey/current index
        for (let subKey in wholeKey[currentMainKey]){
            const currentSubKey = subKey;
            buttons.push(
                <Button
                    // onClick = {handleSelection(currentMainKey, currentSubKey)}
                    />
            )
        }
    }

    return <>
    <pre>{dichotomousKey}</pre>

    <div style={{display: 'flex'}}>
        {/* // Variable 'finalKey' is used before being assigned. I think this means I needed to set up the string dichotomous key and created the key out of it, passing the key to this component */}
        {/* {createButtons(finalKey, currentIndex)} */}
    </div>

    <Button onClick={handleGoBack}>Go Back</Button>
    </>

}

export default ButtonTree
