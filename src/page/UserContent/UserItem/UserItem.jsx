import React from 'react';
import phoneMasking from '../../../utils/phoneMasking';

const UserItem = ({ user }) => {
  return (
    <div className="w-full flex justify-between p-4">
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.gender_origin}</div>
      <div>{user.birth_date}</div>
      <div>{phoneMasking(user.phone_number)}</div>
      <div>{user.last_login}</div>
      <div>{user.created_at}</div>
    </div>
  );
};

export default UserItem;
