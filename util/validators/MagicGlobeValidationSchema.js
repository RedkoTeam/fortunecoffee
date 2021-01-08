import * as yup from 'yup'

export default MagicGlobeValidationSchema = yup.object().shape({
    // Name Validation,
    name: yup
    .string()
    .matches(/(\w.+\s).+/, 'Last Name First Name')
    .required('Full name is required'),
    
})