import React, { useState } from "react";
const Tolist = () => {
  const [items, setItems] = useState([]);

  // Use the useState hook to create a state object for the input field value
  const [valueTo, setValue] = useState("");

  // Define a function that adds a new item to the state array
  const addItem = (event) => {
    event.preventDefault();
    setItems([...items, valueTo]);
    setValue("");
  };

  // Define a function that removes an item from the state array
  const removeItem = (index) => {
    setItems(items.filter((item, i) => i !== index));
  };

  return (
    <div>
      <form onSubmit={addItem}>
        <input
          type="text"
          value={valueTo}
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            {/* <button onClick={() => removeItem(index)}>Remove</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tolist;


// const [page, setPage] = useState(0);
//   const [modelName, setModelName] = useState("");
//   const [fetchCustomModelData, setFetchCustomModelData] = useState();
//   const [delModuels, setDelModuels] = useState("");
// const add = async () => {
//   await axios
//     .post("/custom-model", {
//       customModelName: modelName,
//     })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// const FetchAllCutsomModels = async () => {
//   await axios
//     .get("/custom-model")
//     .then((res) => {
//       console.log(res);
//       setFetchCustomModelData(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// useEffect(() => {
//   FetchAllCutsomModels();
// }, []);
// const DeleteAllCutsomModels = async (props) => {
//   console.log(props);
//   await axios
//     .delete(`/custom-model/${props}`)
//     .then((res) => {
//       console.log(res);
//       setDelModuels(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
