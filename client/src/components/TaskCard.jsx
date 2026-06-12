function TaskCard({
  id,
  title,
  description,
  status,
  onDelete,
  onEdit,
}){
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="text-gray-600 mt-2">
        {description}
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded">
          {status}
        </span>
       <div className="flex gap-2">
      <button
    onClick={() => onEdit(id)}
    className="bg-blue-500 text-white px-3 py-1 rounded"
      >
    Edit
  </button>

  <button
    onClick={() => onDelete(id)}
    className="bg-red-500 text-white px-3 py-1 rounded"
  >
    Delete
  </button>
</div>
       </div>
    </div>
  );
}

export default TaskCard;