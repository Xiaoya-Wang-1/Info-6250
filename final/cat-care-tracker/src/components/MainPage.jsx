// src/components/MainPage.jsx
import React from 'react'
import Navigation from './Navigation'
import AddCatForm from './AddCatForm'
import CatList from './CatList'

export default function MainPage({
  loggedInUser,
  showAddCat,
  toggleShowAddCat,
  onLogout,
  errorMsg,
  catName,
  setCatName,
  catBirthday,
  setCatBirthday,
  catWeight,
  setCatWeight,
  catPhotoBase64,
  catFileKey,
  onNewCatFile,
  addCat,
  cats,
  deleteCat,
  editingCatId,
  editName,
  setEditName,
  editBirthday,
  setEditBirthday,
  editWeight,
  setEditWeight,
  editPhotoBase64,
  onEditCatFile,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  taskInputs,
  taHeights,
  onTaskInputChange,
  onAddTask,
  onToggleTask,
  onDeleteTask
}) {
  return (
    <div className="main-page">
      <Navigation
        loggedInUser={loggedInUser}
        showAddCat={showAddCat}
        toggleShowAddCat={toggleShowAddCat}
        onLogout={onLogout}
      />

      {/* 只有在不编辑任何 cat 时，才显示“Add New Cat” */}
      {showAddCat && editingCatId === null && (
        <AddCatForm
          catName={catName}
          setCatName={setCatName}
          catBirthday={catBirthday}
          setCatBirthday={setCatBirthday}
          catWeight={catWeight}
          setCatWeight={setCatWeight}
          catPhotoBase64={catPhotoBase64}
          catFileKey={catFileKey}
          onFileChange={onNewCatFile}
          onAddCat={addCat}
          errorMsg={errorMsg}
        />
      )}

      <h3>My Cats</h3>
      <CatList
        cats={cats}
        editingCatId={editingCatId}
        editName={editName}
        setEditName={setEditName}
        editBirthday={editBirthday}
        setEditBirthday={setEditBirthday}
        editWeight={editWeight}
        setEditWeight={setEditWeight}
        editPhotoBase64={editPhotoBase64}
        onFileChange={onEditCatFile}
        onStartEdit={onStartEdit}
        onCancelEdit={onCancelEdit}
        onSaveEdit={onSaveEdit}
        onDeleteCat={deleteCat}
        onAddTask={onAddTask}
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
        taskInputs={taskInputs}
        onTaskInputChange={onTaskInputChange}
        taHeights={taHeights}
      />
    </div>
  )
}