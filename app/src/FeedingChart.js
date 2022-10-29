import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const FeedingChart = () => {

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(['XSRF-TOKEN']);
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    setLoading(true);

    fetch('/feeding/findAll')
      .then(response => response.json())
      .then(data => {
        setGroups(data);
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`/feeding/deleteById/${id}`, {
      method: 'DELETE',
      headers: {
        'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(() => {
      let updatedGroups = [...groups].filter(i => i.id !== id);
      setGroups(updatedGroups);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const groupList = groups.map(group => {
    return <tr key={group.id}>
      <td style={{whiteSpace: 'nowrap'}}>{group.name}</td>
      <td>{group.milk} oz</td>
      <td>{group.food} g</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" 
                  tag={Link} 
                  to={"/feedingchart/" + group.id}
                  disabled={userType === 'nanny'}>Edit</Button>
          <Button size="sm" color="danger" 
                  onClick={() => remove(group.id)}
                  disabled={userType === 'nanny'}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container fluid style={{width: "75%"}}>
        <div className="float-end" style={{display: userType === 'nanny' ? 'none' : 'block'}}>
          <Button color="success" tag={Link} to="/feedingchart/new">Add Entry</Button>
        </div>
        <br/>
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="20%">Name</th>
            <th width="20%">Milk</th>
            <th>Food</th>
            <th width="10%">Actions</th>
          </tr>
          </thead>
          <tbody>
          {groupList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default FeedingChart;
