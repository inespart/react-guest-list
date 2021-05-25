import './App.css';
import { stat } from 'fs';
import { useEffect, useState } from 'react';

const baseUrl = 'https://rest-guest-list-api.herokuapp.com';
// const baseUrl = 'http://localhost:5000';

function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attending, setAttending] = useState('');

  // GET - getting all guests
  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`${baseUrl}`);
      setGuests(await response.json());
    }
    fetchUserData();
  }, []);

  // POST - creating a new guest
  async function createNewGuest() {
    const response = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const createdGuest = await response.json();
    console.log(createdGuest);
    // push the newly created guest to the array of guests
    const stateCopy = [...guests];
    stateCopy.push(createdGuest);
    setGuests(stateCopy);
  }

  // DELETE a guest
  async function deleteGuest(guest) {
    const response = await fetch(`${baseUrl}/${guest.id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    console.log(deletedGuest);
    // filter the deleted guest from the array of guests
    const guestsFilter = guests.filter((g) => g.id !== deletedGuest.id);
    setGuests(guestsFilter);
  }

  // UPDATE attendance
  async function updateGuest(guest) {
    const response = await fetch(`${baseUrl}/${guest.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: true }),
    });
    const updatedGuest = await response.json();
    console.log(updatedGuest);
  }

  // handleAttending function for checkbox
  function handleAttending(guest) {
    setAttending(!attending);
    updateGuest(guest);
  }

  return (
    <>
      <h1>Awesome Party Ahead</h1>
      <div>
        <h2>Add a new guest</h2>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            placeholder="Sara"
            onChange={(event) => {
              setFirstName(event.currentTarget.value);
            }}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            placeholder="Huber"
            onChange={(event) => {
              setLastName(event.currentTarget.value);
            }}
          />
        </div>
        <br />
        <button
          onClick={() => {
            setFirstName(firstName);
            setLastName(lastName);
            createNewGuest();
          }}
        >
          Add new guest
        </button>
      </div>
      <h2>Guest List</h2>
      <div>
        <ul>
          {guests.map((guest) => {
            return (
              <li key={guest.id}>
                {guest.firstName} {guest.lastName}{' '}
                {guest.attending ? '- attending' : '- not attending'}
                {/* this checkbox doesnt work yet */}
                <input
                  type="checkbox"
                  id="attending"
                  value={attending}
                  onClick={() => handleAttending(guest.id)}
                />
                <label htmlFor="attending">Attending</label>
                <button
                  onClick={() => {
                    deleteGuest(guest);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
