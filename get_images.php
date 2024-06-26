<?php
// Establish SQLite database connection
$db = new SQLite3('lkadoo.db');

// Query to fetch products from SQLite database
$query = "SELECT * FROM images";
$result = $db->query($query);

// Initialize an empty array to store products
$images = [];

// Fetch each row from the result set and add it to the products array
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $images[] = $row;
}

// Close the database connection
$db->close();

// Set the response header to indicate JSON content
header('Content-Type: application/json');

// Output the products array as JSON
echo json_encode($images);
?>
