import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, {ChangeEvent, useEffect, useState} from "react";
import { KeyObject, NamedStringKey } from '../../Utils/Interfaces';
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";

// This component takes input from a form and parses it into dichotomousKey on submit. 
// It is rendered conditionally from InputPage, and disappears when dichotomousKey is defined

function InputForm({dichotomousKey, setDichotomousKey}:{dichotomousKey:KeyObject, setDichotomousKey:React.Dispatch<React.SetStateAction<KeyObject>>}) {

    const [activeTab, setActiveTab] = useState<string>('default');

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0(); // Auth0 hook to get the access token

    const [activeKeys, setActiveKeys] = useState<NamedStringKey[]>([{
        name: 'default',
        key: `1.a. found in water ................................. 2

2.a. grows in salt water ................................. seaweed
        
2.b. does not grow in salt water .............................. water-lily
        
1.b. found on land ................................ 3
        
3.a. real plant ....................... 4
        
4.a. grows more than 50 m tall .................. fir tree
        
4.b. grows less than 50 m tall ............................ 5
        
5.a. produces yellow flowers ............................... dandelion
        
5.b. does not produce yellow flowers ..........................apple tree
        
3.b. not a real plant ............................... astroturf`},

{
    name: 'tab1',
    key: `1.a. Fish has one dorsal fin ....................... 2

1.b. Forked two dorsal fins ....................... 4

2.a. Fish is spotted ....................... northern pike

2.b. Fish is striped ....................... 3

3.a. Fish has dark stripes ....................... tiger muskie

3.b. Fish has light stripes ....................... muskellunge

4.a. Fish does not have spots ....................... 5

4.b. Fish has spots .......................  6

5.a. Fish has large first dorsal fin ....................... walleye

5.b. Fish has large second dorsal fin ....................... largemouth bass

6.a. Fish has light spots ....................... brook trout

6.b. Fish has dark spots ....................... 7

7.a. Fish has more spots near or on tail ....................... cutthroat trout

7.b. Fish does not have more spots on or near tail .......................8

8.a. Fish has light area in middle .......................rainbow trout

8.b. Fish does not have light area in middle ....................... brown trout`},
        {
        name: 'tab2',
        key: `1.a. bird .............. 2
1.b. fish .................. 3
3.a. fast boi ......... flying fish
3.b. smooth boi ............... ray
1.c. mammal ...................... human
2.a. classy ........................... penguin
2.b. efficient ...................... raptor
2.c. regular joe ...................... 4
4.a. blue .................... blue bird
4.b. red ......................... cardinal`,
    }]);

    const placeholder = `1.a. found in water ................................. 2

2.a. grows in salt water ................................. seaweed
        
2.b. does not grow in salt water .............................. water-lily
        
1.b. found on land ................................ 3
        
3.a. real plant ....................... 4
        
4.a. grows more than 50 m tall .................. fir tree
        
4.b. grows less than 50 m tall ............................ 5
        
5.a. produces yellow flowers ............................... dandelion
        
5.b. does not produce yellow flowers ..........................apple tree
        
3.b. not a real plant ............................... astroturf`;

    const activeDKey: NamedStringKey | undefined = activeKeys.find(tab => tab.name === activeTab);


    // Making the text displayed in the form show the variable changed by editing the form
    const [form, setForm] = useState('')

    const handleFormChange = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setForm(event.target.value)
    }

    // Sets textarea to "key" from NamedStringKey set by "name" in activeTab
    useEffect(() => {
        const foundTab = activeKeys.find(tab => tab.name === activeTab);
        if (foundTab) {
            setForm(foundTab.key);
        }
    }, [activeTab]);

    useEffect(() => {
        (async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await axios.get('http://localhost:6565/api/keys', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setActiveKeys(prevKeys => [...prevKeys, ...response.data]);
            } catch (e) {
                console.error('Failed to fetch keys:', e);
            }
        })();
    }, []);



    function process(input: string): string {
        // Replace ellipsis with periods
        let processed = input.replace(/…/g, '...');

        // Add a dot after number followed by letter or character
        processed = processed.replace(/(\d)([a-z])/g, '$1.$2');

        // Add a space before and after sequence of periods
        // Test showed this to unnecessary
        // processed = processed.replace(/(\w)(\.{2,})(\w)/g, '$1 $2 $3');

        // Ensure that every (number).(character) is followed by a period
        processed = processed.replace(/(\d\.[a-z])([^.]|$)/g, '$1.$2');

        return processed;
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
                    const [identifier = '', text = ''] = identifierText.split(/\.\s+(?=[^.]+$)/).map(part => part.trim());
                    const [mainKeyText, subKey] = identifier.split('.');

                    // Learned here that JSON keys HAVE to be strings and will convert automatically, 
                    // and even Javascript keys act as strings under the hood, making this unnecessary.
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
        console.log("handleSubmit called when form was:" + form);
        if (form !== "") {
            setDichotomousKey(getFinalKey(process(form)));
        } else {
            console.log("Form cannot be submitted when empty")
        }
    }

    return (
      <Form onSubmit={event => {event.preventDefault()}}>
          <Form.Label>Try these samples:</Form.Label>
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k ?? "default")}>
              {activeKeys.map((activeKeyObj, index) => (
                  <Tab eventKey={activeKeyObj.name} title={activeKeyObj.name} key={index}>
                  </Tab>
              ))}
          </Tabs>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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