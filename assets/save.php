<?php

ini_set('display_errors', 1);
date_default_timezone_set('America/Lima');

class mailing {

    private $sendTo = 'scorpioluis@gmail.com, nprentacar@gmail.com, nprentacar@hotmail.com';
    private $subject = 'Nueva Reserva';

    function setMessage($data) {
        $message = '
      <html>
        <head>
          <title>Nueva Reserva</title>
        </head>
        <body>      
          <p>Datos de la reserva</p>
          <table style="border-collapse: collapse">
            <tr>
              <td style="border:1px solid black;">Vehículo</td><td style="border:1px solid black;">' . $data[0] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Fecha de entrega</td><td style="border:1px solid black;">' . $data[1] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Hora de entrega</td><td style="border:1px solid black;">' . $data[2] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Ciudad de entrega</td><td style="border:1px solid black;">' . $data[3] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Dirección de entrega</td><td style="border:1px solid black;">' . $data[4] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Fecha de devolución</td><td style="border:1px solid black;">' . $data[5] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Hora de devolución</td><td style="border:1px solid black;">' . $data[6] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Ciudad de devolución</td><td style="border:1px solid black;">' . $data[7] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Dirección de devolución</td><td style="border:1px solid black;">' . $data[8] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Nombre</td><td style="border:1px solid black;">' . $data[9] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Número de celular</td><td style="border:1px solid black;">' . $data[10] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Correo electrónico</td><td style="border:1px solid black;">' . $data[11] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Silla bebé</td><td style="border:1px solid black;">' . $data[12] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Parrilla equipaje</td><td style="border:1px solid black;">' . $data[13] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Servicio chofer</td><td style="border:1px solid black;">' . $data[14] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Celular adicional</td><td style="border:1px solid black;">' . $data[15] . '</td>
            </tr>
            <tr>
              <td style="border:1px solid black;">Navegador GPS</td><td style="border:1px solid black;">' . $data[16] . '</td>
            </tr>
          </table>
        </body>
      </html>
    ';
        return $message;
    }

    function setHeaders() {
        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'To: Germán Sucari <german.sucari@gmail.com>' . "\r\n";
        $headers .= 'From: Reservaciones <german.sucari@gmail.com>' . "\r\n";
        return $headers;
    }

    function send($data) {
        $message = $this->setMessage($data);
        $headers = $this->setHeaders();
        mail($this->sendTo, $this->subject, $message, $headers);
        //echo $message;
        return true;
    }

}

class endpoint {

    function process() {
        //header("Access-Control-Allow-Orgin: http://northperurentacar.com.pe");
        header("Access-Control-Allow-Methods: POST");
        header("Content-Type: application/json");
        $response = array(
            'result' => 'failure',
            'description' => 'error'
        );
        $data = $this->getData();
        if (!$data) {
            return json_encode($response);
        }
        $objMailing = new mailing;
        $objMailing->send($data);
        $response['result'] = 'success';
        $response['description'] = 'mensaje enviado';
        return json_encode($response);
    }

    function getData() {
        if (filter_input(INPUT_SERVER, 'REQUEST_METHOD') == 'POST') {
            $data = array(
                filter_input(INPUT_POST, 'vehiculo'),
                filter_input(INPUT_POST, 'fecha_entrega'),
                filter_input(INPUT_POST, 'hora_entrega'),
                filter_input(INPUT_POST, 'ciudad_entrega'),
                filter_input(INPUT_POST, 'direccion_entrega'),
                filter_input(INPUT_POST, 'fecha_devolucion'),
                filter_input(INPUT_POST, 'hora_devolucion'),
                filter_input(INPUT_POST, 'ciudad_devolucion'),
                filter_input(INPUT_POST, 'direccion_devolucion'),
                filter_input(INPUT_POST, 'name'),
                filter_input(INPUT_POST, 'phone'),
                filter_input(INPUT_POST, 'email'),
                filter_input(INPUT_POST, 'silla_bebe'),
                filter_input(INPUT_POST, 'parrilla_equipaje'),
                filter_input(INPUT_POST, 'servicio_chofer'),
                filter_input(INPUT_POST, 'celular_adicional'),
                filter_input(INPUT_POST, 'navegador_gps')
            );
            return $data;
        } else {
            return false;
        }
    }

}

$objEndpoint = new endpoint;
echo $objEndpoint->process();
