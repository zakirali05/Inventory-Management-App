import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // const a = ["a", "b", "c", "d"];
  const [products, setProducts] = useState([]);
  // const [z, setZ] = useState(0);
  const [p, setP] = useState(0);
  const [z, setZ] = useState(0);

  // products.forEach((product) => {
  //   z = z + Object.values(product)[3];
  //   setZ(z);
  //   // console.log(Object.values(product)[3]);
  // });
  // // console.log(z);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState();
  const [quantity, setQuantity] = useState();
  useEffect(() => {
    axios(`http://localhost:3001/products`).then((response) =>
      setProducts(response.data)
    );
  }, [products]);
  const add = () => {
    axios.post("http://localhost:3001/product/new", {
      title,
      amount,
      quantity,
    });
    setZ(Number(z) + Number(quantity));
    setP(Number(p) + Number(amount));
    setTitle("");
    setAmount("");
    setQuantity("");
  };

  const del = (id) => {
    axios.delete(`http://localhost:3001/product/delete/${id}`);

    // console.log(id);
    products.forEach((p) => {
      if (Object.values(p)[0] == id) {
        zz = Object.values(p)[2];
        pp = Object.values(p)[3];
      }
    });
    setZ(Number(z) - Number(zz));
    setP(Number(p) - Number(pp));
  };

  // products.forEach((p) => (p = p + Object.values(p)[4]));
  // setP(p);
  // products.forEach((p) => (z = z + Object.values(p)[3]));
  // setZ(z);
  return (
    <div className="App flex flex-col h-[100vh] w-[100vw] items-center justify-center">
      <div className="container bg-blue-100 h-[100%] w-[100%] ">
        <h1
          align="center"
          className="py-3 font-bold font-mono text-4xl text-blue-400  cursor-pointer"
        >
          Inventory Management
        </h1>
        <div className="experiment mt-4 mb-8  justify-around  h-[150px] flex w-[100%]">
          <div className="one bg-green-300 justify-around  font-bold font-mono  rounded-[30px] flex flex-col items-center    min-w-[200px]  max-w-[200px]  h-[100%]">
            <h1>Items you own</h1>
            <p className="font-semibold text-xl text-slate-700 ">
              {products.length} categories
            </p>
          </div>
          <div className="two  bg-green-300 justify-around  font-bold font-mono  rounded-[30px] flex flex-col items-center     min-w-[200px]  max-w-[200px]  h-[100%]">
            <h1>Total stock</h1>
            <p className="font-semibold text-xl text-slate-700 ">{z} items</p>
          </div>
          <div className="three bg-green-300 justify-around  font-bold font-mono   rounded-[30px] flex flex-col items-center     min-w-[200px]  max-w-[200px]  h-[100%]">
            <h1>Money you spend</h1>
            <p className="font-semibold text-xl text-slate-700 ">{p} rs</p>
          </div>
        </div>

        <div className="topwrap  mt-12 mb-3 flex items-center justify-center w-[100%]">
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 m-2 rounded-md"
            type="text"
            placeholder=" product title"
            value={title}
          />
          <input
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 m-2 rounded-md"
            type="number"
            placeholder="product price"
            value={amount}
          />
          <input
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 m-2 rounded-md"
            type="number"
            placeholder="stock"
            value={quantity}
          />
          <button
            onClick={() => add()}
            className="bg-green-500 px-3 py-2 rounded-md text-white font-bolder hover:bg-green-300"
          >
            Add Product
          </button>
        </div>

        <div className="products flex flex-col items-center justify-center">
          {products
            .slice(0)
            .reverse()
            .map((val) => {
              return (
                <div
                  key={val._id}
                  className="product bg-blue-200  px-2 py-1 flex rounded-md  "
                >
                  <h1 className="flex-grow min-w-[200px] max-w-[200px] flex items-center justify-center text-slate-600 font-bold font-mono py-3 my-4  rounded-md px-2 mx-3 bg-blue-300">
                    {val.title}
                  </h1>
                  <h1 className="flex-grow min-w-[200px] max-w-[200px] flex items-center justify-center text-slate-600 font-bold font-mono py-3  my-4 rounded-md px-2 mx-3 bg-blue-300">
                    {val.amount}
                  </h1>
                  <h1 className="flex-grow flex min-w-[200px] max-w-[200px]  items-center justify-center text-slate-600 font-bold font-mono py-3  my-4 rounded-md px-2 mx-3 bg-blue-300">
                    {val.quantity}
                  </h1>
                  <h1 className="flex-grow  min-w-[300px] max-w-[300px] flex items-center justify-center text-slate-600 font-bold font-mono py-3 my-4  rounded-md px-2 mx-3 bg-blue-300">
                    {val.addedon.split("T")[0]}
                  </h1>
                  <button
                    onClick={() => del(val._id)}
                    className="bg-red-500 w-[100px] px-0 py-2 m-3 rounded-md text-white font-bolder hover:bg-blue-300"
                  >
                    Del
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
