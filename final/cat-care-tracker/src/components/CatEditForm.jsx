import React from 'react'

export default function CatEditForm({
  cat,
  editName,
  setEditName,
  editBirthday,
  setEditBirthday,
  editWeight,
  setEditWeight,
  editPhotoBase64,
  onFileChange,
  onSave,
  onCancel
}) {
  return (
    <div className="cat-edit-form">
      <h3>Modify Cat</h3>

      <div className="edit-cat-section">
        <div className="cat-input">
          <div>
            <label>Name:</label>
            <input
              value={editName}
              onChange={e => setEditName(e.target.value)}
            />
          </div>

          <div>
            <label>Birthday:</label>
            <input
              type="date"
              value={editBirthday}
              onChange={e => setEditBirthday(e.target.value)}
            />
          </div>

          <div>
            <label>Weight (lb):</label>
            <input
              type="number"
              value={editWeight}
              onChange={e => setEditWeight(e.target.value)}
            />
          </div>

          <div className="add-photo">
            <label>Photo (local):</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => onFileChange(e.target.files[0] || null)}
            />
          </div>
        </div>

        <div className="preview-container">
          {(editPhotoBase64 || cat.photoUrl) && (
            <img
              src={editPhotoBase64 || cat.photoUrl}
              alt="Preview"
              className="preview-image"
            />
          )}
        </div>

        <div className="edit-buttons">
          <button onClick={onSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}