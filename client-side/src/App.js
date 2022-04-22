import React from 'react';
import './style.css';
import useFetch from './useFetch'
const url = 'https://node-api.hrmeheraj.repl.co/';

export default function App() {
  const [id, setId] = React.useState(5);
  const {data,loading} = useFetch(url+'users');
  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = {name, email};

    fetch('https://node-api.hrmeheraj.repl.co/user', {
      method : "POST",
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify(user)
    })
    .then( res => res.json())
    .then( usersData => {
      const newData = [ ...data, usersData ];
      setData(newData);
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' required placeholder='name' name='name'/>
        <input type='email' required placeholder='email' name='email'/>
        <input type='submit' value='Send User'/>
      </form>
      
      {
        loading && <h2> Loading... </h2> 
      }
      <ul>
        {
          data?.map(each => {
            return (
              <li key={each.id}> 
                {each.name}
                <button onClick={() => setId(id)}> Learn More </button>
              </li>
            )
          })
        }

        </ul>
      {/* <h2>Welcome to React!</h2>
      <ViewMore id={id}/> */}
    </div>
  );
}


const ViewMore = (props) => {
  const id = parseInt(props.id);
  const userURl  = `${id}`;
  const {data,loading} = useFetch('https://node-api.hrmeheraj.repl.co/user/'+id);
  console.assert(userURl);
  console.log(data);
  return(
    <div>
       {
         loading ? <h2> Loaing user...</h2> : (
           <>
            <h2> name : {data.name} </h2>
           <strong> Email : {data.email} </strong><br/>
        <strong> <i> Phone : {data?.phone} </i></strong>    
          </>
         )
       }
    </div>
  )
}