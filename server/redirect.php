<? 

// require_once("funcoes.php");

extract($_REQUEST);

$postdata = file_get_contents("php://input");
$aDados = json_decode($postdata);
$tipo_request = $_SERVER['REQUEST_METHOD'];
$pesquisa = $_GET['pesquisa'] ? $_GET['pesquisa'] : '';

if ($location) {	
	$location = str_replace('/app', '', $location);

	$aux = explode('/', $location);
	$codigo = end($aux);
}

if (isset($classe)) {
	$classe = new $classe();
	
	switch ($tipo_request) {
		case 'GET':
			$classe->$p($codigo, $pesquisa);
			break;
		case 'POST':			
			$classe->$p($codigo, $aDados);
			unset($_SESSION['anexos']);
			break;
		case 'PUT':
			$classe->$p($codigo, $aDados);	
			break;
		default:
			echo "Sem classe";
			break;
	}
}

?>