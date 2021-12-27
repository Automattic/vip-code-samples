<?php
require_once './vendor/autoload.php';

use lsolesen\pel\PelJpeg;
use lsolesen\pel\PelIfd;

$filename     = 'img/DSCN0012.jpeg';
$new_filename = 'img/processed-' . basename($filename);

// Creating the PelJpeg object.
$jpeg = new PelJpeg( $filename );

// Get the EXIF data.
$exif = $jpeg->getExif();

// The Exif data is stored in a PelTiff object, which can be retrieved using the getTiff() method.
$tiff = $exif->getTiff();

// TIFF data is organized as a chain of Image File Directories (IFDs), each represented by a PelIfd object.
$ifd0 = $tiff->getIfd();

// removing GPS data by adding a new empty PelIfd::GPS IFD.
$gps = $ifd0->addSubIfd( new PelIfd( PelIfd::GPS ) );

// saving the new file.
$jpeg->saveFile( $new_filename );

echo "File saved to $new_filename.\n";
