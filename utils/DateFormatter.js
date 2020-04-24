class DateFormatter {
  constructor (date) {
    this.dateObj = new Date(date)
  }

  getDate () {
    this.date = this.dateObj.getDate()
    return this
  }

  getMonth () {
    this.month = this.dateObj.getMonth()
    return this
  }

  getYear () {
    this.year = this.dateObj.getFullYear()
    return this
  }

  getResult () {
    return {
      date: this.date || '',
      month: this.month || '',
      year: this.year || ''
    }
  }
}

export default DateFormatter
