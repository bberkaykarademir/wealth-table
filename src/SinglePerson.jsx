import React from "react";

const SinglePerson = ({ person }) => {
  return (
    <h3>
      {person.name} <span>{person.wealth}$</span>
    </h3>
  );
};

export default SinglePerson;
