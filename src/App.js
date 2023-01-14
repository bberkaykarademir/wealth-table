import React, { useEffect, useState } from "react";
import SinglePerson from "./SinglePerson";

const App = () => {
  const [people, setPeople] = useState([]);
  const [total, setTotal] = useState(0);
  const [seeTotal, setSeeTotal] = useState(false);
  const getRandomUser = async () => {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();
    console.log(data.results[0].name.first + " " + data.results[0].name.last);
    setPeople([
      ...people,
      {
        name: data.results[0].name.first + " " + data.results[0].name.last,
        wealth: +Math.floor(Math.random() * 1000000),
      },
    ]);
  };
  const doubleMoney = () => {
    setPeople(
      people.map((person) => {
        return { ...person, wealth: person.wealth * 2 };
      })
    );
  };

  const filterMillionaires = () => {
    setPeople(people.flatMap((o) => (o.wealth > 1000000 ? o : [])));
  };

  const sortWealth = () => {
    const sortedPeople = people.sort((a, b) => b.wealth - a.wealth);
    setPeople(
      sortedPeople.map((person) => {
        return { ...person };
      })
    );
  };

  const calculateTotal = () => {
    const wealthArray = new Array(people.map((person) => person.wealth));
    const totals = wealthArray[0].reduce((acc, num) => {
      return acc + num;
    }, 0);
    console.log(total);
    setTotal(totals);
  };

  useEffect(() => {
    calculateTotal();
  }, [people]);

  const handleCalculate = () => {
    setSeeTotal(!seeTotal);
    const wealthArray = new Array(people.map((person) => person.wealth));
    const totals = wealthArray[0].reduce((acc, num) => {
      return acc + num;
    }, 0);
    setTotal(totals);
  };

  return (
    <div>
      <h1>Wealth Table</h1>
      <div className="content">
        <div className="buttonsec">
          <button onClick={getRandomUser}>Add User</button>
          <button onClick={doubleMoney}>Double Money</button>
          <button onClick={filterMillionaires}>Show Only Millionaires</button>
          <button onClick={sortWealth}>Sort by Richest</button>
          <button onClick={handleCalculate}>Calculate Entire Wealth</button>
          {seeTotal ? <p>{total ? "Total:" + total + "$" : null}</p> : null}
        </div>
        <div className="people">
          <h2>
            <strong>Person</strong>Wealth
          </h2>
          {people.map((person, index) => (
            <SinglePerson person={person} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
