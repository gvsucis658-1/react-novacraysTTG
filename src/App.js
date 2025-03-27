import './App.css';
import { Link } from 'react-router';
import { useOrigins } from './OriginsContext';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const {origins, setOrigins} = useOrigins();

  const handleDelete = (name) => {
    const originRef = doc(db, 'origins', name);
    deleteDoc(originRef);
    alert("Origin has been deleted successfully.")
  }

  return (
    <div>
    <table>
      <thead>
        <tr>
          <th><h2>Origins:</h2></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {origins.length > 0 ? (
        origins.map(item => (
        <tr key={item.name}>
          <td></td>
          <td><Link to={`/read/${item.name}`}>{item.name}</Link></td>
          <td style={{marginLeft: 5}}><button onClick={() => {handleDelete(item.name)}}>Delete</button></td>
        </tr>
        ))
      ) : (
      <tr>
        <td colSpan="1">Add Origins to see them!</td>
      </tr>
    )}
      <tr><td></td><td><Link to={`/create`}><button>Create</button></Link></td><td></td></tr>
  </tbody>
    </table>

  <br />
  </div>
  );
}

export default App;
