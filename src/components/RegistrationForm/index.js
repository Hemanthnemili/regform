import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    showFirstNameError: false,
    showLastNameError: false,
    isFormSubmitted: false,
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  validateFirstName = () => {
    const {firstName} = this.state

    return firstName !== ''
  }

  validateLastName = () => {
    const {lastName} = this.state

    return lastName !== ''
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()
    this.setState({showFirstNameError: !isValidFirstName})
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()
    this.setState({showLastNameError: !isValidLastName})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()

    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        isFormSubmitted: false,
        showFirstNameError: !this.validateFirstName(),
        showLastNameError: !this.validateLastName,
      })
    }
  }

  renderFirstName = () => {
    const {firstName} = this.state
    return (
      <>
        <label className="input" htmlFor="firstname">
          FIRST NAME
        </label>
        <input
          id="firstname"
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
      </>
    )
  }

  renderLastName = () => {
    const {lastName} = this.state
    return (
      <>
        <label className="input" htmlFor="lastname">
          LAST Name
        </label>
        <input
          id="lastname"
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
        />
      </>
    )
  }

  renderRegistrationForm = () => {
    const {showFirstNameError, showLastNameError} = this.state

    return (
      <form onSubmit={this.onSubmitForm}>
        {this.renderFirstName()}
        {showFirstNameError && <p className="error-msg">Required</p>}
        {this.renderLastName()}
        {showLastNameError && <p className="error-msg">Required</p>}
        <button type="submit">Submit</button>
      </form>
    )
  }

  onClickAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstName: '',
      lastName: '',
    }))
  }

  renderSubmissionSuccessView = () => {
    ;<>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png "
        alt="success"
      />
      <p>Successfully Submitted</p>
      <button type="button" onClick={this.onClickAnotherResponse}>
        Submit Another Response
      </button>
    </>
  }

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="background">
        <div className="container">
          <h1 className="heading">Registration</h1>
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
