# Readme

## Seguridad
### Registrar Usuario
* Descripcion
* Endpoint
* Parametros

### Autenticar Usuario
##  Casos  de Uso
### Registrar Entrada
* Descripcion
      1. El empleado elige la opción "registrar entrada" e introduce el número de placa del coche que entra.
      2. La aplicación apunta la hora de entrada del vehículo.
* Endpoint
* Parametros

### Registrar Salida
* Descripcion

    1. El empleado elige la opción "registrar salida" e introduce el número de placa del coche que sale.
    2. La aplicación realiza las acciones correspondientes al tipo de vehículo:
        a. Oficial: asocia la estancia (hora de entrada y hora de salida) con el vehículo
        b. Residente: suma la duración de la estancia al tiempo total acumulado
        c. No residente: obtiene el importe a pagar
* Endpoint
* Parametros

### Dar de Alta a Vehiculo Oficial
* Descripcion
    1. El empleado elige la opción "dar de alta vehículo oficial" e introduce su número de placa.
    2. La aplicación añade el vehículo a la lista de vehículos oficiales
* Endpoint
* Parametros

### Dar de Alta a Vehiculo Residente
* Descripcion
    1. El empleado elige la opción "dar de alta vehículo de residente" e introduce su número de placa.
    2. La aplicación añade el vehículo a la lista de vehículos de residentes.
* Endpoint
* Parametros

### Comienza Mes
* Descripcion
    1. El empleado elige la opción "comienza mes".
    2. La aplicación elimina las estancias registradas en los coches oficiales y pone a cero el tiempo estacionado por los vehículos de residentes.
* Endpoint
* Parametros

### Pago de Residentes
* Descripcion
    1. El empleado elige la opción "genera informe de pagos de residentes" e introduce el nombre del archivo en el que quiere generar el informe.
    2. La aplicación genera un archivo que detalla el tiempo estacionado y el dinero a pagar por cada uno de los vehículos de residentes. El formato del archivo será el mostrado a continuación:


    | Num.Placa | Tiempo Estacionado(min) | Cantidad a Pagar |
    | --------- | ----------------------- | ---------------- |
    | S1234A    | 20134                   | 1006.70          |
    | 4567ABC   | 4896                    | 244.80           |
* Endpoint
* Parametros



