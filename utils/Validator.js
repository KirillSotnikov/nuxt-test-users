
export default class Validator {
  constructor (value) {
    this.value = value
    this.errors = []
  }

  addError (message) {
    this.errors.push({ errorMessage: message })
  }

  isEmpty () {
    if (!this.value.trim()) {
      this.addError('Значение не должно быть пустым')
    }
    return this
  }

  notZero () {
    if (this.value <= 0) {
      this.addError('Значение должно быть больше 0')
    }
    return this
  }

  getResult () {
    return {
      result: this.value,
      errors: this.errors
    }
  }
}
