---
name: creador_de_habilidades
description: Crea nuevas habilidades (skills) en el workspace de forma automatizada y estandarizada.
---

# Instrucciones para el Creador de Habilidades

Esta habilidad te permite crear nuevas habilidades para el asistente de forma rápida y consistente.

## Pasos para crear una nueva habilidad:

1.  **Recopilar Información**:
    *   Pregunta al usuario el **nombre** de la habilidad (debe ser breve, sin espacios, ej: `generador_tests`).
    *   Pregunta el **propósito** o descripción de la habilidad.
    *   Pregunta si hay instrucciones específicas que deba incluir.

2.  **Crear Estructura**:
    *   Crea el directorio: `.agent/skills/<nombre_habilidad>/`

3.  **Generar Archivo de Definición**:
    *   Crea el archivo `.agent/skills/<nombre_habilidad>/SKILL.md` con el siguiente contenido plantilla (asegúrate de traducir o adaptar al español si es necesario):

    ```markdown
    ---
    name: <nombre_habilidad>
    description: <descripción_proporcionada>
    ---
    
    # Instrucciones para <nombre_habilidad>

    <instrucciones_o_comportamiento_deseado>

    ## Reglas
    - [Regla específica 1]
    - [Regla específica 2]
    ```

4.  **Confirmación**:
    *   Informa al usuario que la habilidad ha sido creada y está lista para usarse.
    *   Recuérdale que puede editar el archivo `SKILL.md` para refinar las instrucciones.

## Consejos
- Asegúrate de que el nombre del directorio sea válido para el sistema de archivos (sin caracteres especiales).
- Mantén las descripciones concisas en el `frontmatter` (encabezado YAML).
