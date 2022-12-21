import '../App.css';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  return (
    <Container>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
    <h1>Welcome!</h1>
      <p>You can post anything you want here! Click the button below to get started.</p>
      <div style={{textAlign:"center"}}>
      <Button onClick={() => navigate("create")}>CREATE A NEW POST</Button>
      </div>
    </div>
    </Container>
  );
}

export default App;
