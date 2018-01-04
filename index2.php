<?php



$xml = simplexml_load_string("", NULL, NULL, "http://schemas.xmlsoap.org/soap/envelope/");
//$xml->registerXPathNamespace('c', 'http://example.org/titulo-capitulo');
 /*
$xml->addAttribute('xsi:schemaLocation', '1.0');
$xml->addAttribute('xmlns:cfdi', '1.0');
$xml->addAttribute('xmlns:xsi', '1.0');
$xml->addAttribute('version', '1.0');
$xml->addAttribute('fecha', '1.0');

*/
$emisor = $xml->addChild('cfdi:Emisor');
/*
$receptor = $xml->addChild('cfdi:Receptor'); 

$conceptos = $xml->addChild('cfdi:Conceptos');

$impuestos = $xml->addChild('cfdi:Impuestos');

$complemento = $xml->addChild('cfdi:Complemento');

//$address = $person->addchild('address');

//$address->addchild('homeaddress', 'Andersgatan 2, 432 10 Göteborg');

//$address->addChild('workaddress', 'Andersgatan 3, 432 10 Göteborg');

 */

echo $xml->asXML("xml.xml");
//$txt = $xml->__toString();


//$myfile = fopen("xml.xml", "w") or die("Unable to open file!");

//fwrite($txt, $txt);
?>