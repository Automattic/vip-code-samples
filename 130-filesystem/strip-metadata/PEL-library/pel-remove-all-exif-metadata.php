<?php
require_once './vendor/autoload.php';

use lsolesen\pel\PelJpeg;
use lsolesen\pel\PelIfd;
use lsolesen\pel\PelTiff;

$filename     = 'img/DSCN0012.jpeg';
$new_filename = 'img/processed-' . basename($filename);

// Creating the PelJpeg object.
$jpeg = new PelJpeg( $filename );

// Get the EXIF data.
$exif = $jpeg->getExif();

// Stripping all EXIF data.
$exif->setTiff( new PelTiff() );

$tiff     = $exif->getTiff();
$pel_ifd0 = $tiff->getIfd();

if ( null === $pel_ifd0 ) {
	$pel_ifd0 = new PelIfd( PelIfd::IFD0 );
	$exif->getTiff()->setIfd( $pel_ifd0 );
}

// saving the new file.
$jpeg->saveFile( $new_filename );

echo "File saved to $new_filename.\n";
