# Modelos 3D para la personalización de zapatillas

Para que la aplicación funcione correctamente, necesitas colocar los siguientes archivos en este directorio:

- `jordan_shoe.glb` - Modelo 3D de una zapatilla Jordan para el personalizador

## Instrucciones para obtener los modelos

Si no tienes estos archivos, puedes:

1. Crear tus propios modelos utilizando Blender u otro software de modelado 3D
2. Descargar modelos gratuitos o comerciales desde plataformas como:
   - [Sketchfab](https://sketchfab.com)
   - [CGTrader](https://www.cgtrader.com)
   - [TurboSquid](https://www.turbosquid.com)
   - [Free3D](https://free3d.com)

Asegúrate de que los nombres de los archivos coincidan exactamente con los nombres indicados arriba para que la aplicación pueda cargarlos correctamente.

## Estructura del modelo Jordan

El modelo jordan_shoe.glb debe tener la siguiente estructura de materiales para ser compatible con el personalizador:

- side
- back_flipper
- front_down
- slashes
- mini_flaps
- side_flaps
- back_flip
- logo
- upper_side
- upper_soft
- softy
- big_front
- upper_bottom_bottom
- bottooom
- bottom_logo
- middle_sides
- front_side

Si tu modelo tiene diferentes nombres de materiales, deberás actualizar el archivo `components/jordan-shoe-customizer.tsx` para que coincida con los nombres de tu modelo.
