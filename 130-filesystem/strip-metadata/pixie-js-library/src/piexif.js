(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.piexif = {})));
}(this, (function (exports) { 'use strict';

  const Types = {
      Byte: 1,
      Ascii: 2,
      Short: 3,
      Long: 4,
      Rational: 5,
      Undefined: 7,
      SLong: 9,
      SRational: 10,
  };

  class ValueConvertError extends Error {
  }

  const ImageTagElement = {
      11: {
          name: 'ProcessingSoftware',
          type: Types.Ascii,
      },
      254: {
          name: 'NewSubfileType',
          type: Types.Long,
      },
      255: {
          name: 'SubfileType',
          type: Types.Short,
      },
      256: {
          name: 'ImageWidth',
          type: Types.Long,
      },
      257: {
          name: 'ImageLength',
          type: Types.Long,
      },
      258: {
          name: 'BitsPerSample',
          type: Types.Short,
      },
      259: {
          name: 'Compression',
          type: Types.Short,
      },
      262: {
          name: 'PhotometricInterpretation',
          type: Types.Short,
      },
      263: {
          name: 'Threshholding',
          type: Types.Short,
      },
      264: {
          name: 'CellWidth',
          type: Types.Short,
      },
      265: {
          name: 'CellLength',
          type: Types.Short,
      },
      266: {
          name: 'FillOrder',
          type: Types.Short,
      },
      269: {
          name: 'DocumentName',
          type: Types.Ascii,
      },
      270: {
          name: 'ImageDescription',
          type: Types.Ascii,
      },
      271: {
          name: 'Make',
          type: Types.Ascii,
      },
      272: {
          name: 'Model',
          type: Types.Ascii,
      },
      273: {
          name: 'StripOffsets',
          type: Types.Long,
      },
      274: {
          name: 'Orientation',
          type: Types.Short,
      },
      277: {
          name: 'SamplesPerPixel',
          type: Types.Short,
      },
      278: {
          name: 'RowsPerStrip',
          type: Types.Long,
      },
      279: {
          name: 'StripByteCounts',
          type: Types.Long,
      },
      282: {
          name: 'XResolution',
          type: Types.Rational,
      },
      283: {
          name: 'YResolution',
          type: Types.Rational,
      },
      284: {
          name: 'PlanarConfiguration',
          type: Types.Short,
      },
      290: {
          name: 'GrayResponseUnit',
          type: Types.Short,
      },
      291: {
          name: 'GrayResponseCurve',
          type: Types.Short,
      },
      292: {
          name: 'T4Options',
          type: Types.Long,
      },
      293: {
          name: 'T6Options',
          type: Types.Long,
      },
      296: {
          name: 'ResolutionUnit',
          type: Types.Short,
      },
      301: {
          name: 'TransferFunction',
          type: Types.Short,
      },
      305: {
          name: 'Software',
          type: Types.Ascii,
      },
      306: {
          name: 'DateTime',
          type: Types.Ascii,
      },
      315: {
          name: 'Artist',
          type: Types.Ascii,
      },
      316: {
          name: 'HostComputer',
          type: Types.Ascii,
      },
      317: {
          name: 'Predictor',
          type: Types.Short,
      },
      318: {
          name: 'WhitePoint',
          type: Types.Rational,
      },
      319: {
          name: 'PrimaryChromaticities',
          type: Types.Rational,
      },
      320: {
          name: 'ColorMap',
          type: Types.Short,
      },
      321: {
          name: 'HalftoneHints',
          type: Types.Short,
      },
      322: {
          name: 'TileWidth',
          type: Types.Short,
      },
      323: {
          name: 'TileLength',
          type: Types.Short,
      },
      324: {
          name: 'TileOffsets',
          type: Types.Short,
      },
      325: {
          name: 'TileByteCounts',
          type: Types.Short,
      },
      330: {
          name: 'SubIFDs',
          type: Types.Long,
      },
      332: {
          name: 'InkSet',
          type: Types.Short,
      },
      333: {
          name: 'InkNames',
          type: Types.Ascii,
      },
      334: {
          name: 'NumberOfInks',
          type: Types.Short,
      },
      336: {
          name: 'DotRange',
          type: Types.Byte,
      },
      337: {
          name: 'TargetPrinter',
          type: Types.Ascii,
      },
      338: {
          name: 'ExtraSamples',
          type: Types.Short,
      },
      339: {
          name: 'SampleFormat',
          type: Types.Short,
      },
      340: {
          name: 'SMinSampleValue',
          type: Types.Short,
      },
      341: {
          name: 'SMaxSampleValue',
          type: Types.Short,
      },
      342: {
          name: 'TransferRange',
          type: Types.Short,
      },
      343: {
          name: 'ClipPath',
          type: Types.Byte,
      },
      344: {
          name: 'XClipPathUnits',
          type: Types.Long,
      },
      345: {
          name: 'YClipPathUnits',
          type: Types.Long,
      },
      346: {
          name: 'Indexed',
          type: Types.Short,
      },
      347: {
          name: 'JPEGTables',
          type: Types.Undefined,
      },
      351: {
          name: 'OPIProxy',
          type: Types.Short,
      },
      512: {
          name: 'JPEGProc',
          type: Types.Long,
      },
      513: {
          name: 'JPEGInterchangeFormat',
          type: Types.Long,
      },
      514: {
          name: 'JPEGInterchangeFormatLength',
          type: Types.Long,
      },
      515: {
          name: 'JPEGRestartInterval',
          type: Types.Short,
      },
      517: {
          name: 'JPEGLosslessPredictors',
          type: Types.Short,
      },
      518: {
          name: 'JPEGPointTransforms',
          type: Types.Short,
      },
      519: {
          name: 'JPEGQTables',
          type: Types.Long,
      },
      520: {
          name: 'JPEGDCTables',
          type: Types.Long,
      },
      521: {
          name: 'JPEGACTables',
          type: Types.Long,
      },
      529: {
          name: 'YCbCrCoefficients',
          type: Types.Rational,
      },
      530: {
          name: 'YCbCrSubSampling',
          type: Types.Short,
      },
      531: {
          name: 'YCbCrPositioning',
          type: Types.Short,
      },
      532: {
          name: 'ReferenceBlackWhite',
          type: Types.Rational,
      },
      700: {
          name: 'XMLPacket',
          type: Types.Byte,
      },
      18246: {
          name: 'Rating',
          type: Types.Short,
      },
      18249: {
          name: 'RatingPercent',
          type: Types.Short,
      },
      32781: {
          name: 'ImageID',
          type: Types.Ascii,
      },
      33421: {
          name: 'CFARepeatPatternDim',
          type: Types.Short,
      },
      33422: {
          name: 'CFAPattern',
          type: Types.Byte,
      },
      33423: {
          name: 'BatteryLevel',
          type: Types.Rational,
      },
      33432: {
          name: 'Copyright',
          type: Types.Ascii,
      },
      33434: {
          name: 'ExposureTime',
          type: Types.Rational,
      },
      34377: {
          name: 'ImageResources',
          type: Types.Byte,
      },
      34665: {
          name: 'ExifTag',
          type: Types.Long,
      },
      34675: {
          name: 'InterColorProfile',
          type: Types.Undefined,
      },
      34853: {
          name: 'GPSTag',
          type: Types.Long,
      },
      34857: {
          name: 'Interlace',
          type: Types.Short,
      },
      34858: {
          name: 'TimeZoneOffset',
          type: Types.Long,
      },
      34859: {
          name: 'SelfTimerMode',
          type: Types.Short,
      },
      37387: {
          name: 'FlashEnergy',
          type: Types.Rational,
      },
      37388: {
          name: 'SpatialFrequencyResponse',
          type: Types.Undefined,
      },
      37389: {
          name: 'Noise',
          type: Types.Undefined,
      },
      37390: {
          name: 'FocalPlaneXResolution',
          type: Types.Rational,
      },
      37391: {
          name: 'FocalPlaneYResolution',
          type: Types.Rational,
      },
      37392: {
          name: 'FocalPlaneResolutionUnit',
          type: Types.Short,
      },
      37393: {
          name: 'ImageNumber',
          type: Types.Long,
      },
      37394: {
          name: 'SecurityClassification',
          type: Types.Ascii,
      },
      37395: {
          name: 'ImageHistory',
          type: Types.Ascii,
      },
      37397: {
          name: 'ExposureIndex',
          type: Types.Rational,
      },
      37398: {
          name: 'TIFFEPStandardID',
          type: Types.Byte,
      },
      37399: {
          name: 'SensingMethod',
          type: Types.Short,
      },
      40091: {
          name: 'XPTitle',
          type: Types.Byte,
      },
      40092: {
          name: 'XPComment',
          type: Types.Byte,
      },
      40093: {
          name: 'XPAuthor',
          type: Types.Byte,
      },
      40094: {
          name: 'XPKeywords',
          type: Types.Byte,
      },
      40095: {
          name: 'XPSubject',
          type: Types.Byte,
      },
      50341: {
          name: 'PrintImageMatching',
          type: Types.Undefined,
      },
      50706: {
          name: 'DNGVersion',
          type: Types.Byte,
      },
      50707: {
          name: 'DNGBackwardVersion',
          type: Types.Byte,
      },
      50708: {
          name: 'UniqueCameraModel',
          type: Types.Ascii,
      },
      50709: {
          name: 'LocalizedCameraModel',
          type: Types.Byte,
      },
      50710: {
          name: 'CFAPlaneColor',
          type: Types.Byte,
      },
      50711: {
          name: 'CFALayout',
          type: Types.Short,
      },
      50712: {
          name: 'LinearizationTable',
          type: Types.Short,
      },
      50713: {
          name: 'BlackLevelRepeatDim',
          type: Types.Short,
      },
      50714: {
          name: 'BlackLevel',
          type: Types.Rational,
      },
      50715: {
          name: 'BlackLevelDeltaH',
          type: Types.SRational,
      },
      50716: {
          name: 'BlackLevelDeltaV',
          type: Types.SRational,
      },
      50717: {
          name: 'WhiteLevel',
          type: Types.Short,
      },
      50718: {
          name: 'DefaultScale',
          type: Types.Rational,
      },
      50719: {
          name: 'DefaultCropOrigin',
          type: Types.Short,
      },
      50720: {
          name: 'DefaultCropSize',
          type: Types.Short,
      },
      50721: {
          name: 'ColorMatrix1',
          type: Types.SRational,
      },
      50722: {
          name: 'ColorMatrix2',
          type: Types.SRational,
      },
      50723: {
          name: 'CameraCalibration1',
          type: Types.SRational,
      },
      50724: {
          name: 'CameraCalibration2',
          type: Types.SRational,
      },
      50725: {
          name: 'ReductionMatrix1',
          type: Types.SRational,
      },
      50726: {
          name: 'ReductionMatrix2',
          type: Types.SRational,
      },
      50727: {
          name: 'AnalogBalance',
          type: Types.Rational,
      },
      50728: {
          name: 'AsShotNeutral',
          type: Types.Short,
      },
      50729: {
          name: 'AsShotWhiteXY',
          type: Types.Rational,
      },
      50730: {
          name: 'BaselineExposure',
          type: Types.SRational,
      },
      50731: {
          name: 'BaselineNoise',
          type: Types.Rational,
      },
      50732: {
          name: 'BaselineSharpness',
          type: Types.Rational,
      },
      50733: {
          name: 'BayerGreenSplit',
          type: Types.Long,
      },
      50734: {
          name: 'LinearResponseLimit',
          type: Types.Rational,
      },
      50735: {
          name: 'CameraSerialNumber',
          type: Types.Ascii,
      },
      50736: {
          name: 'LensInfo',
          type: Types.Rational,
      },
      50737: {
          name: 'ChromaBlurRadius',
          type: Types.Rational,
      },
      50738: {
          name: 'AntiAliasStrength',
          type: Types.Rational,
      },
      50739: {
          name: 'ShadowScale',
          type: Types.SRational,
      },
      50740: {
          name: 'DNGPrivateData',
          type: Types.Byte,
      },
      50741: {
          name: 'MakerNoteSafety',
          type: Types.Short,
      },
      50778: {
          name: 'CalibrationIlluminant1',
          type: Types.Short,
      },
      50779: {
          name: 'CalibrationIlluminant2',
          type: Types.Short,
      },
      50780: {
          name: 'BestQualityScale',
          type: Types.Rational,
      },
      50781: {
          name: 'RawDataUniqueID',
          type: Types.Byte,
      },
      50827: {
          name: 'OriginalRawFileName',
          type: Types.Byte,
      },
      50828: {
          name: 'OriginalRawFileData',
          type: Types.Undefined,
      },
      50829: {
          name: 'ActiveArea',
          type: Types.Short,
      },
      50830: {
          name: 'MaskedAreas',
          type: Types.Short,
      },
      50831: {
          name: 'AsShotICCProfile',
          type: Types.Undefined,
      },
      50832: {
          name: 'AsShotPreProfileMatrix',
          type: Types.SRational,
      },
      50833: {
          name: 'CurrentICCProfile',
          type: Types.Undefined,
      },
      50834: {
          name: 'CurrentPreProfileMatrix',
          type: Types.SRational,
      },
      50879: {
          name: 'ColorimetricReference',
          type: Types.Short,
      },
      50931: {
          name: 'CameraCalibrationSignature',
          type: Types.Byte,
      },
      50932: {
          name: 'ProfileCalibrationSignature',
          type: Types.Byte,
      },
      50934: {
          name: 'AsShotProfileName',
          type: Types.Byte,
      },
      50935: {
          name: 'NoiseReductionApplied',
          type: Types.Rational,
      },
      50936: {
          name: 'ProfileName',
          type: Types.Byte,
      },
      50937: {
          name: 'ProfileHueSatMapDims',
          type: Types.Long,
      },
      50941: {
          name: 'ProfileEmbedPolicy',
          type: Types.Long,
      },
      50942: {
          name: 'ProfileCopyright',
          type: Types.Byte,
      },
      50964: {
          name: 'ForwardMatrix1',
          type: Types.SRational,
      },
      50965: {
          name: 'ForwardMatrix2',
          type: Types.SRational,
      },
      50966: {
          name: 'PreviewApplicationName',
          type: Types.Byte,
      },
      50967: {
          name: 'PreviewApplicationVersion',
          type: Types.Byte,
      },
      50968: {
          name: 'PreviewSettingsName',
          type: Types.Byte,
      },
      50969: {
          name: 'PreviewSettingsDigest',
          type: Types.Byte,
      },
      50970: {
          name: 'PreviewColorSpace',
          type: Types.Long,
      },
      50971: {
          name: 'PreviewDateTime',
          type: Types.Ascii,
      },
      50972: {
          name: 'RawImageDigest',
          type: Types.Undefined,
      },
      50973: {
          name: 'OriginalRawFileDigest',
          type: Types.Undefined,
      },
      50974: {
          name: 'SubTileBlockSize',
          type: Types.Long,
      },
      50975: {
          name: 'RowInterleaveFactor',
          type: Types.Long,
      },
      50981: {
          name: 'ProfileLookTableDims',
          type: Types.Long,
      },
      51008: {
          name: 'OpcodeList1',
          type: Types.Undefined,
      },
      51009: {
          name: 'OpcodeList2',
          type: Types.Undefined,
      },
      51022: {
          name: 'OpcodeList3',
          type: Types.Undefined,
      },
  };
  const Tags = {
      Image: ImageTagElement,
      '0th': ImageTagElement,
      '1st': ImageTagElement,
      Exif: {
          33434: {
              name: 'ExposureTime',
              type: Types.Rational,
          },
          33437: {
              name: 'FNumber',
              type: Types.Rational,
          },
          34850: {
              name: 'ExposureProgram',
              type: Types.Short,
          },
          34852: {
              name: 'SpectralSensitivity',
              type: Types.Ascii,
          },
          34855: {
              name: 'ISOSpeedRatings',
              type: Types.Short,
          },
          34856: {
              name: 'OECF',
              type: Types.Undefined,
          },
          34864: {
              name: 'SensitivityType',
              type: Types.Short,
          },
          34865: {
              name: 'StandardOutputSensitivity',
              type: Types.Long,
          },
          34866: {
              name: 'RecommendedExposureIndex',
              type: Types.Long,
          },
          34867: {
              name: 'ISOSpeed',
              type: Types.Long,
          },
          34868: {
              name: 'ISOSpeedLatitudeyyy',
              type: Types.Long,
          },
          34869: {
              name: 'ISOSpeedLatitudezzz',
              type: Types.Long,
          },
          36864: {
              name: 'ExifVersion',
              type: Types.Undefined,
          },
          36867: {
              name: 'DateTimeOriginal',
              type: Types.Ascii,
          },
          36868: {
              name: 'DateTimeDigitized',
              type: Types.Ascii,
          },
          37121: {
              name: 'ComponentsConfiguration',
              type: Types.Undefined,
          },
          37122: {
              name: 'CompressedBitsPerPixel',
              type: Types.Rational,
          },
          37377: {
              name: 'ShutterSpeedValue',
              type: Types.SRational,
          },
          37378: {
              name: 'ApertureValue',
              type: Types.Rational,
          },
          37379: {
              name: 'BrightnessValue',
              type: Types.SRational,
          },
          37380: {
              name: 'ExposureBiasValue',
              type: Types.SRational,
          },
          37381: {
              name: 'MaxApertureValue',
              type: Types.Rational,
          },
          37382: {
              name: 'SubjectDistance',
              type: Types.Rational,
          },
          37383: {
              name: 'MeteringMode',
              type: Types.Short,
          },
          37384: {
              name: 'LightSource',
              type: Types.Short,
          },
          37385: {
              name: 'Flash',
              type: Types.Short,
          },
          37386: {
              name: 'FocalLength',
              type: Types.Rational,
          },
          37396: {
              name: 'SubjectArea',
              type: Types.Short,
          },
          37500: {
              name: 'MakerNote',
              type: Types.Undefined,
          },
          37510: {
              name: 'UserComment',
              type: Types.Ascii,
          },
          37520: {
              name: 'SubSecTime',
              type: Types.Ascii,
          },
          37521: {
              name: 'SubSecTimeOriginal',
              type: Types.Ascii,
          },
          37522: {
              name: 'SubSecTimeDigitized',
              type: Types.Ascii,
          },
          40960: {
              name: 'FlashpixVersion',
              type: Types.Undefined,
          },
          40961: {
              name: 'ColorSpace',
              type: Types.Short,
          },
          40962: {
              name: 'PixelXDimension',
              type: Types.Long,
          },
          40963: {
              name: 'PixelYDimension',
              type: Types.Long,
          },
          40964: {
              name: 'RelatedSoundFile',
              type: Types.Ascii,
          },
          40965: {
              name: 'InteroperabilityTag',
              type: Types.Long,
          },
          41483: {
              name: 'FlashEnergy',
              type: Types.Rational,
          },
          41484: {
              name: 'SpatialFrequencyResponse',
              type: Types.Undefined,
          },
          41486: {
              name: 'FocalPlaneXResolution',
              type: Types.Rational,
          },
          41487: {
              name: 'FocalPlaneYResolution',
              type: Types.Rational,
          },
          41488: {
              name: 'FocalPlaneResolutionUnit',
              type: Types.Short,
          },
          41492: {
              name: 'SubjectLocation',
              type: Types.Short,
          },
          41493: {
              name: 'ExposureIndex',
              type: Types.Rational,
          },
          41495: {
              name: 'SensingMethod',
              type: Types.Short,
          },
          41728: {
              name: 'FileSource',
              type: Types.Undefined,
          },
          41729: {
              name: 'SceneType',
              type: Types.Undefined,
          },
          41730: {
              name: 'CFAPattern',
              type: Types.Undefined,
          },
          41985: {
              name: 'CustomRendered',
              type: Types.Short,
          },
          41986: {
              name: 'ExposureMode',
              type: Types.Short,
          },
          41987: {
              name: 'WhiteBalance',
              type: Types.Short,
          },
          41988: {
              name: 'DigitalZoomRatio',
              type: Types.Rational,
          },
          41989: {
              name: 'FocalLengthIn35mmFilm',
              type: Types.Short,
          },
          41990: {
              name: 'SceneCaptureType',
              type: Types.Short,
          },
          41991: {
              name: 'GainControl',
              type: Types.Short,
          },
          41992: {
              name: 'Contrast',
              type: Types.Short,
          },
          41993: {
              name: 'Saturation',
              type: Types.Short,
          },
          41994: {
              name: 'Sharpness',
              type: Types.Short,
          },
          41995: {
              name: 'DeviceSettingDescription',
              type: Types.Undefined,
          },
          41996: {
              name: 'SubjectDistanceRange',
              type: Types.Short,
          },
          42016: {
              name: 'ImageUniqueID',
              type: Types.Ascii,
          },
          42032: {
              name: 'CameraOwnerName',
              type: Types.Ascii,
          },
          42033: {
              name: 'BodySerialNumber',
              type: Types.Ascii,
          },
          42034: {
              name: 'LensSpecification',
              type: Types.Rational,
          },
          42035: {
              name: 'LensMake',
              type: Types.Ascii,
          },
          42036: {
              name: 'LensModel',
              type: Types.Ascii,
          },
          42037: {
              name: 'LensSerialNumber',
              type: Types.Ascii,
          },
          42240: {
              name: 'Gamma',
              type: Types.Rational,
          },
      },
      GPS: {
          0: {
              name: 'GPSVersionID',
              type: Types.Byte,
          },
          1: {
              name: 'GPSLatitudeRef',
              type: Types.Ascii,
          },
          2: {
              name: 'GPSLatitude',
              type: Types.Rational,
          },
          3: {
              name: 'GPSLongitudeRef',
              type: Types.Ascii,
          },
          4: {
              name: 'GPSLongitude',
              type: Types.Rational,
          },
          5: {
              name: 'GPSAltitudeRef',
              type: Types.Byte,
          },
          6: {
              name: 'GPSAltitude',
              type: Types.Rational,
          },
          7: {
              name: 'GPSTimeStamp',
              type: Types.Rational,
          },
          8: {
              name: 'GPSSatellites',
              type: Types.Ascii,
          },
          9: {
              name: 'GPSStatus',
              type: Types.Ascii,
          },
          10: {
              name: 'GPSMeasureMode',
              type: Types.Ascii,
          },
          11: {
              name: 'GPSDOP',
              type: Types.Rational,
          },
          12: {
              name: 'GPSSpeedRef',
              type: Types.Ascii,
          },
          13: {
              name: 'GPSSpeed',
              type: Types.Rational,
          },
          14: {
              name: 'GPSTrackRef',
              type: Types.Ascii,
          },
          15: {
              name: 'GPSTrack',
              type: Types.Rational,
          },
          16: {
              name: 'GPSImgDirectionRef',
              type: Types.Ascii,
          },
          17: {
              name: 'GPSImgDirection',
              type: Types.Rational,
          },
          18: {
              name: 'GPSMapDatum',
              type: Types.Ascii,
          },
          19: {
              name: 'GPSDestLatitudeRef',
              type: Types.Ascii,
          },
          20: {
              name: 'GPSDestLatitude',
              type: Types.Rational,
          },
          21: {
              name: 'GPSDestLongitudeRef',
              type: Types.Ascii,
          },
          22: {
              name: 'GPSDestLongitude',
              type: Types.Rational,
          },
          23: {
              name: 'GPSDestBearingRef',
              type: Types.Ascii,
          },
          24: {
              name: 'GPSDestBearing',
              type: Types.Rational,
          },
          25: {
              name: 'GPSDestDistanceRef',
              type: Types.Ascii,
          },
          26: {
              name: 'GPSDestDistance',
              type: Types.Rational,
          },
          27: {
              name: 'GPSProcessingMethod',
              type: Types.Undefined,
          },
          28: {
              name: 'GPSAreaInformation',
              type: Types.Undefined,
          },
          29: {
              name: 'GPSDateStamp',
              type: Types.Ascii,
          },
          30: {
              name: 'GPSDifferential',
              type: Types.Short,
          },
          31: {
              name: 'GPSHPositioningError',
              type: Types.Rational,
          },
      },
      Interop: {
          1: {
              name: 'InteroperabilityIndex',
              type: Types.Ascii,
          },
      },
  };
  const TagValues = {
      ImageIFD: {
          ProcessingSoftware: 11,
          NewSubfileType: 254,
          SubfileType: 255,
          ImageWidth: 256,
          ImageLength: 257,
          BitsPerSample: 258,
          Compression: 259,
          PhotometricInterpretation: 262,
          Threshholding: 263,
          CellWidth: 264,
          CellLength: 265,
          FillOrder: 266,
          DocumentName: 269,
          ImageDescription: 270,
          Make: 271,
          Model: 272,
          StripOffsets: 273,
          Orientation: 274,
          SamplesPerPixel: 277,
          RowsPerStrip: 278,
          StripByteCounts: 279,
          XResolution: 282,
          YResolution: 283,
          PlanarConfiguration: 284,
          GrayResponseUnit: 290,
          GrayResponseCurve: 291,
          T4Options: 292,
          T6Options: 293,
          ResolutionUnit: 296,
          TransferFunction: 301,
          Software: 305,
          DateTime: 306,
          Artist: 315,
          HostComputer: 316,
          Predictor: 317,
          WhitePoint: 318,
          PrimaryChromaticities: 319,
          ColorMap: 320,
          HalftoneHints: 321,
          TileWidth: 322,
          TileLength: 323,
          TileOffsets: 324,
          TileByteCounts: 325,
          SubIFDs: 330,
          InkSet: 332,
          InkNames: 333,
          NumberOfInks: 334,
          DotRange: 336,
          TargetPrinter: 337,
          ExtraSamples: 338,
          SampleFormat: 339,
          SMinSampleValue: 340,
          SMaxSampleValue: 341,
          TransferRange: 342,
          ClipPath: 343,
          XClipPathUnits: 344,
          YClipPathUnits: 345,
          Indexed: 346,
          JPEGTables: 347,
          OPIProxy: 351,
          JPEGProc: 512,
          JPEGInterchangeFormat: 513,
          JPEGInterchangeFormatLength: 514,
          JPEGRestartInterval: 515,
          JPEGLosslessPredictors: 517,
          JPEGPointTransforms: 518,
          JPEGQTables: 519,
          JPEGDCTables: 520,
          JPEGACTables: 521,
          YCbCrCoefficients: 529,
          YCbCrSubSampling: 530,
          YCbCrPositioning: 531,
          ReferenceBlackWhite: 532,
          XMLPacket: 700,
          Rating: 18246,
          RatingPercent: 18249,
          ImageID: 32781,
          CFARepeatPatternDim: 33421,
          CFAPattern: 33422,
          BatteryLevel: 33423,
          Copyright: 33432,
          ExposureTime: 33434,
          ImageResources: 34377,
          ExifTag: 34665,
          InterColorProfile: 34675,
          GPSTag: 34853,
          Interlace: 34857,
          TimeZoneOffset: 34858,
          SelfTimerMode: 34859,
          FlashEnergy: 37387,
          SpatialFrequencyResponse: 37388,
          Noise: 37389,
          FocalPlaneXResolution: 37390,
          FocalPlaneYResolution: 37391,
          FocalPlaneResolutionUnit: 37392,
          ImageNumber: 37393,
          SecurityClassification: 37394,
          ImageHistory: 37395,
          ExposureIndex: 37397,
          TIFFEPStandardID: 37398,
          SensingMethod: 37399,
          XPTitle: 40091,
          XPComment: 40092,
          XPAuthor: 40093,
          XPKeywords: 40094,
          XPSubject: 40095,
          PrintImageMatching: 50341,
          DNGVersion: 50706,
          DNGBackwardVersion: 50707,
          UniqueCameraModel: 50708,
          LocalizedCameraModel: 50709,
          CFAPlaneColor: 50710,
          CFALayout: 50711,
          LinearizationTable: 50712,
          BlackLevelRepeatDim: 50713,
          BlackLevel: 50714,
          BlackLevelDeltaH: 50715,
          BlackLevelDeltaV: 50716,
          WhiteLevel: 50717,
          DefaultScale: 50718,
          DefaultCropOrigin: 50719,
          DefaultCropSize: 50720,
          ColorMatrix1: 50721,
          ColorMatrix2: 50722,
          CameraCalibration1: 50723,
          CameraCalibration2: 50724,
          ReductionMatrix1: 50725,
          ReductionMatrix2: 50726,
          AnalogBalance: 50727,
          AsShotNeutral: 50728,
          AsShotWhiteXY: 50729,
          BaselineExposure: 50730,
          BaselineNoise: 50731,
          BaselineSharpness: 50732,
          BayerGreenSplit: 50733,
          LinearResponseLimit: 50734,
          CameraSerialNumber: 50735,
          LensInfo: 50736,
          ChromaBlurRadius: 50737,
          AntiAliasStrength: 50738,
          ShadowScale: 50739,
          DNGPrivateData: 50740,
          MakerNoteSafety: 50741,
          CalibrationIlluminant1: 50778,
          CalibrationIlluminant2: 50779,
          BestQualityScale: 50780,
          RawDataUniqueID: 50781,
          OriginalRawFileName: 50827,
          OriginalRawFileData: 50828,
          ActiveArea: 50829,
          MaskedAreas: 50830,
          AsShotICCProfile: 50831,
          AsShotPreProfileMatrix: 50832,
          CurrentICCProfile: 50833,
          CurrentPreProfileMatrix: 50834,
          ColorimetricReference: 50879,
          CameraCalibrationSignature: 50931,
          ProfileCalibrationSignature: 50932,
          AsShotProfileName: 50934,
          NoiseReductionApplied: 50935,
          ProfileName: 50936,
          ProfileHueSatMapDims: 50937,
          ProfileHueSatMapData1: 50938,
          ProfileHueSatMapData2: 50939,
          ProfileToneCurve: 50940,
          ProfileEmbedPolicy: 50941,
          ProfileCopyright: 50942,
          ForwardMatrix1: 50964,
          ForwardMatrix2: 50965,
          PreviewApplicationName: 50966,
          PreviewApplicationVersion: 50967,
          PreviewSettingsName: 50968,
          PreviewSettingsDigest: 50969,
          PreviewColorSpace: 50970,
          PreviewDateTime: 50971,
          RawImageDigest: 50972,
          OriginalRawFileDigest: 50973,
          SubTileBlockSize: 50974,
          RowInterleaveFactor: 50975,
          ProfileLookTableDims: 50981,
          ProfileLookTableData: 50982,
          OpcodeList1: 51008,
          OpcodeList2: 51009,
          OpcodeList3: 51022,
          NoiseProfile: 51041,
      },
      ExifIFD: {
          ExposureTime: 33434,
          FNumber: 33437,
          ExposureProgram: 34850,
          SpectralSensitivity: 34852,
          ISOSpeedRatings: 34855,
          OECF: 34856,
          SensitivityType: 34864,
          StandardOutputSensitivity: 34865,
          RecommendedExposureIndex: 34866,
          ISOSpeed: 34867,
          ISOSpeedLatitudeyyy: 34868,
          ISOSpeedLatitudezzz: 34869,
          ExifVersion: 36864,
          DateTimeOriginal: 36867,
          DateTimeDigitized: 36868,
          ComponentsConfiguration: 37121,
          CompressedBitsPerPixel: 37122,
          ShutterSpeedValue: 37377,
          ApertureValue: 37378,
          BrightnessValue: 37379,
          ExposureBiasValue: 37380,
          MaxApertureValue: 37381,
          SubjectDistance: 37382,
          MeteringMode: 37383,
          LightSource: 37384,
          Flash: 37385,
          FocalLength: 37386,
          SubjectArea: 37396,
          MakerNote: 37500,
          UserComment: 37510,
          SubSecTime: 37520,
          SubSecTimeOriginal: 37521,
          SubSecTimeDigitized: 37522,
          FlashpixVersion: 40960,
          ColorSpace: 40961,
          PixelXDimension: 40962,
          PixelYDimension: 40963,
          RelatedSoundFile: 40964,
          InteroperabilityTag: 40965,
          FlashEnergy: 41483,
          SpatialFrequencyResponse: 41484,
          FocalPlaneXResolution: 41486,
          FocalPlaneYResolution: 41487,
          FocalPlaneResolutionUnit: 41488,
          SubjectLocation: 41492,
          ExposureIndex: 41493,
          SensingMethod: 41495,
          FileSource: 41728,
          SceneType: 41729,
          CFAPattern: 41730,
          CustomRendered: 41985,
          ExposureMode: 41986,
          WhiteBalance: 41987,
          DigitalZoomRatio: 41988,
          FocalLengthIn35mmFilm: 41989,
          SceneCaptureType: 41990,
          GainControl: 41991,
          Contrast: 41992,
          Saturation: 41993,
          Sharpness: 41994,
          DeviceSettingDescription: 41995,
          SubjectDistanceRange: 41996,
          ImageUniqueID: 42016,
          CameraOwnerName: 42032,
          BodySerialNumber: 42033,
          LensSpecification: 42034,
          LensMake: 42035,
          LensModel: 42036,
          LensSerialNumber: 42037,
          Gamma: 42240,
      },
      GPSIFD: {
          GPSVersionID: 0,
          GPSLatitudeRef: 1,
          GPSLatitude: 2,
          GPSLongitudeRef: 3,
          GPSLongitude: 4,
          GPSAltitudeRef: 5,
          GPSAltitude: 6,
          GPSTimeStamp: 7,
          GPSSatellites: 8,
          GPSStatus: 9,
          GPSMeasureMode: 10,
          GPSDOP: 11,
          GPSSpeedRef: 12,
          GPSSpeed: 13,
          GPSTrackRef: 14,
          GPSTrack: 15,
          GPSImgDirectionRef: 16,
          GPSImgDirection: 17,
          GPSMapDatum: 18,
          GPSDestLatitudeRef: 19,
          GPSDestLatitude: 20,
          GPSDestLongitudeRef: 21,
          GPSDestLongitude: 22,
          GPSDestBearingRef: 23,
          GPSDestBearing: 24,
          GPSDestDistanceRef: 25,
          GPSDestDistance: 26,
          GPSProcessingMethod: 27,
          GPSAreaInformation: 28,
          GPSDateStamp: 29,
          GPSDifferential: 30,
          GPSHPositioningError: 31,
      },
      InteropIFD: {
          InteroperabilityIndex: 1,
      },
  };

  let errorBypass = false;
  let errorCallback = undefined;
  function setErrorByPass(bypass, errorcallback) {
      errorBypass = bypass;
      errorCallback = errorcallback;
  }
  function throwError(error) {
      if (errorBypass) {
          if (errorCallback) {
              errorCallback(error);
          }
      }
      else {
          throw new Error(error);
      }
  }
  const _nLoopStr = (ch, num) => {
      let str = '';
      for (let i = 0; i < num; i++) {
          str += ch;
      }
      return str;
  };
  const pack = (mark, array) => {
      if (!(array instanceof Array)) {
          throwError("'pack' error. Got invalid type argument.");
          return '';
      }
      if (mark.length - 1 != array.length) {
          throwError(`'pack' error. ${mark.length - 1} marks, ${array.length} elements.`);
          return '';
      }
      let littleEndian;
      if (mark[0] == '<') {
          littleEndian = true;
      }
      else if (mark[0] == '>') {
          littleEndian = false;
      }
      else {
          throwError('Not match any endian.');
          return '';
      }
      let packed = '';
      let p = 1;
      let val = null;
      let c = null;
      let valBinary = null;
      while ((c = mark[p])) {
          if (c.toLowerCase() == 'b') {
              val = array[p - 1];
              if (c == 'b' && val < 0) {
                  val += 0x100;
              }
              if (val > 0xff || val < 0) {
                  throwError("'pack' error.");
                  return '';
              }
              else {
                  valBinary = String.fromCharCode(val);
              }
          }
          else if (c == 'H') {
              val = array[p - 1];
              if (val > 0xffff || val < 0) {
                  throwError("'pack' error.");
                  return '';
              }
              else {
                  valBinary =
                      String.fromCharCode(Math.floor((val % 0x10000) / 0x100)) +
                          String.fromCharCode(val % 0x100);
                  if (littleEndian) {
                      valBinary = valBinary
                          .split('')
                          .reverse()
                          .join('');
                  }
              }
          }
          else if (c.toLowerCase() == 'l') {
              val = array[p - 1];
              if (c == 'l' && val < 0) {
                  val += 0x100000000;
              }
              if (val > 0xffffffff || val < 0) {
                  throwError("'pack' error.");
                  return '';
              }
              else {
                  valBinary =
                      String.fromCharCode(Math.floor(val / 0x1000000)) +
                          String.fromCharCode(Math.floor((val % 0x1000000) / 0x10000)) +
                          String.fromCharCode(Math.floor((val % 0x10000) / 0x100)) +
                          String.fromCharCode(val % 0x100);
                  if (littleEndian) {
                      valBinary = valBinary
                          .split('')
                          .reverse()
                          .join('');
                  }
              }
          }
          else {
              throwError("'pack' error.");
              return '';
          }
          packed += valBinary;
          p += 1;
      }
      return packed;
  };
  const unpack = (mark, str) => {
      if (typeof str != 'string') {
          throwError("'unpack' error. Got invalid type argument.");
          return [null];
      }
      let l = 0;
      for (let markPointer = 1; markPointer < mark.length; markPointer++) {
          if (mark[markPointer].toLowerCase() == 'b') {
              l += 1;
          }
          else if (mark[markPointer].toLowerCase() == 'h') {
              l += 2;
          }
          else if (mark[markPointer].toLowerCase() == 'l') {
              l += 4;
          }
          else {
              throwError("'unpack' error. Got invalid mark.");
              return [null];
          }
      }
      if (l != str.length) {
          throwError("'unpack' error. Mismatch between symbol and string length. " +
              l +
              ':' +
              str.length);
          return [null];
      }
      let littleEndian;
      if (mark[0] == '<') {
          littleEndian = true;
      }
      else if (mark[0] == '>') {
          littleEndian = false;
      }
      else {
          throwError("'unpack' error.");
          return [null];
      }
      const unpacked = [];
      let strPointer = 0;
      let p = 1;
      let val = null;
      let c = null;
      let length = null;
      let sliced = '';
      while ((c = mark[p])) {
          if (c.toLowerCase() == 'b') {
              length = 1;
              sliced = str.slice(strPointer, strPointer + length);
              val = sliced.charCodeAt(0);
              if (c == 'b' && val >= 0x80) {
                  val -= 0x100;
              }
          }
          else if (c == 'H') {
              length = 2;
              sliced = str.slice(strPointer, strPointer + length);
              if (littleEndian) {
                  sliced = sliced
                      .split('')
                      .reverse()
                      .join('');
              }
              val = sliced.charCodeAt(0) * 0x100 + sliced.charCodeAt(1);
          }
          else if (c.toLowerCase() == 'l') {
              length = 4;
              sliced = str.slice(strPointer, strPointer + length);
              if (littleEndian) {
                  sliced = sliced
                      .split('')
                      .reverse()
                      .join('');
              }
              val =
                  sliced.charCodeAt(0) * 0x1000000 +
                      sliced.charCodeAt(1) * 0x10000 +
                      sliced.charCodeAt(2) * 0x100 +
                      sliced.charCodeAt(3);
              if (c == 'l' && val >= 0x80000000) {
                  val -= 0x100000000;
              }
          }
          else {
              throwError("'unpack' error. " + c);
              return [null];
          }
          unpacked.push(val);
          strPointer += length;
          p += 1;
      }
      return unpacked;
  };
  const _isBrowser = new Function('try {return this===window;}catch(e){ return false;}')();
  const atob = _isBrowser
      ? window.atob
      : (input) => {
          const decoded = Buffer.from(input, 'base64');
          return decoded;
      };
  const btoa = _isBrowser
      ? window.btoa
      : (input) => {
          const buf = Buffer.from(input);
          const encoded = buf.toString('base64');
          return encoded;
      };
  const _packByte = (array) => {
      return pack('>' + _nLoopStr('B', array.length), array);
  };
  const _packShort = (array) => {
      return pack('>' + _nLoopStr('H', array.length), array);
  };
  const _packLong = (array) => {
      return pack('>' + _nLoopStr('L', array.length), array);
  };
  const copy = (obj) => {
      const copied = {};
      Object.assign(copied, obj);
      return obj;
  };
  const getThumbnail = (jpeg) => {
      let segments = splitIntoSegments(jpeg);
      while ('\xff\xe0' <= segments[1].slice(0, 2) &&
          segments[1].slice(0, 2) <= '\xff\xef') {
          segments = [segments[0]].concat(segments.slice(2));
      }
      return segments.join('');
  };
  const _valueToBytes = (rawValue, valueType, offset) => {
      let tagBinary;
      if (valueType == Types.Byte) {
          tagBinary = _toByte(rawValue, offset);
      }
      else if (valueType == Types.Ascii) {
          tagBinary = _toAscii(rawValue, offset);
      }
      else if (valueType == Types.Short) {
          tagBinary = _toShort(rawValue, offset);
      }
      else if (valueType == Types.Long) {
          tagBinary = _toLong(rawValue, offset);
      }
      else if (valueType == Types.Rational) {
          tagBinary = _toRational(rawValue, offset);
      }
      else if (valueType == Types.Undefined) {
          tagBinary = _toUndefined(rawValue, offset);
      }
      else if (valueType == Types.SLong) {
          throw new Error('Not implemented for SLong value');
      }
      else if (valueType == Types.SRational) {
          tagBinary = _toSRational(rawValue, offset);
      }
      else {
          throw new Error('Got unhandled exif value type.');
      }
      return tagBinary;
  };
  const _toByte = (rawValue, offset) => {
      if (typeof rawValue == 'number') {
          rawValue = [rawValue];
      }
      else if (Array.isArray(rawValue) && typeof rawValue[0] === 'number') ;
      else {
          const t = Array.isArray(rawValue) ? 'Array' : typeof rawValue;
          throw new ValueConvertError(`Value must be "number" or "Array<number>".\n` +
              `Value: ${rawValue}\n` +
              `Type: ${t}`);
      }
      const length = rawValue.length;
      const tagBinary = {
          value: '',
          lengthBinary: '',
          fourBytesOver: '',
      };
      if (length <= 4) {
          tagBinary.value = _packByte(rawValue) + _nLoopStr('\x00', 4 - length);
      }
      else {
          tagBinary.value = pack('>L', [offset]);
          tagBinary.fourBytesOver = _packByte(rawValue);
      }
      tagBinary.lengthBinary = pack('>L', [length]);
      return tagBinary;
  };
  const _toAscii = (rawValue, offset) => {
      if (typeof rawValue !== 'string') {
          const t = Array.isArray(rawValue) ? 'Array' : typeof rawValue;
          throw new ValueConvertError(`Value must be "string". Got "${t}".`);
      }
      const newValue = rawValue + '\x00';
      const length = newValue.length;
      const tagBinary = {
          value: '',
          lengthBinary: '',
          fourBytesOver: '',
      };
      if (length > 4) {
          tagBinary.value = pack('>L', [offset]);
          tagBinary.fourBytesOver = newValue;
      }
      else {
          tagBinary.value = newValue + _nLoopStr('\x00', 4 - length);
      }
      tagBinary.lengthBinary = pack('>L', [length]);
      return tagBinary;
  };
  const _toShort = (rawValue, offset) => {
      if (typeof rawValue == 'number') {
          rawValue = [rawValue];
      }
      else if (Array.isArray(rawValue) && typeof rawValue[0] === 'number') ;
      else {
          const t = Array.isArray(rawValue) ? 'Array' : typeof rawValue;
          throw new ValueConvertError(`Value must be "number" or "Array<number>".\n` +
              `Value: ${rawValue}\n` +
              `Type: ${t}`);
      }
      const length = rawValue.length;
      const tagBinary = {
          value: '',
          lengthBinary: '',
          fourBytesOver: '',
      };
      if (length <= 2) {
          tagBinary.value = _packShort(rawValue) + _nLoopStr('\x00\x00', 2 - length);
      }
      else {
          tagBinary.value = pack('>L', [offset]);
          tagBinary.fourBytesOver = _packShort(rawValue);
      }
      tagBinary.lengthBinary = pack('>L', [length]);
      return tagBinary;
  };
  const _toLong = (rawValue, offset) => {
      if (typeof rawValue == 'number') {
          rawValue = [rawValue];
      }
      else if (Array.isArray(rawValue) && typeof rawValue[0] === 'number') ;
      else {
          const t = Array.isArray(rawValue) ? 'Array' : typeof rawValue;
          throw new ValueConvertError(`Value must be "number" or "Array<number>".\n` +
              `Value: ${rawValue}\n` +
              `Type: ${t}`);
      }
      const length = rawValue.length;
      const tagBinary = {
          value: '',
          lengthBinary: '',
          fourBytesOver: '',
      };
      if (length <= 1) {
          tagBinary.value = _packLong(rawValue);
      }
      else {
          tagBinary.value = pack('>L', [offset]);
          tagBinary.fourBytesOver = _packLong(rawValue);
      }
      tagBinary.lengthBinary = pack('>L', [length]);
      return tagBinary;
  };
  const _toRational = (rawValue, offset) => {
      if (Array.isArray(rawValue) &&
          typeof rawValue[0] === 'number' &&
          rawValue.length === 2) {
          rawValue = [rawValue];
      }
      else if (Array.isArray(rawValue) &&
          Array.isArray(rawValue[0]) &&
          typeof rawValue[0][0] === 'number') ;
      else {
          let t = Array.isArray(rawValue) ? 'Array' : typeof rawValue;
          t = t == 'Array' ? `Array<${typeof rawValue[0]}>` : t;
          throw new ValueConvertError(`Value must be "Array<number>" or "Array<Array<number>>". Got "${t}".`);
      }
      const tagBinary = {
          value: '',
          lengthBinary: '',
          fourBytesOver: '',
      };
      const length = rawValue.length;
      let newValue = '';
      for (let n = 0; n < length; n++) {
          const num = rawValue[n][0];
          const den = rawValue[n][1];
          newValue += pack('>L', [num]) + pack('>L', [den]);
      }
      tagBinary.lengthBinary = pack('>L', [length]);
      tagBinary.value = pack('>L', [offset]);
      tagBinary.fourBytesOver = newValue;
      return tagBinary;
  };
  const _toUndefined = (rawValue, offset) => {
      if (typeof rawValue !== 'string') {
          const t = Array.isArray(rawValue) ? 'Array' : typeof rawValue;
          throw new ValueConvertError(`Value must be "string". Got "${t}".`);
      }
      const length = rawValue.length;
      const tagBinary = {
          value: '',
          lengthBinary: '',
          fourBytesOver: '',
      };
      if (length > 4) {
          tagBinary.value = pack('>L', [offset]);
          tagBinary.fourBytesOver = rawValue;
      }
      else {
          tagBinary.value = rawValue + _nLoopStr('\x00', 4 - length);
      }
      tagBinary.lengthBinary = pack('>L', [length]);
      return tagBinary;
  };
  const _toSRational = (rawValue, offset) => {
      if (Array.isArray(rawValue) &&
          typeof rawValue[0] === 'number' &&
          rawValue.length === 2) {
          rawValue = [rawValue];
      }
      else if (Array.isArray(rawValue) &&
          Array.isArray(rawValue[0]) &&
          typeof rawValue[0][0] === 'number') ;
      else {
          let t = Array.isArray(rawValue) ? 'Array' : typeof rawValue;
          t = t == 'Array' ? `Array<${typeof rawValue[0]}>` : t;
          throw new ValueConvertError(`Value must be "Array<number>" or "Array<Array<number>>". Got "${t}".`);
      }
      const tagBinary = {
          value: '',
          lengthBinary: '',
          fourBytesOver: '',
      };
      const length = rawValue.length;
      let newValue = '';
      for (let n = 0; n < length; n++) {
          const num = rawValue[n][0];
          const den = rawValue[n][1];
          newValue += pack('>l', [num]) + pack('>l', [den]);
      }
      tagBinary.lengthBinary = pack('>L', [length]);
      tagBinary.value = pack('>L', [offset]);
      tagBinary.fourBytesOver = newValue;
      return tagBinary;
  };
  const dictToBytes = (ifdObj, ifdName, ifdOffsetCount) => {
      const TIFF_HEADER_LENGTH = 8;
      const tagCount = Object.keys(ifdObj).length;
      const entryHeader = pack('>H', [tagCount]);
      let entriesLength;
      if (['0th', '1st'].indexOf(ifdName) > -1) {
          entriesLength = 2 + tagCount * 12 + 4;
      }
      else {
          entriesLength = 2 + tagCount * 12;
      }
      let entries = '';
      let values = '';
      let key;
      for (key in ifdObj) {
          if (typeof key == 'string') {
              key = parseInt(key);
          }
          if (ifdName == '0th' && [34665, 34853].indexOf(key) > -1) {
              continue;
          }
          else if (ifdName == 'Exif' && key == 40965) {
              continue;
          }
          else if (ifdName == '1st' && [513, 514].indexOf(key) > -1) {
              continue;
          }
          const rawValue = ifdObj[key];
          const keyBinary = pack('>H', [key]);
          const valueType = Tags[ifdName][key]['type'];
          const typeBinary = pack('>H', [valueType]);
          const offset = TIFF_HEADER_LENGTH + entriesLength + ifdOffsetCount + values.length;
          let b;
          try {
              b = _valueToBytes(rawValue, valueType, offset);
          }
          catch (e) {
              if (e instanceof ValueConvertError) {
                  const _ifdName = ['0th', '1st'].includes(ifdName) ? 'Image' : ifdName;
                  const tagName = Tags[_ifdName][key]['name'];
                  const errorMessage = `Can't convert ${tagName} in ${ifdName} IFD.\r`;
                  e.message = errorMessage + e.message;
              }
              throw e;
          }
          entries += keyBinary + typeBinary + b.lengthBinary + b.value;
          values += b.fourBytesOver;
      }
      return [entryHeader + entries, values];
  };
  class ExifReader {
      constructor(exifBinary) {
          this.getIfd = (pointer, ifdName) => {
              const tagCount = unpack(this.endianMark + 'H', this.tiftag.slice(pointer, pointer + 2))[0];
              if (tagCount == null || tagCount == 0) {
                  return null;
              }
              const ifdObj = {};
              const offset = pointer + 2;
              let t;
              if (['0th', '1st'].indexOf(ifdName) > -1) {
                  t = 'Image';
              }
              else {
                  t = ifdName;
              }
              for (let x = 0; x < tagCount; x++) {
                  pointer = offset + 12 * x;
                  const tag = unpack(this.endianMark + 'H', this.tiftag.slice(pointer, pointer + 2))[0];
                  const valueType = unpack(this.endianMark + 'H', this.tiftag.slice(pointer + 2, pointer + 4))[0];
                  const valueNum = unpack(this.endianMark + 'L', this.tiftag.slice(pointer + 4, pointer + 8))[0];
                  const value = this.tiftag.slice(pointer + 8, pointer + 12);
                  const valueSet = [valueType, valueNum, value];
                  if (tag !== null && tag in Tags[t]) {
                      ifdObj[tag] = this.convertValue(valueSet);
                  }
              }
              return ifdObj;
          };
          this.getFirstIfdPointer = (pointer, ifdName) => {
              const tagCount = unpack(this.endianMark + 'H', this.tiftag.slice(pointer, pointer + 2))[0];
              if (tagCount == null || tagCount == 0) {
                  return null;
              }
              const offset = pointer + 2;
              let firstIfdPointer;
              if (ifdName == '0th') {
                  pointer = offset + 12 * tagCount;
                  firstIfdPointer = this.tiftag.slice(pointer, pointer + 4);
              }
              return firstIfdPointer;
          };
          this.convertValue = (val) => {
              let data = null;
              const t = val[0];
              const length = val[1];
              const value = val[2];
              let pointer;
              if (t == 1) {
                  // BYTE
                  if (length > 4) {
                      pointer = unpack(this.endianMark + 'L', value)[0];
                      if (pointer !== null) {
                          data = unpack(this.endianMark + _nLoopStr('B', length), this.tiftag.slice(pointer, pointer + length));
                      }
                  }
                  else {
                      data = unpack(this.endianMark + _nLoopStr('B', length), value.slice(0, length));
                  }
              }
              else if (t == 2) {
                  // ASCII
                  if (length > 4) {
                      pointer = unpack(this.endianMark + 'L', value)[0];
                      if (pointer !== null) {
                          data = this.tiftag.slice(pointer, pointer + length - 1);
                      }
                  }
                  else {
                      data = value.slice(0, length - 1);
                  }
              }
              else if (t == 3) {
                  // SHORT
                  if (length > 2) {
                      pointer = unpack(this.endianMark + 'L', value)[0];
                      if (pointer !== null) {
                          data = unpack(this.endianMark + _nLoopStr('H', length), this.tiftag.slice(pointer, pointer + length * 2));
                      }
                  }
                  else {
                      data = unpack(this.endianMark + _nLoopStr('H', length), value.slice(0, length * 2));
                  }
              }
              else if (t == 4) {
                  // LONG
                  if (length > 1) {
                      pointer = unpack(this.endianMark + 'L', value)[0];
                      if (pointer !== null) {
                          data = unpack(this.endianMark + _nLoopStr('L', length), this.tiftag.slice(pointer, pointer + length * 4));
                      }
                  }
                  else {
                      data = unpack(this.endianMark + _nLoopStr('L', length), value);
                  }
              }
              else if (t == 5) {
                  // RATIONAL
                  pointer = unpack(this.endianMark + 'L', value)[0];
                  if (length > 1 && pointer !== null) {
                      data = [];
                      for (let x = 0; x < length; x++) {
                          data.push([
                              unpack(this.endianMark + 'L', this.tiftag.slice(pointer + x * 8, pointer + 4 + x * 8))[0],
                              unpack(this.endianMark + 'L', this.tiftag.slice(pointer + 4 + x * 8, pointer + 8 + x * 8))[0],
                          ]);
                      }
                  }
                  else {
                      data = [
                          unpack(this.endianMark + 'L', this.tiftag.slice(pointer, pointer + 4))[0],
                          unpack(this.endianMark + 'L', this.tiftag.slice(pointer + 4, pointer + 8))[0],
                      ];
                  }
              }
              else if (t == 7) {
                  // UNDEFINED BYTES
                  if (length > 4) {
                      pointer = unpack(this.endianMark + 'L', value)[0];
                      if (pointer !== null) {
                          data = this.tiftag.slice(pointer, pointer + length);
                      }
                  }
                  else {
                      data = value.slice(0, length);
                  }
              }
              else if (t == 10) {
                  // SRATIONAL
                  pointer = unpack(this.endianMark + 'L', value)[0];
                  if (length > 1 && pointer !== null) {
                      data = [];
                      for (let x = 0; x < length; x++) {
                          data.push([
                              unpack(this.endianMark + 'l', this.tiftag.slice(pointer + x * 8, pointer + 4 + x * 8))[0],
                              unpack(this.endianMark + 'l', this.tiftag.slice(pointer + 4 + x * 8, pointer + 8 + x * 8))[0],
                          ]);
                      }
                  }
                  else {
                      data = [
                          unpack(this.endianMark + 'l', this.tiftag.slice(pointer, pointer + 4))[0],
                          unpack(this.endianMark + 'l', this.tiftag.slice(pointer + 4, pointer + 8))[0],
                      ];
                  }
              }
              else {
                  throwError('Exif might be wrong. Got incorrect value ' +
                      'type to decode. type:' +
                      t);
                  return null;
              }
              if (data instanceof Array && data.length == 1) {
                  return data[0];
              }
              else {
                  return data;
              }
          };
          let segments, app1;
          if (exifBinary.slice(0, 2) == '\xff\xd8') {
              // JPEG
              segments = splitIntoSegments(exifBinary);
              app1 = getExifSeg(segments);
              if (app1) {
                  this.tiftag = app1.slice(10);
              }
              else {
                  this.tiftag = null;
              }
          }
          else if (['\x49\x49', '\x4d\x4d'].indexOf(exifBinary.slice(0, 2)) > -1) {
              // TIFF
              this.tiftag = exifBinary;
          }
          else if (exifBinary.slice(0, 4) == 'Exif') {
              // Exif
              this.tiftag = exifBinary.slice(6);
          }
          else {
              throw new Error('Given file is neither JPEG nor TIFF.');
          }
      }
  }
  const splitIntoSegments = (data) => {
      if (data.slice(0, 2) != '\xff\xd8') {
          throw new Error("Given data isn't JPEG.");
      }
      let head = 2;
      const segments = ['\xff\xd8'];
      while (true) {
          if (data.slice(head, head + 2) == '\xff\xda') {
              segments.push(data.slice(head));
              break;
          }
          else {
              const length = unpack('>H', data.slice(head + 2, head + 4))[0];
              if (length !== null) {
                  const endPoint = head + length + 2;
                  segments.push(data.slice(head, endPoint));
                  head = endPoint;
              }
          }
          if (head >= data.length) {
              throw new Error('Wrong JPEG data.');
          }
      }
      return segments;
  };
  const getExifSeg = (segments) => {
      let seg;
      for (let i = 0; i < segments.length; i++) {
          seg = segments[i];
          if (seg.slice(0, 2) == '\xff\xe1' && seg.slice(4, 10) == 'Exif\x00\x00') {
              return seg;
          }
      }
      return null;
  };
  const mergeSegments = (segments, exif) => {
      let hasExifSegment = false;
      const additionalAPP1ExifSegments = [];
      segments.forEach(function (segment, i) {
          // Replace first occurence of APP1:Exif segment
          if (segment.slice(0, 2) == '\xff\xe1' &&
              segment.slice(4, 10) == 'Exif\x00\x00') {
              if (!hasExifSegment) {
                  segments[i] = exif;
                  hasExifSegment = true;
              }
              else {
                  additionalAPP1ExifSegments.unshift(i);
              }
          }
      });
      // Remove additional occurences of APP1:Exif segment
      additionalAPP1ExifSegments.forEach(function (segmentIndex) {
          segments.splice(segmentIndex, 1);
      });
      if (!hasExifSegment && exif) {
          segments = [segments[0], exif].concat(segments.slice(1));
      }
      return segments.join('');
  };

  const GPSHelper = {
      degToDmsRational: (degFloat) => {
          const degAbs = Math.abs(degFloat);
          const minFloat = (degAbs % 1) * 60;
          const secFloat = (minFloat % 1) * 60;
          const deg = Math.floor(degAbs);
          const min = Math.floor(minFloat);
          const sec = Math.round(secFloat * 100);
          return [[deg, 1], [min, 1], [sec, 100]];
      },
      dmsRationalToDeg: (dmsArray, ref) => {
          if (ref !== 'S' && ref !== 'W' && ref !== 'N' && ref !== 'E') {
              throw new Error('"dmsRationalToDeg", 2nd argument must be "N", "S", "E" or "W"');
          }
          const sign = ref === 'S' || ref === 'W' ? -1.0 : 1.0;
          const deg = dmsArray[0][0] / dmsArray[0][1] +
              dmsArray[1][0] / (dmsArray[1][1] * 60.0) +
              dmsArray[2][0] / (dmsArray[2][1] * 3600.0);
          return sign * deg;
      },
  };

  const version = '2.0.0b';
  const remove = (imageBinary) => {
      let bbase64Encoded = false;
      if (imageBinary.slice(0, 2) == '\xff\xd8') ;
      else if (imageBinary.slice(0, 23) == 'data:image/jpeg;base64,' ||
          imageBinary.slice(0, 22) == 'data:image/jpg;base64,') {
          imageBinary = atob(imageBinary.split(',')[1]);
          bbase64Encoded = true;
      }
      else {
          throw new Error('Given data is not jpeg.');
      }
      const segments = splitIntoSegments(imageBinary);
      const newSegments = segments.filter(function (segment) {
          return !(segment.slice(0, 2) == '\xff\xe1' &&
              segment.slice(4, 10) == 'Exif\x00\x00');
      });
      let newBinary = newSegments.join('');
      if (bbase64Encoded) {
          newBinary = 'data:image/jpeg;base64,' + btoa(newBinary);
      }
      return newBinary;
  };
  const insert = (exifBinary, imageBinary) => {
      let base64Encoded = false;
      if (exifBinary.slice(0, 6) != '\x45\x78\x69\x66\x00\x00') {
          throw new Error('Given data is not exif.');
      }
      if (imageBinary.slice(0, 2) == '\xff\xd8') ;
      else if (imageBinary.slice(0, 23) == 'data:image/jpeg;base64,' ||
          imageBinary.slice(0, 22) == 'data:image/jpg;base64,') {
          imageBinary = atob(imageBinary.split(',')[1]);
          base64Encoded = true;
      }
      else {
          throw new Error('Given data is not jpeg.');
      }
      const app1Segment = '\xff\xe1' + pack('>H', [exifBinary.length + 2]) + exifBinary;
      const segments = splitIntoSegments(imageBinary);
      let newBinary = mergeSegments(segments, app1Segment);
      if (base64Encoded) {
          newBinary = 'data:image/jpeg;base64,' + btoa(newBinary);
      }
      return newBinary;
  };
  const load = (binary) => {
      let exifBinary;
      if (typeof binary == 'string') {
          if (binary.slice(0, 2) == '\xff\xd8') {
              exifBinary = binary;
          }
          else if (binary.slice(0, 23) == 'data:image/jpeg;base64,' ||
              binary.slice(0, 22) == 'data:image/jpg;base64,') {
              exifBinary = atob(binary.split(',')[1]);
          }
          else if (binary.slice(0, 4) == 'Exif') {
              exifBinary = binary.slice(6);
          }
          else {
              throw new Error("'load' gots invalid file data.");
          }
      }
      else {
          throw new Error("'load' gots invalid type argument.");
      }
      const exifObj = {};
      const exifReader = new ExifReader(exifBinary);
      if (exifReader.tiftag === null) {
          return exifObj;
      }
      if (exifReader.tiftag.slice(0, 2) == '\x49\x49') {
          exifReader.endianMark = '<';
      }
      else {
          exifReader.endianMark = '>';
      }
      let zerothIfd = null;
      let firstIfd = null;
      let exifIfd = null;
      let interopIfd = null;
      let gpsIfd = null;
      let thumbnail = null;
      let firstIfdPointer = null;
      const pointer = unpack(exifReader.endianMark + 'L', exifReader.tiftag.slice(4, 8))[0];
      if (pointer != null) {
          zerothIfd = exifReader.getIfd(pointer, '0th');
          firstIfdPointer = exifReader.getFirstIfdPointer(pointer, '0th');
      }
      if (zerothIfd !== null && 34665 in zerothIfd) {
          const pointer = zerothIfd[34665];
          exifIfd = exifReader.getIfd(pointer, 'Exif');
      }
      if (zerothIfd !== null && 34853 in zerothIfd) {
          const pointer = zerothIfd[34853];
          gpsIfd = exifReader.getIfd(pointer, 'GPS');
      }
      if (exifIfd !== null && 40965 in exifIfd) {
          const pointer = exifIfd[40965];
          interopIfd = exifReader.getIfd(pointer, 'Interop');
      }
      if (firstIfdPointer !== null && firstIfdPointer != '\x00\x00\x00\x00') {
          const pointer = unpack(exifReader.endianMark + 'L', firstIfdPointer)[0];
          if (pointer !== null) {
              firstIfd = exifReader.getIfd(pointer, '1st');
              if (firstIfd !== null && 513 in firstIfd && 514 in firstIfd) {
                  const end = firstIfd[513] + firstIfd[514];
                  thumbnail = exifReader.tiftag.slice(firstIfd[513], end);
              }
          }
      }
      if (zerothIfd !== null) {
          exifObj['0th'] = zerothIfd;
      }
      if (firstIfd !== null) {
          exifObj['1st'] = firstIfd;
      }
      if (exifIfd !== null) {
          exifObj['Exif'] = exifIfd;
      }
      if (gpsIfd !== null) {
          exifObj['GPS'] = gpsIfd;
      }
      if (interopIfd !== null) {
          exifObj['Interop'] = interopIfd;
      }
      if (thumbnail !== null) {
          exifObj['thumbnail'] = thumbnail;
      }
      return exifObj;
  };
  const dump = (originalExifObj) => {
      const TIFF_HEADER_LENGTH = 8;
      const exifObj = copy(originalExifObj);
      const header = 'Exif\x00\x00\x4d\x4d\x00\x2a\x00\x00\x00\x08';
      let existExifIfd = false;
      let existGpsIfd = false;
      let existInteropIfd = false;
      let existFirstIfd = false;
      let zerothIfd, exifIfd, interopIfd, gpsIfd, firstIfd;
      if ('0th' in exifObj) {
          zerothIfd = exifObj['0th'];
      }
      else {
          zerothIfd = {};
      }
      if (('Exif' in exifObj && Object.keys(exifObj['Exif']).length) ||
          ('Interop' in exifObj && Object.keys(exifObj['Interop']).length)) {
          zerothIfd[34665] = 1;
          existExifIfd = true;
          exifIfd = exifObj['Exif'];
          if ('Interop' in exifObj && Object.keys(exifObj['Interop']).length) {
              exifIfd[40965] = 1;
              existInteropIfd = true;
              interopIfd = exifObj['Interop'];
          }
          else if (Object.keys(exifIfd).indexOf(TagValues.ExifIFD.InteroperabilityTag.toString()) > -1) {
              delete exifIfd[40965];
          }
      }
      else if (Object.keys(zerothIfd).indexOf(TagValues.ImageIFD.ExifTag.toString()) > -1) {
          delete zerothIfd[34665];
      }
      if ('GPS' in exifObj && Object.keys(exifObj['GPS']).length) {
          zerothIfd[TagValues.ImageIFD.GPSTag] = 1;
          existGpsIfd = true;
          gpsIfd = exifObj['GPS'];
      }
      else if (Object.keys(zerothIfd).indexOf(TagValues.ImageIFD.GPSTag.toString()) > -1) {
          delete zerothIfd[TagValues.ImageIFD.GPSTag];
      }
      if ('1st' in exifObj &&
          'thumbnail' in exifObj &&
          exifObj['thumbnail'] != null) {
          existFirstIfd = true;
          exifObj['1st'][513] = 1;
          exifObj['1st'][514] = 1;
          firstIfd = exifObj['1st'];
      }
      const zerothIfdSet = dictToBytes(zerothIfd, '0th', 0);
      const zerothIfdLength = zerothIfdSet[0].length +
          Number(existExifIfd) * 12 +
          Number(existGpsIfd) * 12 +
          4 +
          zerothIfdSet[1].length;
      let exifIfdSet, exifIfdBytes = '', exifIfdLength = 0, gpsIfdSet, gpsIfdBytes = '', gpsIfdLength = 0, interopIfdSet, interopIfdBytes = '', interopIfdLength = 0, firstIfdSet, firstIfdBytes = '', thumbnail;
      if (existExifIfd) {
          exifIfdSet = dictToBytes(exifIfd, 'Exif', zerothIfdLength);
          exifIfdLength =
              exifIfdSet[0].length +
                  Number(existInteropIfd) * 12 +
                  exifIfdSet[1].length;
      }
      if (existGpsIfd) {
          gpsIfdSet = dictToBytes(gpsIfd, 'GPS', zerothIfdLength + exifIfdLength);
          gpsIfdBytes = gpsIfdSet.join('');
          gpsIfdLength = gpsIfdBytes.length;
      }
      if (existInteropIfd) {
          const offset = zerothIfdLength + exifIfdLength + gpsIfdLength;
          interopIfdSet = dictToBytes(interopIfd, 'Interop', offset);
          interopIfdBytes = interopIfdSet.join('');
          interopIfdLength = interopIfdBytes.length;
      }
      if (existFirstIfd) {
          const offset = zerothIfdLength + exifIfdLength + gpsIfdLength + interopIfdLength;
          firstIfdSet = dictToBytes(firstIfd, '1st', offset);
          thumbnail = getThumbnail(exifObj['thumbnail']);
          if (thumbnail.length > 64000) {
              throw new Error('Given thumbnail is too large. max 64kB');
          }
      }
      let exifPointer = '', gpsPointer = '', interopPointer = '', firstIfdPointer = '\x00\x00\x00\x00';
      if (existExifIfd) {
          const pointerValue = TIFF_HEADER_LENGTH + zerothIfdLength;
          const pointerBinary = pack('>L', [pointerValue]);
          const key = 34665;
          const keyBinary = pack('>H', [key]);
          const typeBinary = pack('>H', [Types['Long']]);
          const lengthBinary = pack('>L', [1]);
          exifPointer = keyBinary + typeBinary + lengthBinary + pointerBinary;
      }
      if (existGpsIfd) {
          const pointerValue = TIFF_HEADER_LENGTH + zerothIfdLength + exifIfdLength;
          const pointerBinary = pack('>L', [pointerValue]);
          const key = 34853;
          const keyBinary = pack('>H', [key]);
          const typeBinary = pack('>H', [Types['Long']]);
          const lengthBinary = pack('>L', [1]);
          gpsPointer = keyBinary + typeBinary + lengthBinary + pointerBinary;
      }
      if (existInteropIfd) {
          const pointerValue = TIFF_HEADER_LENGTH + zerothIfdLength + exifIfdLength + gpsIfdLength;
          const pointerBinary = pack('>L', [pointerValue]);
          const key = 40965;
          const keyBinary = pack('>H', [key]);
          const typeBinary = pack('>H', [Types['Long']]);
          const lengthBinary = pack('>L', [1]);
          interopPointer = keyBinary + typeBinary + lengthBinary + pointerBinary;
      }
      if (existFirstIfd) {
          const pointerValue = TIFF_HEADER_LENGTH +
              zerothIfdLength +
              exifIfdLength +
              gpsIfdLength +
              interopIfdLength;
          firstIfdPointer = pack('>L', [pointerValue]);
          const thumbnailPointer = pointerValue + firstIfdSet[0].length + 24 + 4 + firstIfdSet[1].length;
          const thumbnailPointerBinary = '\x02\x01\x00\x04\x00\x00\x00\x01' +
              pack('>L', [thumbnailPointer]);
          const thumbnailLengthBinary = '\x02\x02\x00\x04\x00\x00\x00\x01' +
              pack('>L', [thumbnail.length]);
          firstIfdBytes =
              firstIfdSet[0] +
                  thumbnailPointerBinary +
                  thumbnailLengthBinary +
                  '\x00\x00\x00\x00' +
                  firstIfdSet[1] +
                  thumbnail;
      }
      const zerothIfdBinary = zerothIfdSet[0] +
          exifPointer +
          gpsPointer +
          firstIfdPointer +
          zerothIfdSet[1];
      if (existExifIfd) {
          exifIfdBytes = exifIfdSet[0] + interopPointer + exifIfdSet[1];
      }
      return (header +
          zerothIfdBinary +
          exifIfdBytes +
          gpsIfdBytes +
          interopIfdBytes +
          firstIfdBytes);
  };
  const setErrorByPass$1 = (bypass, errorCallback) => {
      setErrorByPass(bypass, errorCallback);
  };
  const resetOrientation = (exifObject) => {
      const orientationKey = TagValues.ImageIFD.Orientation;
      if (exifObject['0th']) {
          if (exifObject['0th'][orientationKey]) {
              exifObject['0th'][orientationKey] = 1;
          }
      }
      return exifObject;
  };

  exports.version = version;
  exports.remove = remove;
  exports.insert = insert;
  exports.load = load;
  exports.dump = dump;
  exports.setErrorByPass = setErrorByPass$1;
  exports.resetOrientation = resetOrientation;
  exports.Types = Types;
  exports.TagValues = TagValues;
  exports.GPSHelper = GPSHelper;
  exports.ValueConvertError = ValueConvertError;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=piexif.js.map
