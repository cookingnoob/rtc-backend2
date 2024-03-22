repositorio github: https://github.com/cookingnoob/rtc-backend2

Uso
Es un backend de una tienda de videojuegos y consolas
existen endpoints de games y consoles
------------------------------------------------------------------------------------------------
ENDPOINTS para /games
GET muestra todos los juegos que estan en la coleccion
/games/
GET busca un juego por su id
/games/:id 

GET busca un juego por su id y usa populate para mostrar informacion de la consola
/games/:id/console

POST agrega un juego a la coleccion games
/games/add

PUT actualiza la informacion de un juego
/games/update/:id

PUT actualiza la informacion -elimina o agrega- de la consola de un juego 
/games/:id/console

//DELTE borra un juego por su id
/games/delete/:id

-----------------------------------------------------------------------------------------------
ENDPOINTS para /consoles
GET muestra todos las consolas que estan en la coleccion
/consoles/

GET busca una consola por su id
/consoles/:id 

GET busca una consola por su id y usa populate para mostrar informacion de sus juegos
/consoles/:id/games

POST agrega una consola a la coleccion consoles
/consoles/add

PUT actualiza la informacion de una consola
/consoles/update/:id

PUT actualiza la informacion del array de juegos de una consola
/consoles/:id/update-games

//DELTE borra una consola por su id
/consoles/delete/:id