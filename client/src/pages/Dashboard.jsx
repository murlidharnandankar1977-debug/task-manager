import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });


  // GET TASKS
  useEffect(() => {
    fetchTasks();
  }, []);


  const fetchTasks = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);

    } catch (error) {
      console.log(error);
    }
  };



  // ADD TASK
  const handleAddTask = async () => {

    if (!newTask.title || !newTask.description) return;

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setTasks([
        ...tasks,
        response.data.task,
      ]);


      setNewTask({
        title: "",
        description: "",
        status: "Pending",
      });


      setShowModal(false);


    } catch (error) {
      console.log(error);
    }
  };



  // DELETE TASK
  const handleDeleteTask = async (id) => {

    try {

      const token = localStorage.getItem("token");


      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );


      setTasks(
        tasks.filter(
          (task)=> task._id !== id
        )
      );


    } catch(error){
      console.log(error);
    }
  };



  // OPEN EDIT
  const handleEditTask = (id)=>{

    const task = tasks.find(
      (task)=> task._id === id
    );


    setEditingTask(task);


    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
    });


    setShowModal(true);

  };




  // UPDATE TASK
  const handleUpdateTask = async()=>{

    try{

      const token = localStorage.getItem("token");


      const response = await axios.put(
        `http://localhost:5000/api/tasks/${editingTask._id}`,
        newTask,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );


      setTasks(
        tasks.map((task)=>
          task._id === editingTask._id
          ? response.data.task
          : task
        )
      );


      setEditingTask(null);


      setNewTask({
        title:"",
        description:"",
        status:"Pending",
      });


      setShowModal(false);



    }catch(error){
      console.log(error);
    }

  };



  return (
    <>
      <Navbar />


      <div className="max-w-5xl mx-auto p-6">


        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            My Tasks
          </h1>


          <button
            onClick={()=>{
              setEditingTask(null);

              setNewTask({
                title:"",
                description:"",
                status:"Pending",
              });

              setShowModal(true);
            }}

            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>


        </div>




        <div className="grid md:grid-cols-2 gap-4">

          {
            tasks.map((task)=>(

              <TaskCard

                key={task._id}

                id={task._id}

                title={task.title}

                description={task.description}

                status={task.status}

                onDelete={handleDeleteTask}

                onEdit={handleEditTask}

              />

            ))
          }


        </div>



      </div>





      {
        showModal && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">


            <div className="bg-white p-6 rounded-lg w-96">


              <h2 className="text-xl font-bold mb-4">

                {
                  editingTask
                  ? "Edit Task"
                  : "Add New Task"
                }

              </h2>



              <input

                type="text"

                placeholder="Task Title"

                value={newTask.title}

                onChange={(e)=>
                  setNewTask({
                    ...newTask,
                    title:e.target.value
                  })
                }

                className="w-full border p-2 mb-3 rounded"

              />




              <textarea

                placeholder="Description"

                value={newTask.description}

                onChange={(e)=>
                  setNewTask({
                    ...newTask,
                    description:e.target.value
                  })
                }

                className="w-full border p-2 mb-3 rounded"

              />




              <select

                value={newTask.status}

                onChange={(e)=>
                  setNewTask({
                    ...newTask,
                    status:e.target.value
                  })
                }

                className="w-full border p-2 mb-3 rounded"

              >

                <option>Pending</option>

                <option>In Progress</option>

                <option>Completed</option>


              </select>




              <div className="flex justify-end gap-2">


                <button

                  onClick={()=>{
                    setShowModal(false);
                    setEditingTask(null);
                  }}

                  className="bg-gray-500 text-white px-4 py-2 rounded"

                >
                  Cancel

                </button>




                <button

                  onClick={
                    editingTask
                    ? handleUpdateTask
                    : handleAddTask
                  }

                  className="bg-green-600 text-white px-4 py-2 rounded"

                >

                  {
                    editingTask
                    ? "Update"
                    : "Add"
                  }

                </button>


              </div>



            </div>


          </div>

        )
      }


    </>
  );
}


export default Dashboard;