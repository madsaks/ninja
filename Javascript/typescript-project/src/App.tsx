import React, { Dispatch, SetStateAction, useState } from 'react';
import './App.css';



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
}

interface ISList {
  
  setItems: (value: IItem[] ) => void
  setNewItem: (value: string) => void
  newItem: string
  items: IItem[]
}

interface TabProps{
  setActiveTab: (value: ISList[]) => void
  getNewList: (value: ISList) => void
  tabIndex?: BigInt
  tabData?: ISList[]
}


function SList(props : TabProps) {

  return (
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
    
    props.tabData?.map(function (tab: TabProps)) {
      <div className="flexbox" id="app">
        <div className="shoppingList">
          <h1>Shopping List</h1>
          <div className="input-wrap">

            <input className="textInput" value={props.tabData.newItem} onChange={(e) => {
              props.tabData.setNewItem(e.currentTarget.value);
            }} />

            <button className="deleteButton" onClick={() => {
              // Changed as it was passing function instead of array
              props.tabData.setItems([...props.tabData.items, { name: props.tabData.newItem, checked: false }])
            }}>Add</button>
          </div>

          <ShoppingList items={props.tabData.items} setItems={props.tabData.setItems} />
        </div>
      </div>
  }
  )
}

function App() {
  //  Define our state holding variables
      
  const [newItem, setNewItem] = useState("")
  const [items, setItems] = useState<IItem[]>([
    
    { name: "Bread", checked: false },
    { name: "Milk", checked: false },
    { name: "Cheese", checked: false }
  ])
  const [list, setActiveTab] = useState<ISList[]>()
  const [newList, getNewList] = useState<ISList>()

  
    
    // Begin main app
    
  return (
    <div>
      

      {/* Default one list */}
      
      
    
        
      {/* <button onClick={setList}></button> */}
      <SList setItems={setItems} setNewItem={setNewItem} newItem={newItem} items={items} />
      <SList setItems={setItems} setNewItem={setNewItem} newItem={newItem} items={items} />

      
    </div>
    );
}



  export default App;





