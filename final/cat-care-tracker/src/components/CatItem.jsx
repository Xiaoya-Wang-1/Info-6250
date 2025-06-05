import React, { useState, useEffect } from 'react'
import { computeAgeFromBirthday } from '../utils'
import CatEditForm from './CatEditForm'

export default function CatItem({
  cat,
  isEditing,
  editName,
  setEditName,
  editBirthday,
  setEditBirthday,
  editWeight,
  setEditWeight,
  editPhotoBase64,
  onFileChange,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDeleteCat,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  taskInputs,
  onTaskInputChange
}) {
  const [rows, setRows] = useState(1)

  useEffect(() => {
    if (!taskInputs[cat.catId]) {
      setRows(1)
    }
  }, [taskInputs, cat.catId])

  function handleTaskChange(e) {
    const text = e.target.value
    onTaskInputChange(cat.catId, text, e.target)
    const lineCount = text.split('\n').length
    setRows(Math.min(Math.max(lineCount, 1), 10))
  }

  return (
    <li className="cat-item">
      {isEditing ? (
        <CatEditForm
          cat={cat}
          editName={editName}
          setEditName={setEditName}
          editBirthday={editBirthday}
          setEditBirthday={setEditBirthday}
          editWeight={editWeight}
          setEditWeight={setEditWeight}
          editPhotoBase64={editPhotoBase64}
          onFileChange={onFileChange}
          onSave={() => onSaveEdit(cat.catId)}
          onCancel={onCancelEdit}
        />
      ) : (
        <div className="cat-information">
          <div className="cat-name-photo">
            <img
              src={cat.photoUrl || '../public/default.png'}
              alt="cat"
              className="cat-photo"
            />
            <div className="cat-names">
              <strong>{cat.name}</strong>
              <div>Birthday: {cat.birthday || ''}</div>
              <div>Age: {computeAgeFromBirthday(cat.birthday)}</div>
              <div>Weight: {cat.weight} lb</div>
            </div>
          </div>
          <div className="cat-buttons">
            <button onClick={() => onStartEdit(cat)}>Modify</button>
            <button onClick={() => onDeleteCat(cat.catId)}>Delete Cat</button>
          </div>
        </div>
      )}

      <div className="task-section">
        <h4>Tasks</h4>
        <p className="subtext">If done, click text to cross it out!</p>
        <ul className="tasks">
          {cat.tasks.map(task => (
            <li key={task.taskId} className={task.done ? 'task-done' : ''}>
              <span
                onClick={() =>
                  onToggleTask(cat.catId, task.taskId, task.done)
                }
              >
                {task.title}
              </span>
              <button onClick={() => onDeleteTask(cat.catId, task.taskId)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="new-task">
          <label htmlFor={`new-task-${cat.catId}`}>New Task:</label>
          <textarea
            id={`new-task-${cat.catId}`}
            className="task-textarea"
            placeholder="e.g. Bath, Vaccination"
            value={taskInputs[cat.catId] || ''}
            onChange={handleTaskChange}
            rows={rows}
          />
          <button onClick={() => onAddTask(cat.catId)}>Add Task</button>
        </div>
      </div>
    </li>
  )
}