import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, {ChangeEvent, useState, useEffect} from "react";

//update interface once refactored from string
function InputForm({dichotomousKey, setDichotomousKey}:{dichotomousKey:string|undefined, setDichotomousKey:React.Dispatch<React.SetStateAction<string|undefined>>}) {

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


    const [form, setForm] = useState('')

    const handleFormChange = (event:ChangeEvent<HTMLInputElement>) => {
        setForm(event.target.value)
    }

    const handleSubmit = () => {
        if(form !== "")
        {
            setDichotomousKey(form)
            // console.log("set to form" + dichotomousKey)
        } else {
            setDichotomousKey(placeholder)
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