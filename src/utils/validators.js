export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhone = (phone) => {
  const re = /^[\+]?[1-9][\d]{0,15}$/
  return re.test(phone.replace(/\s/g, ''))
}

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim().length > 0
}

export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength
}

export const validateMaxLength = (value, maxLength) => {
  return !value || value.length <= maxLength
}

export const validateNumeric = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value))
}

export const validatePositiveNumber = (value) => {
  return validateNumeric(value) && parseFloat(value) > 0
}

export const validateUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validateForm = (data, rules) => {
  const errors = {}
  
  Object.keys(rules).forEach(field => {
    const value = data[field]
    const fieldRules = rules[field]
    
    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = fieldRules.messages?.required || `${field} is required`
      return
    }
    
    if (value && fieldRules.email && !validateEmail(value)) {
      errors[field] = fieldRules.messages?.email || 'Please enter a valid email'
      return
    }
    
    if (value && fieldRules.phone && !validatePhone(value)) {
      errors[field] = fieldRules.messages?.phone || 'Please enter a valid phone number'
      return
    }
    
    if (value && fieldRules.minLength && !validateMinLength(value, fieldRules.minLength)) {
      errors[field] = fieldRules.messages?.minLength || `Minimum length is ${fieldRules.minLength}`
      return
    }
    
    if (value && fieldRules.maxLength && !validateMaxLength(value, fieldRules.maxLength)) {
      errors[field] = fieldRules.messages?.maxLength || `Maximum length is ${fieldRules.maxLength}`
      return
    }
    
    if (value && fieldRules.numeric && !validateNumeric(value)) {
      errors[field] = fieldRules.messages?.numeric || 'Please enter a valid number'
      return
    }
    
    if (value && fieldRules.positive && !validatePositiveNumber(value)) {
      errors[field] = fieldRules.messages?.positive || 'Please enter a positive number'
      return
    }
  })
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}