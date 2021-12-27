## Description

This sample script will remove the GPS Exif metadata using the https://github.com/pel/pel PHP Exif Library and save the resulting image.

More samples can be found in https://github.com/pel/pel/tree/master/examples.

## Installation

```
composer install lsolesen/pel
```

## Usage

Strip all Exif metadata:

```
php pel-remove-all-exif-metadata.php
```

Strip only GPS metadata:

```
php pel-remove-exif-gps-metadata.php
```
