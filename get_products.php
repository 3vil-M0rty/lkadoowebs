<?php
// Establish SQLite database connection
$db = new SQLite3('lkadoo.db');

// Query to fetch products from SQLite database
$query = "SELECT * FROM products";
$result = $db->query($query);

// Initialize an empty array to store products
$products = [];

// Fetch each row from the result set and add it to the products array
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $products[] = $row;
}

// Close the database connection
$db->close();

// Set the response header to indicate JSON content
header('Content-Type: application/json');

// Output the products array as JSON
echo json_encode($products);
?>
