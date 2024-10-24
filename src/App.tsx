import { useEffect, useState } from "react";
import Cart from "./components/Cart/Cart";
import ItemList from "./components/ItemList/ItemList";
import Popup from "./components/Popup/Popup";

interface Item {
  category: string;
  price: number;
  name: string;
  image: {
    desktop: string;
    thumbnail: string;
  };
}

interface itemState {
  [key: number]: { isAdded: boolean; count: number };
}

function App() {
  const [data, setData] = useState<Item[]>([]);
  const [itemState, setItemState] = useState<itemState>({});
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}data.json`);
      const data = await res.json();

      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = Object.values(itemState).reduce(
    (total, current) => total + current.count,
    0
  );

  const totalPrice = data.reduce((total, current, i) => {
    if (itemState[i]?.count > 0) {
      return total + current.price * itemState[i].count;
    }
    return total;
  }, 0);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const savedCartState = localStorage.getItem("cartState");
    if (savedCartState) {
      const parsedState = JSON.parse(savedCartState);
      setItemState(parsedState);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cartState", JSON.stringify(itemState));
    }
  }, [itemState, isLoading]);

  const handleButton = (i: number) => {
    setItemState((prevItem) => {
      return {
        ...prevItem,
        [i]: {
          isAdded: true,
          count: 1,
        },
      };
    });
  };

  const onIcrementClick = (i: number) => {
    setItemState((prevState) => {
      const item = prevState[i];
      return {
        ...prevState,
        [i]: { ...item, count: item.count + 1 },
      };
    });
  };

  const onDecrementClick = (i: number) => {
    setItemState((currentState) => {
      const item = currentState[i];
      if (item.count > 1) {
        return {
          ...currentState,
          [i]: { ...item, count: item.count - 1 },
        };
      } else {
        const newState = { ...currentState };
        delete newState[i];
        return newState;
      }
    });
  };

  const onDeleteItem = (i: number) => {
    setItemState((prevItem) => {
      const newState = { ...prevItem };
      delete newState[i];
      return newState;
    });
  };

  const confirmOrderButtonClick = () => {
    setPopupVisible(true);
  };

  const startNewOrder = () => {
    setPopupVisible(false);
    setItemState({});
  };

  return (
    <main>
      {isPopupVisible && (
        <Popup
          data={data}
          itemState={itemState}
          startNewOrder={startNewOrder}
          totalPrice={totalPrice}
        ></Popup>
      )}
      <div className="container">
        <div className="container-left">
          <h1>Desserts</h1>
          <ItemList
            data={data}
            itemState={itemState}
            handleButton={handleButton}
            onIcrementClick={onIcrementClick}
            onDecrementClick={onDecrementClick}
          ></ItemList>
        </div>
        <div className="container-right">
          <div className="cart-container">
            <Cart
              totalAmount={totalAmount}
              data={data}
              itemState={itemState}
              totalPrice={totalPrice}
              onDeleteItem={onDeleteItem}
              confirmOrderButtonClick={confirmOrderButtonClick}
            ></Cart>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
