type Producto = {
    id: number,
    nombre: string,
    precio: number
} 

const productos = [
    { id: 1, nombre: 'Producto A', precio: 30 },
    { id: 2, nombre: 'Producto B', precio: 20 },
    { id: 3, nombre: 'Producto C', precio: 50 },
    { id: 4, nombre: 'Producto D', precio: 10 }
    ];

    const handler = async (req: Request): Promise<Response> =>
        {
           //const method = req.method;
           const url = new URL(req.url);
           const path = url.pathname;
           const searchParams = url.searchParams;
        
                if(path === "/productos"){

                    const min = searchParams.get("minPrecio")
                    const max = searchParams.get("maxPrecio")
                    if(min && max){
                        const minimo = parseFloat(min);
                        const maximo = parseFloat(max)
                        let aux = productos.filter((elem) => elem.precio >= minimo)
                        aux = aux.filter((elem) => elem.precio <= maximo)
                        
                        return new Response(JSON.stringify(aux));

                    } else if(max){
                        const maximo = parseFloat(max)
                        return new Response(JSON.stringify(productos.filter((elem) => elem.precio <= maximo)));

                    } else if(min){
                        const minimo = parseFloat(min);
                        return new Response(JSON.stringify(productos.filter((elem) => elem.precio >= minimo)));
                    }

                    return new Response(JSON.stringify(productos));                    
                    
                } else if (path.startsWith('/producto/')) {
                    const id = (path.split("/",3));
                    const aux = id[2];
                  
                    const producto = productos.filter(producto => producto.id === parseInt(aux));
                    return new Response(JSON.stringify(producto));

                } else if( path === "/calcular-promedio"){

                    const min = searchParams.get("minPrecio")
                    const max = searchParams.get("maxPrecio")
                    if(min && max){
                        const minimo = parseInt(min);
                        const maximo = parseInt(max);

                        let arr = productos.filter((elem) => elem.precio >= minimo);
                        arr = arr.filter((elem) => elem.precio <= maximo);

                        let aux = 0;
                        let count = 0;
                        for(aux;aux<arr.length;aux++){
                            count += arr[aux].precio;
                        }

                        count = count/arr.length;
                        return new Response(JSON.stringify("Promedio total: " + count))

                    } else if(max){
                        const maximo = parseInt(max);

                        const arr = productos.filter((elem) => elem.precio <= maximo);

                        let aux = 0;
                        let count = 0;
                        for(aux;aux<arr.length;aux++){
                            count += arr[aux].precio;
                        }
                        
                        count = count/arr.length;
                        return new Response(JSON.stringify("Promedio total: " + count))

                    } else if(min){
                        const minimo = parseInt(min);

                        const arr = productos.filter((elem) => elem.precio >= minimo);

                        let aux = 0;
                        let count = 0;
                        for(aux;aux<arr.length;aux++){
                            count += arr[aux].precio;
                        }

                        count = count/arr.length;
                        return new Response(JSON.stringify("Promedio total: " + count))
                    }

                    let aux = 0;
                    let count = 0;
                    for(aux;aux<productos.length;aux++){
                        count+=productos[aux].precio;
                    }

                    count = count/productos.length;
                    return new Response(JSON.stringify("Promedio total: " + count))
                }

           return new Response("Endpoint not found!", {status: 404});

        }
        
        Deno.serve({port: 3000}, handler);