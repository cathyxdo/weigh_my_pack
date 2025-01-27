import axiosInstance from "../axios";
import { useState, useEffect, useRef } from "react";

export default function Item({
  item,
  apiList,
  setApiList,
  selectedIndex,
  categoryId,
  isValidItem,
  isLoggedIn,
}) {
  const [editing, setEditing] = useState(false);
  const modalRef = useRef(null); 

  const defaultItemData = {
    name: item.name,
    description: item.description ? item.description : "",
    weight: item.weight,
    weight_uom: item.weight_uom,
    qty: item.qty,
    link: item.link ? item.link : "",
  };
  const [itemData, setItemData] = useState(defaultItemData);
  function handleChange(event) {
    setItemData({
      ...itemData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isLoggedIn) {
      axiosInstance
        .patch(
          process.env.REACT_APP_API_BASE_URL + "items/" + item.id + "/",
          itemData
        )
        .then((result) => {
          updateStateEditItem();
          setEditing(false);
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      updateStateEditItem();
      localStorage.setItem("localList", JSON.stringify(apiList));
      setEditing(false);
    }

    function updateStateEditItem() {
      setApiList(
        apiList.map((list, index) => {
          if (index === selectedIndex) {
            list.categories.map((c) => {
              if (c.id === categoryId) {
                c.items.map((i) => {
                  if (i.id === item.id) {
                    i.name = itemData.name;
                    i.description = itemData.description;
                    i.weight = itemData.weight;
                    i.weight_uom = itemData.weight_uom;
                    i.qty = itemData.qty;
                    i.link = itemData.link;
                    return i;
                  } else {
                    return i;
                  }
                });
                return c;
              } else {
                return c;
              }
            });
            return list;
          } else {
            return list;
          }
        })
      );
    }
  }

  function handleDelete(event) {
    event.preventDefault();

    if (isLoggedIn) {
      axiosInstance
        .delete("/items/" + item.id + "/")
        .then((result) => {
          updateStateDeleteItem();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      updateStateDeleteItem();
      localStorage.setItem("localList", JSON.stringify(apiList));
    }

    function updateStateDeleteItem() {
      setApiList(
        apiList.map((list, index) => {
          if (index === selectedIndex) {
            list.categories.map((c) => {
              if (c.id === categoryId) {
                c.items = c.items.filter((i) => i.id !== item.id);
                return c;
              } else {
                return c;
              }
            });
            return list;
          } else {
            return list;
          }
        })
      );
    }
  }
  function closeModal() {
    setEditing(false);
    setItemData(defaultItemData);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    if (editing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editing]);

  return (
    <>
      <div className="tablerow">
        <div className="name">
          {!item.link && item.name}
          {item.link && (
            <a href={item.link} target="_blank">
              {item.name}
            </a>
          )}
        </div>
        <div className="desc">{item.description}</div>
        <div className="weight">{item.weight + " " + item.weight_uom}</div>
        <div className="qty">{item.qty}</div>
        <div className="editmode">
          <button className="edit" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button className="delete" onClick={handleDelete} title="Delete Item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"></path>
            </svg>
          </button>
        </div>
      </div>

      {editing && (
        <div className="modal-background">
          <div className="modal-wrapper" ref={modalRef}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Edit Item</h3>
              </div>
              <form className="modal-content edit-content">
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={itemData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={itemData.description}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Link:</label>
                  <input
                    type="url"
                    name="link"
                    value={itemData.link}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Weight:</label>
                  <input
                    type="number"
                    name="weight"
                    value={itemData.weight}
                    onChange={handleChange}
                  />
                  <div>
                    <select
                      name="weight_uom"
                      className="uom-dropdown"
                      value={itemData.weight_uom}
                      onChange={handleChange}
                    >
                      <option value="oz">oz</option>
                      <option value="lb">lb</option>
                      <option value="g">g</option>
                      <option value="kg">kg</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    name="qty"
                    value={itemData.qty}
                    onChange={handleChange}
                  />
                </div>
              </form>
              <div className="modal-footer">
                <button
                  className="primary-button"
                  type="submit"
                  disabled={isValidItem(itemData) ? false : true}
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
