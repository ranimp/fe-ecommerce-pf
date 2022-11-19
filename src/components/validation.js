const validation = (values) => {
  let errors = {};

  const namaValidator = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  if (!values.name) {
    errors.name = "Name is required";
  } else if (!values.name.match(namaValidator)) {
    errors.name = "Name must contain letters";
  }
  if (!values.gender) {
    errors.gender = "Gender is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "email invalid";
  }
  const passwordValidator =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_-])[A-Za-z\d@$!%*?&#^()_-]{8,}$/;
  if (!values.password) {
    errors.password = "Password is required";
  } else if (!values.password.match(passwordValidator)) {
    errors.password =
      "password must contain at least 8 characters, uppercase, lowercase, numbers, symbols";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Confirm password must be the same";
  }if (!values.message) {
    errors.message = "Message is required";
  }

  return errors;
};
export default validation;
