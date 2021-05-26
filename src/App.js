import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
// import { stat } from 'fs';
import { useEffect, useState } from 'react';

const baseUrl = 'https://rest-guest-list-api.herokuapp.com';

// CSS
const container = css`
  display: flex;
`;

const containerLeft = css`
  background-image: url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1267&q=80');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 70%;
  margin-right: 20px;
`;

const containerRight = css`
  padding: 50px;
  width: 30%;
  font-family: 'Helvetica Neue', sans-serif;
`;

const inputContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  input {
    padding: 10px;
    width: 80%;
  }

  h2 {
    margin-bottom: 35px;
  }

  button {
    width: 160px;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    text-transform: uppercase;
  }

  button:before {
    content: '';
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  button:active {
    color: #000;
  }

  button:active:after {
    background: transparent;
  }

  button:hover:before {
    opacity: 1;
  }

  button:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  @keyframes glowing {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;

const guestListContainer = css`
  display: flex;
  justify-content: center;

  button {
    width: 50px;
    height: 30px;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    text-transform: uppercase;
    margin-left: 15px;

    :before {
      content: '';
      background: linear-gradient(
        45deg,
        #ff0000,
        #ff7300,
        #fffb00,
        #48ff00,
        #00ffd5,
        #002bff,
        #7a00ff,
        #ff00c8,
        #ff0000
      );
      position: absolute;
      top: -2px;
      left: -2px;
      background-size: 400%;
      z-index: -1;
      filter: blur(5px);
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      animation: glowing 20s linear infinite;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      border-radius: 10px;
    }

    :active {
      color: #fff;
    }

    :active:after {
      background: transparent;
    }

    :hover:before {
      opacity: 1;
    }

    :after {
      z-index: -1;
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: #111;
      left: 0;
      top: 0;
      border-radius: 10px;
    }

    @keyframes glowing {
      0% {
        background-position: 0 0;
      }
      50% {
        background-position: 400% 0;
      }
      100% {
        background-position: 0 0;
      }
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    line-height: 40px;
  }
`;

function App() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // GET - getting all guests
  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`${baseUrl}`);
      const res = await response.json();
      setGuests(res);
      setLoading(false);
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
      body: JSON.stringify({ attending: guest.attending }),
    });
    const updatedGuest = await response.json();
    console.log(updatedGuest);
  }

  // handleAttending function for checkbox
  function handleAttending(id, attending) {
    // update Attendance checkbox in the frontend
    const copyGuests = [...guests];
    const guestFound = copyGuests.find((g) => g.id === id);
    // update attending property of guestFound to the currentTarget.checked
    guestFound.attending = attending;
    updateGuest(guestFound);
    // guestFound is a reference to the "old" object inside copyGuests; that's why copyGuests is updated
    setGuests(copyGuests);
  }

  return (
    <div css={container}>
      <div css={containerLeft}>Hi</div>
      <div css={containerRight}>
        <h1>Awesome Party Ahead</h1>
        <div>
          <div css={inputContainer}>
            <h2>Sign up for the party</h2>
            <input
              type="text"
              id="firstName"
              value={firstName}
              placeholder="First Name"
              disabled={loading}
              onChange={(event) => {
                setFirstName(event.currentTarget.value);
              }}
            />
            <br />
            <input
              type="text"
              id="lastName"
              value={lastName}
              placeholder="Last Name"
              disabled={loading}
              onChange={(event) => {
                setLastName(event.currentTarget.value);
              }}
            />
            <br />
            <button
              onClick={() => {
                setFirstName(firstName);
                setLastName(lastName);
                createNewGuest();
              }}
            >
              Add guest
            </button>
          </div>
        </div>
        <br />
        <br />
        <br />
        <h2>Guest List</h2>
        {loading ? 'Loading...' : ''}
        <div css={guestListContainer}>
          <ul>
            {guests.map((guest) => {
              return (
                <li key={guest.id}>
                  {guest.firstName} {guest.lastName}{' '}
                  <input
                    type="checkbox"
                    id="attending"
                    checked={guest.attending}
                    // has to be (guest)
                    onChange={(event) =>
                      handleAttending(guest.id, event.currentTarget.checked)
                    }
                  />
                  <label htmlFor="attending">Attending</label>
                  <button
                    onClick={() => {
                      deleteGuest(guest);
                    }}
                  >
                    X
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
