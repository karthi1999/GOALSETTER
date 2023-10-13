import axios from "axios";

const API_URL = "/api/goals/"

// Get Goal
const getGoal = async (token) => {
  let response = await axios.get(API_URL,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  return response.data
}

// Create Goal
const createGoal = async (text, token) => {
  let response = await axios.post(API_URL,
    text,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  return response.data
}

// Update Goal
const updateGoal = async (id, text, token) => {
  let response = await axios.put(API_URL + id,
    { text: text },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  return response.data
}

// Delete Goal
const deleteGoal = async (id, token) => {
  let response = await axios.delete(API_URL + id,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  return response.data
}

const goalService = {
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal
}

export default goalService