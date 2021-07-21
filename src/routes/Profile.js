import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState('');

  const onLogoutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const getMyNweets = async () => {
    const nweets = await dbService.collection('nweets').where('creatorId', '==', userObj.uid).get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };
  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display name" value={newDisplayName} onChange={onChange} />
        <input type="submit" value="Update profile" />
      </form>
      <button onClick={onLogoutClick}>Log Out</button>
    </>
  );
};
