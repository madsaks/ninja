import React from "react";

export const Pokemon = () => {
 

  const searchPokeData = (search: string) => {
    fetch('https://pokeapi.co/api/v2/pokemon/'+ search)
    .then(response => response.json())
    .then(data => console.log(data));
  };

  interface IPokeData {
    name: string
  }
  
  const PokeData = (props: IPokeData) => {
    const { name } = props;
    if(name !== "")
    return (
      <div>
        You searched for: {name}
      </div>
    )
    else return <div>Fail</div>
  }

  
  
  
   let search: string = ""
  return (
    
    <div> 
      <h2>Poke'search!</h2>
      <br />
      <input type="text" value={search} onChange={(e) => {
        search = e.target.value;
      }}></input>
      <button onClick={() => { searchPokeData(search) }}>Search</button>
      <PokeData name={search} />
    </div>
  )
}
