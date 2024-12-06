<?php
header('Content-Type: application/json');

$owner = 'EwannDelacre';
$repo = 'NerdzByNight';
$token = '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';

// Endpoint de l'API
$url = "https://api.github.com/repos/$owner/$repo/commits";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: token $token",
    "User-Agent: PHP-cURL",
    "Accept: application/vnd.github.v3+json"
]);

$response = curl_exec($ch);
curl_close($ch);

if (!$response) {
    echo json_encode(['error' => 'Impossible de récupérer les données.']);
    exit;
}

$commits = json_decode($response, true);
$commitCountByAuthor = [];
$linesByAuthor = [];

foreach ($commits as $commit) {
    $author = $commit['author']['login'] ?? 'unknown';
    $commitCountByAuthor[$author] = ($commitCountByAuthor[$author] ?? 0) + 1;

    // Récupérer les détails du commit
    $commitUrl = $commit['url'];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $commitUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: token $token",
        "User-Agent: PHP-cURL",
        "Accept: application/vnd.github.v3+json"
    ]);

    $commitDetails = curl_exec($ch);
    curl_close($ch);

    if ($commitDetails) {
        $details = json_decode($commitDetails, true);
        if (isset($details['stats'])) {
            if (!isset($linesByAuthor[$author])) {
                $linesByAuthor[$author] = ['additions' => 0, 'deletions' => 0];
            }
            $linesByAuthor[$author]['additions'] += $details['stats']['additions'];
            $linesByAuthor[$author]['deletions'] += $details['stats']['deletions'];
        }
    }
}

$languagesUrl = "https://api.github.com/repos/$owner/$repo/languages";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $languagesUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: token $token",
    "User-Agent: PHP-cURL",
    "Accept: application/vnd.github.v3+json"
]);

$languagesResponse = curl_exec($ch);
curl_close($ch);

$languages = [];
if ($languagesResponse) {
    $languages = json_decode($languagesResponse, true);
}


// Filtrer les utilisateurs anonymes
$filteredData = array_filter($commitCountByAuthor, function($key) {
    return strtolower($key) !== 'unknown';
}, ARRAY_FILTER_USE_KEY);

$result = [
    'commits' => $filteredData,
    'lines' => array_filter($linesByAuthor, function($key) {
        return strtolower($key) !== 'unknown';
    }, ARRAY_FILTER_USE_KEY),
    'languages' => $languages
];
echo json_encode($result);
?>
