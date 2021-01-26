import * as yup from 'yup'

export default MagicGlobeValidationSchema = yup.object().shape({
    // Name Validation,
    name: yup
    .string()
    .max(40)
    .required('Please enter their name!'),
    
})