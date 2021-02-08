var app = {

    init: function () {
        var _this = this;
        _this.set_url_base();
        _this.set_defaults();
        _this.set_dom();
        _this.set_listeners();
    },

    set_url_base: function () {
        var _this = this;
        _this.urlBase = window.location.hostname === "www.northperurentacar.com.pe"
                ? "https://www.northperurentacar.com.pe/reservation" : "http://localhost/northperu";
    },

    set_defaults: function () {
        var _this = this;
        var M = window.M;


        // iniciar modal

        var options = {
            opacity: 0.75
        };
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, options);


        // iniciar select

        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, options);


        // iniciar tabs

        var elems = document.querySelectorAll('.tabs');
        _this.Tabs = M.Tabs.init(elems, options);


        // iniciar carousel

        var elems = document.querySelectorAll('.carousel');
        M.Carousel.init(elems, options);


        // iniciar datepickers

        var elems = document.querySelectorAll('.datepicker');
        M.Datepicker.init(elems, options);


        // iniciar timepickers

        var elems = document.querySelectorAll('.timepicker');
        M.Timepicker.init(elems, options);

    },

    set_dom: function () {
        var _this = this;
        _this.dom = {};
        _this.dom.paso1_buttons = document.querySelectorAll("#paso1 a");
        _this.dom.paso2_button = document.querySelectorAll("#paso2 a")[0];
        _this.dom.paso3_button = document.querySelectorAll("#paso3 a")[0];
        _this.dom.paso4_button = document.querySelectorAll("#paso4 a")[0];
    },

    set_listeners: function () {
        var _this = this;
        _this.dom.paso1_buttons.forEach(function (element) {
            element.addEventListener("click", _this.click_paso1_button.bind(_this));
        });
        _this.dom.paso2_button.addEventListener("click", _this.click_paso2_button.bind(_this));
        _this.dom.paso3_button.addEventListener("click", _this.click_paso3_button.bind(_this));
        _this.dom.paso4_button.addEventListener("click", _this.click_paso4_button.bind(_this));
    },

    click_paso1_button: function (event) {
        var _this = this;
        _this.model = event.target.getAttribute("data-model");


        // ir a paso 2

        _this.Tabs[0].el.querySelectorAll("a")[1].parentNode.classList.remove("disabled");
        _this.Tabs[0].select("paso2");
    },

    click_paso2_button: function () {
        var _this = this;


        // ir a paso 3

        _this.Tabs[0].el.querySelectorAll("a")[2].parentNode.classList.remove("disabled");
        _this.Tabs[0].select("paso3");
    },

    click_paso3_button: function () {
        var _this = this;


        // ir a paso 4

        _this.Tabs[0].el.querySelectorAll("a")[3].parentNode.classList.remove("disabled");
        _this.Tabs[0].select("paso4");
    },

    click_paso4_button: function () {
        var _this = this;
        var M = window.M;


        // registro

        var url = _this.urlBase + "/assets/save.php";
        var vehiculo = _this.model;
        var fecha_entrega = document.querySelectorAll("#fecha_entrega")[0].value;
        var hora_entrega = document.querySelectorAll("#hora_entrega")[0].value;
        var ciudad_entrega = document.querySelectorAll("#ciudad_entrega")[0].value;
        var direccion_entrega = document.querySelectorAll("input[name='direccion_entrega']:checked").length ? document.querySelectorAll("input[name='direccion_entrega']:checked")[0].value : "-";
        var fecha_devolucion = document.querySelectorAll("#fecha_devolucion")[0].value;
        var hora_devolucion = document.querySelectorAll("#hora_devolucion")[0].value;
        var ciudad_devolucion = document.querySelectorAll("#ciudad_devolucion")[0].value;
        var direccion_devolucion = document.querySelectorAll("input[name='direccion_devolucion']:checked").length ? document.querySelectorAll("input[name='direccion_devolucion']:checked")[0].value : "-";
        var name = document.querySelectorAll("#name")[0].value;
        var phone = document.querySelectorAll("#phone")[0].value;
        var email = document.querySelectorAll("#email")[0].value;
        var silla_bebe = document.querySelectorAll("#silla_bebe")[0].checked ? "Si" : "No";
        var parrilla_equipaje = document.querySelectorAll("#parrilla_equipaje")[0].checked ? "Si" : "No";
        var servicio_chofer = document.querySelectorAll("#servicio_chofer")[0].checked ? "Si" : "No";
        var celular_adicional = document.querySelectorAll("#celular_adicional")[0].checked ? "Si" : "No";
        var navegador_gps = document.querySelectorAll("#navegador_gps")[0].checked ? "Si" : "No";
        var parameters = "vehiculo=" + vehiculo
                + "&fecha_entrega=" + fecha_entrega
                + "&hora_entrega=" + hora_entrega
                + "&ciudad_entrega=" + ciudad_entrega
                + "&direccion_entrega=" + direccion_entrega
                + "&fecha_devolucion=" + fecha_devolucion
                + "&hora_devolucion=" + hora_devolucion
                + "&ciudad_devolucion=" + ciudad_devolucion
                + "&direccion_devolucion=" + direccion_devolucion
                + "&name=" + name
                + "&phone=" + phone
                + "&email=" + email
                + "&silla_bebe=" + silla_bebe
                + "&parrilla_equipaje=" + parrilla_equipaje
                + "&servicio_chofer=" + servicio_chofer
                + "&celular_adicional=" + celular_adicional
                + "&navegador_gps=" + navegador_gps;
        _this.sendRequest(parameters, "POST", url).then(function (response) {
            if (response.result === "success") {


                // mensaje gracias

                alert("Reserva guardada exitosamente");


                // reiniciar forms

                document.querySelectorAll("form").forEach(function (element) {
                    element.reset();
                });


                // ir a paso 1

                _this.Tabs[0].el.querySelectorAll("a")[1].parentNode.classList.add("disabled");
                _this.Tabs[0].el.querySelectorAll("a")[2].parentNode.classList.add("disabled");
                _this.Tabs[0].el.querySelectorAll("a")[3].parentNode.classList.add("disabled");
                _this.Tabs[0].select("paso1");
                document.querySelectorAll(".carousel")[0].click();
            }
        }, function (error) {
            console.log(error);
        });
    },

    sendRequest: function (parameters, method, url) {
        var xhr = new XMLHttpRequest();
        return new Promise(function (resolve, reject) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 300) {
                        reject("Error, status code = " + xhr.status);
                    } else {
                        resolve(JSON.parse(xhr.response));
                    }
                }
            };
            xhr.open(method, url);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(parameters);
        });
    }

};

document.addEventListener("DOMContentLoaded", function () {
    app.init();
});