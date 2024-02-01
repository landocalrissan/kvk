<!DOCTYPE html>
<html>
<head>
<title>Puslapio pavadinimas</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>
	<!-- Išvaizda baisi, bet į ją nebuvo kreipiama dėmėsio. -->
<?php

/*	
	Reikalavimai buvo:

	1. Darbas turi būti atliktas su PHP
	2. Naudoti Bootstrap
	3. Padaryti responsive lentelę su Bootstrap
	4. Sugeneruoti atsitiktinius skaičius lentelėje.
	5. Uždėti skirtingas fono spalvas lyginiams/nelyginiams skaičiams.
	6. Parašyti koks buvo aukščiausias sugeneruotas skaičius.
	7. Parašyti koks buvo žemiausias sugeneruotas skaičius.
	8. Parašyti kiek kartų tam tikri skaičiai kartojosi.
*/

$rows = 5;
$columns = 6;
$numberOccurences = [];
$highestNumber = PHP_INT_MIN;
$lowestNumber = PHP_INT_MAX;

echo "<div class='table-responsive'>";
echo "<table class='table table-bordered'>";

for ($i = 0; $i < $rows; $i++) {
	echo "<tr>";
	for ($j =0; $j < $columns; $j++) {
		$number = rand(1, 100);
		
		if (isset($numberOccurences[$number])) {
			$numberOccurences[$number]++;
		} else {
			$numberOccurences[$number] = 1;
		}
		
		if ($number > $highestNumber) {
			$highestNumber = $number;
		}
		if ($number < $lowestNumber) {
			$lowestNumber = $number;
		}
		
		$class = ($number % 2 === 0) ? 'bg-success' : 'bg-danger';
		
		echo "<td class='$class'>" . $number . "</td>";
	}
	echo "</tr>";
}

echo "</table>";
echo "</div>";
echo "<div><strong>Aukščiausias skaičius: $highestNumber</strong></div>";
echo "<div><strong>Žemiausias skaičius: $lowestNumber</strong></div>";
echo "<div><strong>Skaičiai kartojasi:</strong></div>";
foreach ($numberOccurences as $number => $count) {
	echo "<div>Skaičius $number kartojasi $count kartų.</div>";
}

?>
</body>
</html>
