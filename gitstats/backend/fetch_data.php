<?php
header('Content-Type: application/json');

// Configurations
$owner = 'YvinecTom'; // Nom du propriétaire du dépôt
$repo = 'NerdzByNight';   // Nom du dépôt
$token = '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'; // Token GitHub

// Endpoint de l'API
$url = "https://api.github.com/repos/$owner/$repo/commits";

// Configuration cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: token $token",
    "User-Agent: PHP-cURL"
]);

$response = curl_exec($ch);
curl_close($ch);

if (!$response) {
    echo json_encode(['error' => 'Impossible de récupérer les données.']);
    exit;
}

// Traiter les données
$commits = json_decode($response, true);
$commitCountByAuthor = [];

foreach ($commits as $commit) {
    $author = $commit['author']['login'] ?? 'unknown';
    $commitCountByAuthor[$author] = ($commitCountByAuthor[$author] ?? 0) + 1;
}



// Retourner les résultats au format JSON
echo json_encode($commitCountByAuthor);


// Filtrer les utilisateurs anonymes (key = "unknown")
$filteredData = array_filter($data, function($key) {
    return strtolower($key) !== 'unknown';
}, ARRAY_FILTER_USE_KEY);

// Envoyer les données filtrées au format JSON
header('Content-Type: application/json');
echo json_encode($filteredData);
?>
