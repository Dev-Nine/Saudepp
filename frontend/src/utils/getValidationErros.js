export default function getValidationErros(err) {
   const validationErros = {};

   err.inner.forEach((error) => {
      validationErros[error.path] = error.message;
   });

   return validationErros;
}
