import * as yup from 'yup'

export default MagicGlobeValidationSchema = yup.object().shape({
    // Name Validation,
    name: yup
    .string()
    .matches(/(\w.+\s).+/, 'Last Name First Name')
    .required('Full name is required'),
    birthDate: yup
    .string()
    .matches(/(((0)[0-9])|(1)[0-2])([0-2][0-9]|(3)[0-1])((19|20)(\d\d))/, 'MMDDYYYY')
    .required('Birthdate (MMDDYYYY) is required'),
    
})