import axios from "axios"
import {  useEffect, useState } from "react"
import { CiTrash } from "react-icons/ci"
import { MdEditSquare } from "react-icons/md"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface User{
  id: number;
  image:string;
  firstName:string;
  lastName:string;
  email:string;
  phone:number;
  birthDate: string;

}

export default function UsersList() {
  let navigate=useNavigate();
  // modal
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState<null | number>(null);
    let[userData,setUserData]=useState<User | null>(null)

  const handleClose = () => setShow(false);

  const handleShow = (user:User) => {
    setUserId(user.id)
    setShow(true);
    setUserData(user)
  }


  let[users,setUsers]=useState<User[]>([])
 

  let deleteUser=async()=>{
    try {
      await axios.delete(`https://dummyjson.com/users/${userId}`)
      handleClose()
      toast.success('user Deleted successfully')
      getUsers()
    } catch (error) {
      toast.error('faileddddddddddddd!!!!!!')
    }
  }

  let getUsers=async()=>{
    try {
      let response=await axios.get('https://dummyjson.com/users')
      setUsers(response?.data?.users ||[])
    } catch (error) {
      console.log(error)
    }
  }
  let moveToAddUserPage=()=>{
    navigate('/dashboard/add-user')
  }

  useEffect(()=>{
    getUsers()
  },[])

  return (
    <div>
      <div className="d-flex justify-content-between mx-2">
        <h3>Users List</h3>
        <button onClick={moveToAddUserPage} className="btn btn-warning text-white">Add new user</button>
      </div>
<hr/>
<table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col"></th>
      <th scope="col">FirstName</th>
      <th scope="col">LastName</th>
      <th scope="col">Email</th>
      <th scope="col">phone</th>
      <th scope="col">BirthDate</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
   {users.map((user)=>(
     <tr key={user.id}>
      <th scope="row">{user.id}</th>
      <td><img src={user.image} className="w-25"/></td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user?.birthDate}</td>
      <td>
        <MdEditSquare size={25} className="text-warning mx-2" />
        <CiTrash size={30} className="text-danger " onClick={()=>handleShow(user)} />
      </td>
    </tr>
   ))}
   
  </tbody>
</table>
 <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm deleting {userData?.firstName} {userData?.lastName}??????</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
