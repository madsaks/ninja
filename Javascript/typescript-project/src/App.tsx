import React, { Dispatch, SetStateAction, useState } from 'react';
import './App.css';



  interface ItemProps {
    // name?: string
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
        <span>
          
        {item.checked ? <s>{item.name}</s> : item.name }
       </span>
        {/* Item name */}
          
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

      </li>)}


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


function SList(props : ISList) {

  return(
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
  const [list, setActiveList] = useState<ISList[]>()
  const [newList, getNewList] = useState<ISList>()

  // setList(list) => void
  
    
    // Begin main app
    
  return (
    <div>
      

      {/* Default one list */}
      {
        defaultList = getNewList([
          setItems(value: IItem[] ),
          setNewItem(value: string),
          newItem,
          items
        ])
      }
      
    
        
      {/* <button onClick={setList}></button> */}
      <SList setItems={setItems} setNewItem={setNewItem} newItem={newItem} items={items} />
      <SList setItems={setItems} setNewItem={setNewItem} newItem={newItem} items={items} />

      
    </div>
    );
}



  export default App;





