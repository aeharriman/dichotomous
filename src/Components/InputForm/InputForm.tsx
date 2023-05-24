import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, {ChangeEvent, useState, useEffect} from "react";
import { KeyObject } from '../../Utils/Interfaces';

// This component takes input from a form and parses it into dichotomousKey on submit. 
// It is rendered conditionally from InputPage, and disappears when dichotomousKey is defined

function InputForm({dichotomousKey, setDichotomousKey}:{dichotomousKey:KeyObject|undefined, setDichotomousKey:React.Dispatch<React.SetStateAction<KeyObject|undefined>>}) {

    const placeholder: string = `1.a. found in water ................................. 2

    2.a. grows in salt water ................................. seaweed
        
    2.b. does not grow in salt water .............................. water-lily
        
    1.b. found on land ................................ 3
        
    3.a. real plant ....................... 4
        
    4.a. grows more than 50 m tall .................. fir tree
        
    4.b. grows less than 50 m tall ............................ 5
        
    5.a. produces yellow flowers ............................... dandelion
        
    5.b. does not produce yellow flowers ..........................apple tree
        
    3.b. not a real plant ............................... astroturf
    `

    // Making the text displayed in the form show the variable changed by editing the form
    const [form, setForm] = useState('')

    const handleFormChange = (event:ChangeEvent<HTMLInputElement>) => {
        setForm(event.target.value)
    }

    // This function turns the string from the form into an object
    const getFinalKey = (stringKey: string) : KeyObject => {
        // Stops typescript from complaining it could be undefined
        if (typeof stringKey === "string") {

            // Splits into array of separate lines
            const lines = stringKey.match(/\d\.\w\..+?(?=\d\.\w\.|$)/gs);
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
                    
                    // Learned here that JSON keys HAVE to be strings and will convert automatically, 
                    // and even Javascript keys act as strings under the hood, making this unnessecary.
                    // I kept it in though because it is technically a number and I want my interface to reflect that.
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

                // console.log(parsed);

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

    const handleSubmit = () => {
        if(form !== "")
        {
            setDichotomousKey(getFinalKey(form))
            // console.log("set to form" + dichotomousKey)
        } else {
            setDichotomousKey(getFinalKey(placeholder))
            // This doesn't log the new value immediately because setState functions only schedule state updates for the next render
            // console.log("set to key" + dichotomousKey) 
        }
    } 

    // This didnt work because the component unmounts immediately after setting dichotomousKey
    // useEffect(() => {
    //     console.log('dichotomousKey changed: ', dichotomousKey);
    //   }, [dichotomousKey]);

    return (
      <Form onSubmit={event => {event.preventDefault()}}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Try this:</Form.Label>
          <Form.Control style={{color:'rgb(192, 225, 188)', padding: '3rem'}} as="textarea" placeholder={placeholder} value={form} onChange={handleFormChange} rows={15} />
        </Form.Group>
        <Row>
          <Col xs="auto" className="ms-auto my-1">
            <Button variant="outline-secondary" type="button" onClick={handleSubmit}>Submit</Button>
          </Col>
        </Row>
      </Form >
    );
  }

export default InputForm;