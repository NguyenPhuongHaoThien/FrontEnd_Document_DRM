
import Alert from 'react-bootstrap/Alert';
const NotFound = () => {
    return (
        <>
        <Alert variant="danger" >
        <Alert.Heading>Oh snap! You entered a link that doesn't exist !</Alert.Heading>
            <p>
                <h1>404 - Not Found</h1>

            </p>
        </Alert>
        </>)
}

export default NotFound;