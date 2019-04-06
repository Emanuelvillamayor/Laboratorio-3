"use strict";
/*Clase Persona:
Clase Persona
Atributos (todos privados)
Constructor (inicializa los atributos de la clase)
Métodos (de instancia)
 Hablar (abstracto). Retorna un string.
 ToString. Retorna un string mostrando todos los datos de la persona, separados por
un guión medio (-).
 getters para cada uno de los atributos.
*/
var Empleados;
(function (Empleados) {
    var Persona = /** @class */ (function () {
        //Constructor
        function Persona(nombre, apellido, dni, sexo) {
            this._apellido = apellido;
            this._nombre = nombre;
            this._dni = dni;
            this._sexo = sexo;
        }
        //--------Get-------
        //metodo
        Persona.prototype.GetApellido = function () {
            return this._apellido;
        };
        Object.defineProperty(Persona.prototype, "Dni", {
            //propiedad
            get: function () {
                return this._dni;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "Nombre", {
            get: function () {
                return this._nombre;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "Sexo", {
            get: function () {
                return this._sexo;
            },
            enumerable: true,
            configurable: true
        });
        //Metodos instancia
        Persona.prototype.ToString = function () {
            return "Nombre:" + this._nombre + "\nApellido:" + this._apellido + "\nDNI:" + this._dni + "\nSexo:" + this._sexo;
            //return "Nombre:"+this._nombre+"\nApellido:"+this._apellido+"\nDNI:"+this._dni+"\nSexo:"+this._sexo;
        };
        return Persona;
    }());
    Empleados.Persona = Persona;
})(Empleados || (Empleados = {}));
//# sourceMappingURL=Persona.js.map