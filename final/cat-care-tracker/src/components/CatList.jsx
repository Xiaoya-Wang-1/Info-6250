import React from 'react'
import CatItem from './CatItem'

export default function CatList({
  cats,
  editingCatId,
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
  onTaskInputChange,
  taHeights
}) {
  if (!cats.length) return <p>No cats yet.</p>
  return (
    <ul className="cat-items">
      {cats.map(cat => (
        <CatItem
          key={cat.catId}
          cat={cat}
          isEditing={editingCatId === cat.catId}
          editName={editName}
          setEditName={setEditName}
          editBirthday={editBirthday}
          setEditBirthday={setEditBirthday}
          editWeight={editWeight}
          setEditWeight={setEditWeight}
          editPhotoBase64={editPhotoBase64}
          onFileChange={onFileChange}
          onStartEdit={onStartEdit}
          onCancelEdit={onCancelEdit}
          onSaveEdit={onSaveEdit}
          onDeleteCat={onDeleteCat}
          onAddTask={onAddTask}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          taskInputs={taskInputs}
          onTaskInputChange={onTaskInputChange}
          taHeights={taHeights}
        />
      ))}
    </ul>
  )
}