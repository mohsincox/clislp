import React, { useEffect, useState } from "react";

/**
 * https://stackoverflow.com/questions/66434403/how-to-get-multiple-checkbox-values-in-react-js
 */

const data = [
  {
    id: "1",
    name: "Jane",
    lastName: "Doe",
    age: "25",
  },
  {
    id: "2",
    name: "James",
    lastName: "Doe",
    age: "40",
  },
  {
    id: "3",
    name: "Alexa",
    lastName: "Doe",
    age: "27",
  },
  {
    id: "4",
    name: "Jane",
    lastName: "Brown",
    age: "40",
  },
];

export default function Test3() {
  const [peopleInfo, setPeopleInfo] = useState([]);

  useEffect(() => {
    console.log(peopleInfo);
  }, [peopleInfo]);

  return (
    <div className="App">
      {data.map((item, index) => {
        return (
          <div key={index}>
            <input
              onChange={(e) => {
                // add to list
                if (e.target.checked) {
                  setPeopleInfo([
                    ...peopleInfo,
                    {
                      id: item.id,
                      first: item.name,
                      last: item.lastName,
                      age: item.age,
                    },
                  ]);
                } else {
                  // remove from list
                  setPeopleInfo(
                    peopleInfo.filter((people) => people.id !== item.id)
                  );
                }
              }}
              value={item.id}
              style={{ margin: "20px" }}
              type="checkbox"
            />
            <span>{item.name}</span>
          </div>
        );
      })}
    </div>
  );
}
