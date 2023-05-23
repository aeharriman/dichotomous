import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

//update interface once refactored from string
function InputForm({dichotomousKey, setDichotomousKey}:{dichotomousKey: any, setDichotomousKey:React.Dispatch<React.SetStateAction<string|undefined>>}) {

    const placeholder: string = `
    1.a. found in water ................................. 2

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

    // useEffect{


    // }

    return (
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Try this:</Form.Label>
          <Form.Control as="textarea" placeholder={placeholder} rows={3} />
        </Form.Group>
        <Col xs="auto" className="my-1">
          <Button variant="outline-secondary" type="submit">Submit</Button>
        </Col>
      </Form>
    );
  }

export default InputForm;