<?php
require('fpdf181/fpdf.php');

$nombreAlumno = $mes = $folio = "";

//Validación de nombre ingresado en examen.

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nombreAlumno = test_input($_POST["nombreAlumno"]);
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

//Transformacion de meses a texto.

switch (date("m")) {
	case '01':
		$mes = "enero";
		break;
	
	case '02':
		$mes = "febrero";
		break;

	case '03':
		$mes = "marzo";
		break;

	case '04':
		$mes = "abril";
		break;

	case '05':
		$mes = "mayo";
		break;

	case '06':
		$mes = "junio";
		break;

	case '07':
		$mes = "julio";
		break;

	case '08':
		$mes = "agosto";
		break;

	case '09':
		$mes = "septiembre";
		break;

	case '10':
		$mes = "octubre";
		break;

	case '11':
		$mes = "noviembre";
		break;

	case '12':
		$mes = "diciembre";
		break;
	
	default:
		$mes = "enero";
		break;
}

//Folio

$folio = file_get_contents('folio.txt');

//Generacion de PDF

$pdf = new FPDF();
$pdf->SetMargins(20,20,20);
$pdf->AddPage();
$pdf->Image('imagenes/logo.png',null,null,100);
$pdf->Ln(10);
$pdf->SetFont('Arial','B',19);
$pdf->MultiCell(0,10,iconv('UTF-8', 'windows-1252','Carta de participación

'),0,'C');
$pdf->SetFont('Arial','',12);

$pdf->MultiCell(0,7,date("d").' de '.$mes.' de '.date("Y").'
	Folio: '.$folio);   
$pdf->MultiCell(0,7,iconv('UTF-8', 'windows-1252','
	A quien corresponda:
	
	Por medio de la presente se hace constar que '.$nombreAlumno.', usuario del Centro Comunitario Virtual de Aprendizaje, participó en el curso "Titulo del curso", con una duración de 40 horas, impartido por la Dirección de Educación para el Desarrollo de la Escuela de Humanidades y Educación del Tecnológico de Monterrey.

	Para los usos legales que al interesado convengan, extendemos la presente carta constancia en la ciudad de Monterrey, Nuevo León, a los '.date("d").' días del mes de '.$mes.' del '.date("Y").'


	Atentamente,
	'),0,'J');
$pdf->Image('imagenes/firma.png',null,null,62);
$pdf->MultiCell(0,5,iconv('UTF-8', 'windows-1252','Ana Cecilia Torres González
Decana Asociada de Educación y Vinculación
Directora de Educación para el Desarrollo'));
$pdf->SetFont('Arial','B',12);
$pdf->MultiCell(0,5,iconv('UTF-8', 'windows-1252','Escuela de Humanidades y Educación
Tecnológico de Monterrey'));
$pdf->Ln();
$pdf->SetFont('Arial','',9);
$pdf->SetTextColor(80,80,80);
$pdf->Ln(20);
$pdf->MultiCell(0,5,iconv('UTF-8', 'windows-1252','Nota:  Este curso se encuentra en la modalidad por ti mismo, lo que significa que no tuvo un seguimiento académico y solo acreditó el examen final, por tal motivo no avala algún grado académico o curricular del usuario participante.'));
$pdf->Output('D','constancia.pdf');
?>