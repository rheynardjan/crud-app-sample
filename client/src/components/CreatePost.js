import '../App.css';
import { Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost(){

    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: "",
        description: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setPost(prev => {
            return({
                ...prev,
                [name]: value
            })
        })
    };

    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }else {
            axios
            .post("/create", post)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

            navigate("posts");
        }

        setValidated(true);
    };

    return(
        <Container>
            <h1>Create a New Post</h1>
            <div style={{width:"70%", margin:"auto"}}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
            <Form.Group>
                <Form.Control name='title' value={post.title} onChange={handleChange} placeholder="Post Title" maxLength={20} required />
                <Form.Control.Feedback type="invalid">
                    Please provide a title.
                </Form.Control.Feedback>
                <Form.Text muted>
                    Maximum title length is 20.
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Control name='description' value={post.description} onChange={handleChange} placeholder="Post Description" as="textarea" rows={3} maxLength={100} required />
                <Form.Control.Feedback type="invalid">
                    Please provide a description.
                </Form.Control.Feedback>
                <Form.Text muted>
                    Maximum description length is 100.
                </Form.Text>
            </Form.Group>
            </div>
            <div style={{marginTop:"10px", display:"flex", justifyContent:"flex-end"}}>
            <Button type='submit' variant='success'>CREATE</Button>
            </div>
            </Form>
            </div>
        </Container>
    );
}

export default CreatePost;