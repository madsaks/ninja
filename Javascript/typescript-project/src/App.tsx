import React, { useState } from "react";
import "./App.css"


<<<<<<< HEAD

  interface ItemProps {
    name?: string
    setItem: (item: IItem) => void
    item: IItem
    del: () => void

  }


  function ShoppingListItem({ item, del, setItem }: ItemProps) {
   
    
    if (!item) {
      return null
    }
    return (
      <li >
        {/* Item name */}
        <span>
          {item.checked ? <s>{item.name}</s> : item.name }
        </span>
        
        {/* Delete button */}
        <span>
          <button
            onClick={() => { del() }}>Delete
          </button>
          {/* Need to add item.checked function */}
          <input type="checkbox" checked={item.checked} onChange={() => {
            setItem({
              ...item,
              checked: !item.checked
            })
          }}/>
        </span>
      </li>)
  }


  interface ListProps {
    items: IItem[]
    setItems: (value: IItem[]) => void
  }




function ShoppingList(props: ListProps) {
    const {setItems, items} = props
    return (
      <ul className="shopping-list">
        {items.map(function (item: IItem) {
          
          // <ShoppingListItem item=IItem setItem=(IItem) => {} del=() =>
          
          return <ShoppingListItem
            // key={name}
            item={item}
            setItem={(newItem: IItem) => {
              const index = items.indexOf(item)
              let newItems = [...items]
              newItems[index] = newItem
              setItems(newItems)
            }}
            del={() => {
              const updatedArray = props.items.filter((val) => {
                return item !== val
              })
            props.setItems(updatedArray)
            }}        
          
          />
        })}
      </ul>
    )
  }

interface IItem {
  name: string,
  checked: boolean
=======
const upperFirst = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
>>>>>>> 544a0952b42e1973899e03f5b218346a4c0b2fdd
}

interface List {
  name: string;
  items: Item[];
}

interface Item {
  name: string;
  checked: boolean;
}

<<<<<<< HEAD

function SList(props : ISList) {

    // Need code to replicate SList in the same way that shopping list was
    // {items.map(function (item: IItem) {
    //   return <ShoppingListItem
    //     // key={name}
    //     item={item}
    //     setItem={(newItem: IItem) => {
    //       const index = items.indexOf(item)
    //       let newItems = [...items]
    //       newItems[index] = newItem
    //       setItems(newItems)
    //     }}
    //     del={() => {
    //       const updatedArray = props.items.filter((val) => {
    //         return item !== val
    //       })
    //     props.setItems(updatedArray)
    //     }}        
    
    return (
      
      
      
      
      
      <div className="flexbox" id="app">
            <div className="shoppingList">
              <h1>Shopping List</h1>
              <div className="input-wrap">
  
              <input className="textInput" value={props.newItem} onChange={(e) =>  {
                props.setNewItem(e.currentTarget.value);
              }} />
  
            <button className="deleteButton" onClick={() => {
              // Changed as it was passing function instead of array
              props.setItems([...props.items, { name: props.newItem, checked: false }])
              }}>Add</button>
              </div>
  
              <ShoppingList items={props.items} setItems={props.setItems} />
            </div>
      </div>
    )}

=======
// this should be its own component
interface ListProps {
  activeList: List
  state: List[]
  // Varible needs a name for some reason
  setState: (state: List[]) => void
  activeTab: string
  isChecked: boolean 
  setChecked: (arg0: boolean) => void
}
>>>>>>> 544a0952b42e1973899e03f5b218346a4c0b2fdd

// List component ------------------------------------------------------------------------------------------------
const List = (props: ListProps) => {
  console.log("In listElement", props.activeList);
  
  
  const itemDelHandler = (name: string) => {
    console.log("itemDelHandler called")
    
    
<<<<<<< HEAD
  return (
    <div>
      

      {/* Default one list */}
      <button>List 1</button>
      <button>List 2</button>
      <button>List 3</button>
      
      const List1: ISList = {
        setItems: setItems(),
      set
      } 

      <SList setItems={List1.setItems} setNewItem={List1.setNewItem} newItem={List1.newItem} items={List1.items} />
=======
    // Copies state into temp state
    const tempState = props.state.map((el) => {
      if (el.name !== props.activeTab)
        return el
>>>>>>> 544a0952b42e1973899e03f5b218346a4c0b2fdd
    
      const templist = el.items.filter(
        (item: any) => {
          return item.name !== name;
        }
      );
        
<<<<<<< HEAD
      {/* <button onClick={setList}></button> */}

      
      

      
=======
      return {
        name: el.name,
        items: templist
      }
    })
    
    props.setState(tempState)
>>>>>>> 544a0952b42e1973899e03f5b218346a4c0b2fdd

  };

  const checkHandler = (name: string) => {
    var tempState = props.state.map((l: any) => { return l });
    // find index of list with name matching activeTab
    const i = tempState.findIndex((i: any) => { return i.name === props.activeTab })

    const i2 = tempState[i].items.findIndex((i: any) => { return i.name === name })

    tempState[i].items[i2].checked = !tempState[i].items[i2].checked;

        
    
    // Update checked
    // tempState[i].items.
    props.setState(tempState)
    
  }
  return (
    <div className="w3-container">
      {props.activeList.items.map((el) => {
        
        let item: any;
        let upperCase = upperFirst(el.name)
        el.checked ? item = <s>{upperCase}</s> : item = upperCase
      
        
        return (
          
            <li>
              <h3>{item}</h3>

              {/* If eventhandler onChange used then this is run on all lists */}
              <input type="checkbox" checked={el.checked} onClick={() => { checkHandler(el.name) }} />
              <button  onClick={() => { itemDelHandler(el.name) }}>
                <i className="material-icons">delete</i>
            </button>
            <br />
            </li>
            
          
        );
      })}
    </div>
  );
};

// Main app entry -----------------------------------------------------------------------------------------------------------
const App = () => {
  // get checked items name
  const [isChecked, setChecked] = useState<boolean>(false);
  const [newList, setNewList] = useState<string>("New Tab");
  // If default activelist not set then redering fails
  const [activeTab, setActiveTab] = useState<string>("Groceries");
  const [newItem, setNewItem] = useState<string>("");
  const [state, setState] = useState<List[]>([
    {
      name: "Groceries",
      items: [{ name: "milk", checked: false }]
    },
    {
      name: "Drinks",
      items: [{ name: "bread", checked: true }]
    }
  ]);
 

  const activeList = state.find((el) => {
    return el.name === activeTab;
  });

  const addListToState = () => {
    let newState = state.map((el) => {
      return el;
    });
    newState.push({ name: newList, items: [] });
    setState(newState);
  };
  if (!activeList) {
    return <div><h2>Can't find default list!</h2>></div>;
  }

  // Take (item) and add to current list (activeList)
  const addNewListItem = () => {
    console.log("Inside addNewListItem, activeList = ", activeList);
    // Copies state into temp state
    const tempState = state.map((l) => { return l });
    // find index of list with name matching activeTab
    const i = tempState.findIndex((i) => { return i.name === activeTab })
    
    // Push 
    tempState[i].items.push({ name: newItem, checked: false });
    setState(tempState)
    console.log(newItem);
    
  };

  return (
    <div>
      {/* Display List Buttons */}
      {state.map((tab) => (
        <button
          onClick={(e) => {
            setActiveTab(tab.name);
          }}
        >
          {tab.name}
        </button>
      ))}
      {/* New List Button */}
      {/* how did you know to use on change on input form and not via click */}
      <input
        type="text"
        onChange={(e) => {
          setNewList(e.currentTarget.value);
        }}
      />
      <button onClick={addListToState}>New List</button>

      <div className="w3-padding w3-xlarge w3-teal">
      <h1>{activeList.name}</h1>

        {/* Add new Item to list */}
      <div className="addItem">
      <input
        type="text"
        onChange={(e) => {
          setNewItem(e.currentTarget.value);
        }}
      />
      <button className="w3-btn w3-orange" onClick={addNewListItem}>add</button>
        </div>
        </div>

      {/* Begin List */}
      <ul>
        <List state={state} setState={setState} activeList={activeList} activeTab={activeTab} isChecked={isChecked} setChecked={setChecked} />
      </ul>
    </div>
  );
};

export default App;
