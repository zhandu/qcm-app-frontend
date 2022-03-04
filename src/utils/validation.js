import * as yup from 'yup'

const username = yup.string().trim().matches(/^[a-zA-Z0-9]+$/, 'Seuls les caractères alphanumériques sont acceptés').max(20, 'Le pseudo doit comporter au plus ${max} caractères').min(3, 'Le pseudo doit comporter au moins ${min} caractères').required('Le pseudo est requis')
const email = yup.string().trim().email("Email n'est pas valide").required("L'adresse email est requise")
const password = yup.string().max(20, 'Le mot de passe doit comporter au plus ${max} caractères').min(6, 'Le mot de passe doit comporter au moins 6 caractères').required('Le mot de passe est requis')

export default {
    registerSchema: yup.object().shape({
        username,
        email,
        password
    }),
    loginSchema: yup.object().shape({
        username,
        password
    })
}