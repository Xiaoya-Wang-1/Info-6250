import React from 'react'

export default function AddCatForm({
  catName,
  setCatName,
  catBirthday,
  setCatBirthday,
  catWeight,
  setCatWeight,
  catPhotoBase64,
  catFileKey,
  onFileChange,
  onAddCat,
  errorMsg
}) {
  return (
    <div className="add-new-cat">
      <h3>Add a New Cat</h3>
      <div className="add-cat-section">
        <div className="cat-input">
          <div>
            <label>Name:</label>
            <input value={catName} onChange={e => setCatName(e.target.value)} />
          </div>
          <div>
            <label>Birthday:</label>
            <input
              type="date"
              value={catBirthday}
              onChange={e => setCatBirthday(e.target.value)}
            />
          </div>
          <div>
            <label>Weight (lb):</label>
            <input value={catWeight} onChange={e => setCatWeight(e.target.value)} />
          </div>
          <div className="add-photo">
            <label>Photo (local):</label>
            <input
              key={catFileKey}
              type="file"
              accept="image/*"
              onChange={e => onFileChange(e.target.files[0] || null)}
            />
          </div>
        </div>
        <div className="preview-container">
          {catPhotoBase64 && (
            <img src={catPhotoBase64} alt="Preview" className="preview-image" />
          )}
        </div>
        <button onClick={onAddCat}>Add Cat</button>
        {errorMsg && <div className="add-cat-error">{errorMsg}</div>}
      </div>
    </div>
  )
}