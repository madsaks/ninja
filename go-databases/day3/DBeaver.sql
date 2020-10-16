/* How many Employees? */
SELECT COUNT() FROM Employee;

/* Which composer has the most tracks? */
SELECT Composer, COUNT(TrackId) 
FROM Track 
GROUP BY Composer 
ORDER BY COUNT(Composer) 
DESC LIMIT 1;

/* How many invoices were issued in the first quarter of 2011? */
SELECT COUNT(InvoiceId) 
FROM Invoice 
WHERE InvoiceDate > "2011-01-00 00:00:00" 
AND InvoiceDate > "2011-03-31 00:00:00";

/* What is the average number of tracks a customer buys? -------------------- */
/* Test */
SELECT Customer.FirstName, Count(InvoiceLine.Quantity)
FROM Invoice Invoice, Customer Customer, InvoiceLine InvoiceLine
WHERE 
	Invoice.CustomerId = Customer.CustomerId
	AND InvoiceLine.InvoiceId = Invoice.InvoiceId
GROUP BY Customer.FirstName 

/* Test */
SELECT SUM(InvoiceLine.Quantity) 
FROM Invoice Invoice, Customer Customer, InvoiceLine InvoiceLine
WHERE 
	Invoice.CustomerId = Customer.CustomerId
	AND InvoiceLine.InvoiceId = Invoice.InvoiceId
GROUP BY InvoiceLine.Quantity


/* How much has each customer spent? ------------------------------------- */
SELECT Customer.FirstName,COUNT(Invoice.Total) * Invoice.Total 
FROM Invoice Invoice, Customer Customer
WHERE 
	Invoice.CustomerId = Customer.CustomerId
GROUP BY Customer.FirstName




/* How many albums does each artist have? ----------------------------------*/
SELECT Artist.*, COUNT(Album.AlbumId)
FROM Artist Artist, Album Album
WHERE 
	Album.ArtistId = Artist.ArtistId
GROUP BY Artist.Name 


/* Which artists have made the top 3 sales? How much? */

SELECT Artist.Name, SUM(InvoiceLine.UnitPrice * InvoiceLine.Quantity)
FROM Artist Artist, Album Album, Track Track, InvoiceLine InvoiceLine
WHERE 
	Album.ArtistId = Artist.ArtistId
	AND Track.AlbumId = Album.AlbumId
	AND InvoiceLine.TrackId = Track.TrackId
GROUP BY Artist.Name
ORDER BY SUM(InvoiceLine.UnitPrice * InvoiceLine.Quantity)
DESC
LIMIT 3;
/*------------------------------------------------------------------------------------------------*/

/* What is the total spend from each customer? */





