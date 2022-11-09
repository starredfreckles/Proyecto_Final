export const generarID = () => { 
    const random = Math.random().toString(36).substring(2);
     const fecha = Date.now().toString(36);
     const hora = new Date().toLocaleTimeString('es-MX');
     return fecha+hora;
   }
   
   export const FormateaFecha = (fecha) => { 
       const fechaNueva = new Date(fecha);
       return fechaNueva.toLocaleDateString('es-MX',{
           year: 'numeric',
           month: 'long',
           day: '2-digit'
       })
   }