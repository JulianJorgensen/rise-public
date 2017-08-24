import React from 'react';
import { Dropdown } from 'react-toolbox/lib';
import classes from './index.css';

const AssignAthlete = ({ handleSelectedAthlete, assignedAthletes, selectedAthlete }) => {
  return (
    <Dropdown
      auto
      onChange={handleSelectedAthlete}
      source={assignedAthletes}
      value={selectedAthlete}
      label="Athlete"
      required
    />
  )
};

export default AssignAthlete;
