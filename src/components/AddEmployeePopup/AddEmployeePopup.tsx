import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { addEmployee } from '../../slices/organizationTreeSlice'
import './AddEmployeePopup.scss'

const AddEmployeePopup: React.FC<AddEmployeePopupProps> = ({ onAdd, onClose }) => {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<AddEmployeeForm>({
    name: '',
    title: '',
    department: '',
    phone: '',
    email: ''
  })
  const [errors, setErrors] = useState<Partial<AddEmployeeForm>>({})

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateForm()) {
      const newEmployee: Employee = {
        id: Math.floor(Math.random() * 1000),
        name: formData.name,
        title: formData.title,
        department: formData.department,
        phone: formData.phone,
        email: formData.email,
        children: []
      }
      onAdd(newEmployee)
      onClose()
    }
  }

  const validateForm = (): boolean => {
    let valid = true
    const newErrors: Partial<AddEmployeeForm> = {}
    if (!formData.name) {
      newErrors.name = 'Name is required'
      valid = false
    }
    if (!formData.title) {
      newErrors.title = 'Title is required'
      valid = false
    }
    if (!formData.email) {
      newErrors.email = 'Email is required'
      valid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
      valid = false
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number'
      valid = false
    }
    setErrors(newErrors)
    return valid
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  return (
        <div className="overlay">
            <div className="popup">
                <h2>Add Employee</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </label>
                    <label>
                        Title:
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                        {errors.title && <span className="error">{errors.title}</span>}
                    </label>
                    <label>
                        Department:
                        <input type="text" name="department" value={formData.department} onChange={handleInputChange} />
                    </label>
                    <label>
                        Phone:
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </label>
                    <label>
                        Email:
                        <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </label>
                    <div className="buttons">
                        <button type="submit">Add</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default AddEmployeePopup
