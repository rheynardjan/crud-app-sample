import '../App.css';
import { Card, Button, Modal, Form, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function Posts(){

    const [posts, setPosts] = useState([]);
    const [updatedPost, setUpdatedPost] = useState({});

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get("/posts").then((res) => {
            console.log();
            setPosts(res.data);
        }).catch((err) => console.log(err));
    }, [])

    const deletePost = (id) => {
        axios.delete(`/delete/${id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

        window.location.reload();
    };

    const updatePost = (post) => {
        setUpdatedPost(post);
        handleShow();
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        setUpdatedPost(prev => {
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
            axios.put(`/update/${updatedPost._id}`, updatedPost)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

            handleClose();
            window.location.reload();
        }

        setValidated(true);
    };

    return(
        <Container>
            <h1>Posts</h1>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Update {updatedPost.title}</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                        <Form.Group>
                            <Form.Control name='title' value={updatedPost.title ? updatedPost.title : ""} onChange={handleChange} placeholder="Post Title" maxLength={20} required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a title.
                            </Form.Control.Feedback>
                            <Form.Text muted>
                                Maximum title length is 20.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control name='description' value={updatedPost.description ? updatedPost.description : ""} onChange={handleChange} placeholder="Post Description" as="textarea" rows={3} maxLength={100} required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a description.
                            </Form.Control.Feedback>
                            <Form.Text muted>
                                Maximum description length is 100.
                            </Form.Text>
                        </Form.Group>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        CLOSE
                    </Button>
                    <Button type='submit' variant="primary">
                        SAVE CHANGES
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {posts ? (<div style={{display:"flex", flowDirection:"row", flexWrap:"wrap", gap:"10px", alignItems:"stretch"}}>
                {posts.map(post => {
                    return(
                        <div key={post._id}>
                        <Card style={{maxWidth: '20rem', height:"100%"}}>
                            <Card.Header as="h5">{post.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>{post.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <div style={{display:"flex", flowDirection:"row", gap:"10px", justifyContent:"flex-end"}}>
                                <Button onClick={() => updatePost(post)} variant="info">UPDATE</Button>
                                <Button onClick={() => deletePost(post._id)} variant="danger">DELETE</Button>
                                </div>
                            </Card.Footer>
                        </Card>
                        </div>
                    )
                })}
            </div>): ""}
        </Container>
    );
}

export default Posts;