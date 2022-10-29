import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { useCookies } from 'react-cookie';

const FeedingEntryEdit = () => {
  const initialFormState = {
    name: '',
    milk: 0,
    food: 0
  };
  const [group, setGroup] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookies] = useCookies(['XSRF-TOKEN']);

  useEffect(() => {
    if (id !== 'new') {
      fetch(`/feeding/findById/${id}`)
        .then(response => response.json())
        .then(data => setGroup(data));
    }
  }, [id, setGroup]);

  const handleChange = (event) => {
    const { name, value } = event.target
    setGroup({ ...group, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/feeding/addOrUpdate`, {
      method: 'POST',
      headers: {
        'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(group),
      credentials: 'include'
    });
    setGroup(initialFormState);
    navigate('/feedingchart');
  }

  const title = <h2>{group.id ? 'Edit Feeding Entry' : 'Add Feeding Entry'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={group.name || ''}
                   onChange={handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="milk">Milk</Label>
            <Input type="number" name="milk" id="milk" value={group.milk || ''}
                   onChange={handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="food">Food</Label>
            <Input type="number" name="food" id="food" value={group.food || ''}
                   onChange={handleChange}/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/feedingchart">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default FeedingEntryEdit;
