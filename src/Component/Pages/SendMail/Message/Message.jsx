import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import './Message.css';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [toggleStates, setToggleStates] = useState({});

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://plantify.runasp.net/api/Dashboard/contactus/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMessages(response.data);

        const savedToggleStates = JSON.parse(localStorage.getItem('toggleStates')) || {};
        setToggleStates(savedToggleStates);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [token]);

  const handleToggleClick = (id) => {
    setToggleStates((prevStates) => {
      const newStates = { ...prevStates, [id]: !prevStates[id] };
      localStorage.setItem('toggleStates', JSON.stringify(newStates));
      return newStates;
    });
  };

  const handleSendReply = async (id, email) => {
    const senderEmail = 'alfa.graduation.project.20@gmail.com';
    const subject = 'Reply to your message';
    const body = 'Type your reply here...';

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    try {
      await axios.delete(`http://plantify.runasp.net/api/Dashboard/contactus/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <Container className="message-container">
      <Row>
        {messages.map((message) => (
          <Col xs={12} md={6} lg={4} key={message.id} className="mb-4">
            <Card className="message-card" style={{ 
              backgroundColor: toggleStates[message.id] ? 'black' : 'var(--backColor1)', 
              color: toggleStates[message.id] ? 'white' : 'black' 
            }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                <FontAwesomeIcon
                    icon={toggleStates[message.id] ? faToggleOn : faToggleOff}
                    size="2x"
                    onClick={() => handleToggleClick(message.id)}
                    className="toggle-icon"
                  />
                  <Card.Title>{message.name}</Card.Title>
                </div>
                <Card.Text>
                  <strong>Email: </strong>{message.email}<br />
                  <strong>Message: </strong>{message.message}<br />
                  <strong>Created At: </strong>{new Date(message.created_at).toLocaleString()}
                </Card.Text>
                <Button variant="secondary" onClick={() => handleSendReply(message.id, message.email)}>
                  Reply
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Message;
