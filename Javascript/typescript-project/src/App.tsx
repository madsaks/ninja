import React, { useState } from "react";
import "./App.css"


const upperFirst = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface List {
  name: string;
  items: Item[];
}

interface Item {
  name: string;
  checked: boolean;
}

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

// List component ------------------------------------------------------------------------------------------------
const List = (props: ListProps) => {
  console.log("In listElement", props.activeList);
  
  
  const itemDelHandler = (name: string) => {
    console.log("itemDelHandler called")
    
    
    // Copies state into temp state
    const tempState = props.state.map((el) => {
      if (el.name !== props.activeTab)
        return el
    
      const templist = el.items.filter(
        (item: any) => {
          return item.name !== name;
        }
      );
        
      return {
        name: el.name,
        items: templist
      }
    })
    
    props.setState(tempState)

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
