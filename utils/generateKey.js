export const generateKey = (withTime = false) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDay()).padStart(2, "0")
  
  if (!withTime) return `${year}${month}${day}`
  
  const hh = String(date.getHours().padStart(2, "0"))
  const mm = String(date.getMinutes().padStart(2, "0"))
  const ss = String(date.getSeconds().padStart(2, "0"))
  
  return `${year}${month}${day}-${hh}${mm}${ss}`
}