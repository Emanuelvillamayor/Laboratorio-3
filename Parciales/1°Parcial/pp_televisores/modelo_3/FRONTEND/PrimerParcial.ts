namespace PrimerParcial
{
    export class Manejadora
    {
        public static AgregarTelevisor(json? : any):void
        {
           
           var tv : any = null;
           if(json == undefined)
           {
            let codigo = (<HTMLInputElement>document.getElementById("codigo")).value;
            let marca = (<HTMLInputElement>document.getElementById("marca")).value;
            let precio = (<HTMLInputElement>document.getElementById("precio")).value;
            let tipo = (<HTMLInputElement>document.getElementById("tipo")).value;
            let paisOrigen = (<HTMLInputElement>document.getElementById("pais")).value;
            let path = (<HTMLInputElement>document.getElementById("foto")).value;
            let pathFoto : string = (path.split('\\'))[2];

            (<HTMLImageElement>document.getElementById("imgFoto")).src = "./BACKEND/fotos/" + pathFoto;

            tv = new Entidades.Televisor(Number(codigo),marca,Number(precio),tipo,paisOrigen,pathFoto);
           }
           else
           {
                tv = json
           }
           
           console.log(tv.ToJson());

           let foto = (<HTMLInputElement>document.getElementById("foto"));
           let form = new FormData();
           form.append("cadenaJson",tv.ToJson());
           form.append("caso","agregar");
           form.append("foto",foto.files[0]);
           
           
           
           let xhttp = new XMLHttpRequest();
           xhttp.open("POST","./BACKEND/administrar.php",true);
           xhttp.setRequestHeader("enctype", "multipart/form-data");
           xhttp.send(form);

           xhttp.onreadystatechange = ()=>{
               if(xhttp.status == 200 && xhttp.readyState == 4)
               {
                   console.log(xhttp.responseText);
                   let obJson = JSON.parse(xhttp.responseText);
                   console.log(obJson.TodoOK);
                   if(obJson.TodoOK)
                   {
                       alert("TV agregada");
                       PrimerParcial.Manejadora.MostrarTelevisores();
                       
                   }
                   else
                   {
                       alert("No se agrego la TV");
                   }
                   
               }
           }
        }
        public static MostrarTelevisores():void
        {
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST","./BACKEND/administrar.php",true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send("caso=traer");
            
            xhttp.onreadystatechange =() =>{
                if(xhttp.status == 200 && xhttp.readyState == 4)
                {
                    if(xhttp.responseText != "")
                    {
                        PrimerParcial.Manejadora.GenerarTabla(xhttp.responseText);
                        PrimerParcial.Manejadora.GuardarEnLocalStorage();
                    }
                    
                }
            }
           
        }
        public static GenerarTabla(obJson : any):void
        {
            let televisores = JSON.parse(obJson);
            let tabla = document.createElement("table");
            tabla.border = "2" ;
            tabla.innerHTML = "<tr><td>CODIGO</td><td>MARCA</td><td>PRECIO</td><td>TIPO</td><td>ORIGEN</td><td>FOTO</td><td>ACCION</td></tr>";
            televisores.forEach((tv : any) => {
                
                let fila = document.createElement("tr");

                let codigo = document.createTextNode(tv.codigo);
                let colCod = document.createElement("td");
                colCod.appendChild(codigo);
                fila.appendChild(colCod);

                let marca = document.createTextNode(tv.marca);
                let colMar = document.createElement("td");
                colMar.appendChild(marca);
                fila.appendChild(colMar);

                let precio = document.createTextNode(tv.precio);
                let colPre = document.createElement("td");
                colPre.appendChild(precio);
                fila.appendChild(colPre);

                let tipo = document.createTextNode(tv.tipo);
                let colTip = document.createElement("td");
                colTip.appendChild(tipo);
                fila.appendChild(colTip);

                let paisorigen = document.createTextNode(tv.paisOrigen);
                let colPais = document.createElement("td");
                colPais.appendChild(paisorigen);
                fila.appendChild(colPais);

                
                let foto = document.createElement("img");
                foto.src = "./BACKEND/fotos/" + tv.pathFoto
                foto.width = 50;
                foto.height = 50;
                let colPath = document.createElement("td");
                colPath.appendChild(foto);
                fila.appendChild(colPath);

                //BOTONES
                let colAcc= document.createElement("td");
                
                let eliminar = document.createElement("button");
                let txt = document.createTextNode("Eliminar");
                eliminar.appendChild(txt);
                eliminar.setAttribute("onclick","PrimerParcial.Manejadora.EliminarTv(" + JSON.stringify(tv) + ")");
                colAcc.appendChild(eliminar);
                

                let modificar = document.createElement("button");
                let txt2 = document.createTextNode("Modificar");
                modificar.setAttribute("onclick","PrimerParcial.Manejadora.ObtenerTv(" + JSON.stringify(tv) + ")");
                modificar.appendChild(txt2);
                colAcc.appendChild(modificar);
                
                
                fila.appendChild(colAcc);



                tabla.appendChild(fila);
            });
            

            (<HTMLDivElement>document.getElementById("divTabla")).innerHTML = tabla.outerHTML;
            
        }
        public static GuardarEnLocalStorage():void
        {
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST","./BACKEND/administrar.php",true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send("caso=traer");
            
            xhttp.onreadystatechange =() =>{
                if(xhttp.status == 200 && xhttp.readyState == 4)
                {
                    if(xhttp.responseText != "")
                    {
                        localStorage.setItem("televisores_local_storage_",xhttp.responseText);
                        console.log("Guardado en local storage");
                        console.log(localStorage.getItem("televisores_local_storage_")); 
                    }
                    
                }
            }
            
        }
        public static VerificarTelevisores():void
        {
           let codigo = (<HTMLInputElement>document.getElementById("codigo")).value;
           let marca = (<HTMLInputElement>document.getElementById("marca")).value;
           let precio = (<HTMLInputElement>document.getElementById("precio")).value;
           let tipo = (<HTMLInputElement>document.getElementById("tipo")).value;
           let paisOrigen = (<HTMLInputElement>document.getElementById("pais")).value;
           let path = (<HTMLInputElement>document.getElementById("foto")).value;
           let pathFoto : string = (path.split('\\'))[2];
           let tv = new Entidades.Televisor(Number(codigo),marca,Number(precio),tipo,paisOrigen,pathFoto);
           let tvS = JSON.parse(localStorage.getItem("televisores_local_storage_"));
           let flag = 0;
           tvS.forEach((tv:any) => {
               if(tv.codigo == Number(codigo))
               {
                   flag = 1;
               }
           });

           if(flag == 1)
           {
               alert("El codigo ya esta registrado");
           }
           else
           {
             PrimerParcial.Manejadora.AgregarTelevisor(tv);
           }
        }
        public static EliminarTv(tv : any):void
        {
            
            if(confirm("Desea eliminar la TV codigo " + tv.codigo + "?"))
            {
                let xhttp = new XMLHttpRequest();
                xhttp.open("POST","./BACKEND/administrar.php",true);
                xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
                xhttp.send("caso=eliminar&cadenaJson=" + JSON.stringify(tv));

                xhttp.onreadystatechange =()=>{
                   if(xhttp.status == 200 && xhttp.readyState == 4)
                   {
                     let obJson = JSON.parse(xhttp.responseText);
                     if(obJson.TodoOK == true)
                     {
                        alert("TV eliminada");
                        Manejadora.MostrarTelevisores();
                     }
                   }
               }
            }
            else
            {
                alert("Accion cancelada....");
            }
        }
        public static ObtenerTv(json : any) : void
        {
           (<HTMLInputElement>document.getElementById("codigo")).value  = json.codigo;
           (<HTMLInputElement>document.getElementById("codigo")).disabled = true;
           (<HTMLInputElement>document.getElementById("marca")).value = json.marca;
           (<HTMLInputElement>document.getElementById("precio")).value = String(json.precio);
           (<HTMLInputElement>document.getElementById("tipo")).value = json.tipo;
           (<HTMLInputElement>document.getElementById("pais")).value = json.paisOrigen;
           (<HTMLImageElement>document.getElementById("imgFoto")).src = "./BACKEND/fotos/" + json.pathFoto;

           (<HTMLInputElement>document.getElementById("btn-agregar")).value = "Modificar";
           (<HTMLInputElement>document.getElementById("btn-agregar")).setAttribute("onclick","PrimerParcial.Manejadora.ModificarTv()");

        }
        public static ModificarTv() : void
        {
            let codigo = (<HTMLInputElement>document.getElementById("codigo")).value;
            let marca = (<HTMLInputElement>document.getElementById("marca")).value;
            let precio = (<HTMLInputElement>document.getElementById("precio")).value;
            let tipo = (<HTMLInputElement>document.getElementById("tipo")).value;
            let paisOrigen = (<HTMLInputElement>document.getElementById("pais")).value;
            let path = (<HTMLInputElement>document.getElementById("foto")).value;
            let pathFoto : string = (path.split('\\'))[2];

            let tv = new Entidades.Televisor(Number(codigo),marca,Number(precio),tipo,paisOrigen,pathFoto);

            let foto = (<HTMLInputElement>document.getElementById("foto"));
            let form = new FormData();
            form.append("cadenaJson",tv.ToJson());
            form.append("caso","modificar");
            form.append("foto",foto.files[0]);
           
           
           
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST","./BACKEND/administrar.php",true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);

            xhttp.onreadystatechange = ()=>{
               if(xhttp.status == 200 && xhttp.readyState == 4)
               {
                   console.log(xhttp.responseText);
                   let obJson = JSON.parse(xhttp.responseText);
                   console.log(obJson.TodoOK);
                   if(obJson.TodoOK)
                   {
                       alert("TV modificada");
                       PrimerParcial.Manejadora.MostrarTelevisores();
                       
                   }
                   else
                   {
                       alert("No se modifico la TV");
                   }
                   
               }
           }
           (<HTMLInputElement>document.getElementById("btn-agregar")).value = "Agregar";
           (<HTMLInputElement>document.getElementById("btn-agregar")).setAttribute("onclick","PrimerParcial.Manejadora.AgregarTelevisor()");
           (<HTMLInputElement>document.getElementById("codigo")).disabled = false;
        }
        public static FiltrarTelevisores():void
        {
            let pais = (<HTMLInputElement>document.getElementById("pais")).value
            let tvS = JSON.parse(localStorage.getItem("televisores_local_storage_"));
            var nuevaLista : Array <Entidades.Televisor> = new Array();
            var flag = 0;
            tvS.forEach((tv : Entidades.Televisor) => {
                if(tv.paisOrigen == pais)
                {
                    nuevaLista.push(tv);
                    flag = 1;
                }
            });

            if(flag == 1)
            {
                Manejadora.GenerarTabla(JSON.stringify(nuevaLista)); 
            }
            else
            {
                (<HTMLDivElement>document.getElementById("divTabla")).innerHTML = "No hay televisores registrados con el pais de origen seleccionado";
            }
        }
        public static CargarPaises():void
        {
            let select = (<HTMLSelectElement>document.getElementById("pais"));
            
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST","./BACKEND/administrar.php");
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send("caso=paises");

            xhttp.onreadystatechange = ()=>{
                if(xhttp.status == 200 && xhttp.readyState == 4)
                {
                    if(xhttp.responseText != "")
                    {
                        select.innerHTML = "";
                        let paises = JSON.parse(xhttp.responseText);
                        paises.forEach((pais : any) => {
                            let txt = document.createTextNode(pais.descripcion);
                            let op = document.createElement("option");
                            op.appendChild(txt);
                            select.appendChild(op);
                        });
                    }
                }
            }
        }
            
        
    }
}