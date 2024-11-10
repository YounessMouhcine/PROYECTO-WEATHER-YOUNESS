$(document).ready(function () {
    const apiKey = '4de39465dbf3ec7963f56458fdec9d7a'; // Reemplaza con tu API Key de OpenWeather

    $('#botonNavLateral').on('click', function () {
        $('#barraLateral').toggleClass('show');
        if ($('#barraLateral').hasClass('show')) {
            $(this).find('i').removeClass('bi-arrow-bar-right').addClass('bi-arrow-bar-left'); // Cambia el icono
            $(this).css('left', '250px'); // Mueve el botón a la derecha del navbar
        } else {
            $(this).find('i').removeClass('bi-arrow-bar-left').addClass('bi-arrow-bar-right'); // Cambia el icono de vuelta
            $(this).css('left', '10px'); // Mueve el botón a la posición inicial
        }
    });

    $('.list-group-item-action').on('click', function () {
        $('#barraLateral').removeClass('show'); // Cerrar barraLateral al hacer clic en una opción
        $('#botonNavLateral').find('i').removeClass('bi-arrow-bar-left').addClass('bi-arrow-bar-right'); // Cambia el icono de vuelta
        $('#botonNavLateral').css('left', '10px'); // Mueve el botón a la posición inicial
    });

    $('#MostrarForm').on('click', function (e) {
        e.preventDefault();
        $('#formularioCiudad').html(`
            <form id="FormCiudad" class="mt-3">
                <div class="form-group">
                    <label for="Ciudad">Ingrese el nombre de la ciudad</label>
                    <input type="text" class="form-control" id="Ciudad" placeholder="Ciudad">
                </div>
                <div class="form-group mt-2">
                    <label for="Tipo">Seleccione el tipo de predicción</label>
                    <select class="form-control" id="Tipo">
                        <option value="actual">Tiempo Actual</option>
                        <option value="forecast">Predicción 5 Días</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Buscar</button>
            </form>
        `);
        $('#resultadoTiempo').html(''); // Limpiar el resultado del clima
    });

    $('#Inicio').on('click', function (e) {
        e.preventDefault();
        $('#formularioCiudad').html(''); // Limpiar el formulario
        $('#resultadoTiempo').html('');   // Limpiar el resultado del clima
    });

    $('#MostrarClimaLocalizacion').on('click', function (e) {
        e.preventDefault();
        $('#formularioCiudad').html(''); // Limpiar el formulario
        $('#resultadoTiempo').html('');   // Limpiar el resultado del clima
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
    
                const ClimaActualURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
                $.ajax({
                    url: ClimaActualURL,
                    method: 'GET',
                    success: function (data) {
                        
                        const icono = data.weather[0].icon;
                        const iconoURL = `https://openweathermap.org/img/wn/${icono}@2x.png`;
                        const resultadoClima = `
                            <div class="card text-black bg-light mb-3">
                                <div class="card-header text-center p-2">
                                    <h6 class="card-title m-0">Clima en tu localización</h6>
                                </div>
                                <div class="card-body p-2">
                                    <div class="d-flex justify-content-center">
                                        <img src="${iconoURL}" alt="${data.weather[0].description}" class="me-2 img-fluid">
                                    </div>
                                    <p class="card-text text-center mt-2 mb-1"><strong>Temperatura:</strong> ${data.main.temp} °C <i class="bi bi-thermometer-half"></i></p>
                                    <p class="card-text text-center mb-1"><strong>Humedad:</strong> ${data.main.humidity} % <i class="bi bi-droplet"></i></p>
                                    <p class="card-text text-center mb-1"><strong>Condiciones:</strong> ${data.weather[0].description}</p>
                                </div>
                            </div>
                        `;
                        $('#resultadoTiempo').append(resultadoClima);
                    },
                    error: function () {
                        $('#resultadoTiempo').html('<p class="text-danger">Error al obtener el clima. Por favor, intenta de nuevo.</p>');
                    }
                });
    
                $.ajax({
                    url: forecastUrl,
                    method: 'GET',
                    success: function (data) {
                        let forecastResult = `
                            <div class="card text-black bg-light mb-3">
                                <div class="card-header text-center p-2">
                                    <h6 class="card-title m-0">Predicción para tu localización</h6>
                                </div>
                                <div class="card-body p-2 overflow-auto">
                                    <div class="row gx-2">
                        `;
                        
                        data.list.forEach((forecast, index) => {
                            if (index % 8 === 0) { // Obtener predicciones cada 24 horas (8 * 3 horas)
                                const date = new Date(forecast.dt * 1000);
                                const icono = forecast.weather[0].icon;
                                const iconoURL = `https://openweathermap.org/img/wn/${icono}@2x.png`;
                                forecastResult += `
                                    <div class="col-12 col-md-6 mb-2">
                                        <div class="card p-2">
                                            <div class="card-body text-center p-1">
                                                <h6 class="card-title m-0">${date.toLocaleDateString()}</h6>
                                                <img src="${iconoURL}" alt="${forecast.weather[0].description}" class="img-fluid">
                                                <p class="card-text mb-1"><strong>Temperatura:</strong> ${forecast.main.temp} °C <i class="bi bi-thermometer-half"></i></p>
                                                <p class="card-text mb-1"><strong>Humedad:</strong> ${forecast.main.humidity} % <i class="bi bi-droplet"></i></p>
                                                <p class="card-text mb-1"><strong>Condiciones:</strong> ${forecast.weather[0].description}</p>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }
                        });
    
                        forecastResult += `
                                    </div>
                                </div>
                            </div>
                        `;
                        $('#resultadoTiempo').append(forecastResult);
                    },
                    error: function () {
                        $('#resultadoTiempo').html('<p class="text-danger">Error al obtener la predicción. Por favor, intenta de nuevo.</p>');
                    }
                });
            }, function (error) {
                $('#resultadoTiempo').html('<p class="text-danger">Error al obtener la ubicación. Por favor, verifica los permisos de tu navegador.</p>');
            });
        } else {
            $('#resultadoTiempo').html('<p class="text-danger">La geolocalización no es soportada por este navegador.</p>');
        }
    });
    

    $(document).on('submit', '#FormCiudad', function (e) {
        e.preventDefault();
        const city = $('#Ciudad').val();
        const tipo = $('#Tipo').val();
        let url = '';

        if (tipo === 'actual') {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        } else if (tipo === 'forecast') {
            url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        }

        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                if (tipo === 'actual') {
                    const icono = data.weather[0].icon;
                    const iconoURL = `https://openweathermap.org/img/wn/${icono}@2x.png`;
                    const resultadoClima = `
                        <div class="card text-black bg-light mb-3">
                            <div class="card-header text-center p-2">
                                <h6 class="card-title m-0">Clima en ${data.name}</h6>
                            </div>
                            <div class="card-body p-2">
                                <div class="d-flex justify-content-center">
                                    <img src="${iconoURL}" alt="${data.weather[0].description}" class="me-2 img-fluid">
                                </div>
                                <p class="card-text text-center mt-2 mb-1"><strong>Temperatura:</strong> ${data.main.temp} °C <i class="bi bi-thermometer-half"></i></p>
                                <p class="card-text text-center mb-1"><strong>Humedad:</strong> ${data.main.humidity} % <i class="bi bi-droplet"></i></p>
                                <p class="card-text text-center mb-1"><strong>Condiciones:</strong> ${data.weather[0].description}</p>
                            </div>
                        </div>
                    `;
                    $('#resultadoTiempo').html(resultadoClima);
                } else if (tipo === 'forecast') {
                    let forecastResult = `
                        <div class="card text-black bg-light mb-3">
                            <div class="card-header text-center p-2">
                                <h6 class="card-title m-0">Predicción para ${data.city.name}</h6>
                            </div>
                            <div class="card-body p-2 overflow-auto">
                                <div class="row gx-2">
                    `;
                    
                    data.list.forEach((forecast, index) => {
                        if (index % 8 === 0) { // Obtener predicciones cada 24 horas (8 * 3 horas)
                            const date = new Date(forecast.dt * 1000);
                            const icono = forecast.weather[0].icon;
                            const iconoURL = `https://openweathermap.org/img/wn/${icono}@2x.png`;
                            forecastResult += `
                                <div class="col-12 col-md-6 mb-2">
                                    <div class="card p-2">
                                        <div class="card-body text-center p-1">
                                            <h6 class="card-title m-0">${date.toLocaleDateString()}</h6>
                                            <img src="${iconoURL}" alt="${forecast.weather[0].description}" class="img-fluid">
                                            <p class="card-text mb-1"><strong>Temperatura:</strong> ${forecast.main.temp} °C <i class="bi bi-thermometer-half"></i></p>
                                            <p class="card-text mb-1"><strong>Humedad:</strong> ${forecast.main.humidity} % <i class="bi bi-droplet"></i></p>
                                            <p class="card-text mb-1"><strong>Condiciones:</strong> ${forecast.weather[0].description}</p>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                    });

                    forecastResult += `
                                </div>
                            </div>
                        </div>
                    `;
                    $('#resultadoTiempo').html(forecastResult);
                }
            },
            error: function () {
                $('#resultadoTiempo').html('<p class="text-danger">Error al obtener el clima. Por favor, intenta de nuevo.</p>');
            }
        });
    });
});
