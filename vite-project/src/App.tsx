import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ScanbotSDK from 'scanbot-web-sdk';

import {

  BarcodeFormat,
  BarcodeScannerConfiguration,
  IBarcodeScannerHandle,

} from "scanbot-web-sdk/@types";
import { ViewFinderConfiguration } from 'scanbot-web-sdk/@types/ui2/configuration/ViewFinderConfiguration';
import { UserGuidanceConfiguration } from 'scanbot-web-sdk/@types/ui2/configuration/UserGuidanceConfiguration';


function App() {

  let sdk: ScanbotSDK;
  let barcodeScanner: IBarcodeScannerHandle;

  useEffect(() => {
    async function init() {
      const myLicenseKey = "";
      sdk = await ScanbotSDK.initialize({
        licenseKey: myLicenseKey,
      });

    }

    init();
  }, []);

  async function startBarcodeScanner() {
    console.log('start');
    const barcodeFormats: BarcodeFormat[] = [
      "ONE_D",
      "AZTEC",
      "CODABAR",
      "CODE_39",
      "CODE_93",
      "CODE_128",
      "DATA_MATRIX",
      "EAN_8",
      "EAN_13",
      "ITF",
      "MAXICODE",
      "PDF_417",
      "QR_CODE",
      "UPC_A",
      "UPC_E",
      "UPC_EAN_EXTENSION",
      "MSI_PLESSEY",
      "IATA_2_OF_5",
      "INDUSTRIAL_2_OF_5",
      "CODE_25",
      "MICRO_QR_CODE",
      "USPS_INTELLIGENT_MAIL",
      "ROYAL_MAIL",
      "JAPAN_POST",
      "ROYAL_TNT_POST",
      "AUSTRALIA_POST",
      "DATABAR",
      "DATABAR_EXPANDED",
      "DATABAR_LIMITED",
      "GS1_COMPOSITE"
    ];

    // const config: BarcodeScannerConfiguration = {
    //   containerId: '',
    //   captureDelay: 1000,
    //   onBarcodesDetected: callback,
    //   barcodeFormats: barcodeFormats,
    //   onError: errorCallback,
    //   preferredCamera: 'camera2 0, facing back',


    //   ...additionalConfig
    // };

    const config: BarcodeScannerConfiguration = {
      containerId: 'barcodescanner',
      captureDelay: 1000,

      onBarcodesDetected: (result) => {
        console.log(result);
      },
      barcodeFormats: barcodeFormats,
      onError: (e) => {
        console.log(e);
      },
      preferredCamera: 'camera2 0, facing back',
      finder: {
        visible: true,
        style: {
          _type: "FinderStrokedStyle",
          cornerRadius: 5,
          strokeColor: "white",
          strokeWidth: 1,
        },
        aspectRatio: {
          width: 1,
          height: 1,
        },
        overlayColor: "rgba(0, 0, 0, 0.5)",
      } as ViewFinderConfiguration,
      userGuidance: {
        visible: true,
        title: {
          text: "Move the finder over a barcode",
          color: "white",
        },
        background: {
          strokeColor: "green",
          fillColor: "rgba(0, 255, 0, 0.2)",
        }
      } as UserGuidanceConfiguration,
    }

    barcodeScanner = await sdk!.createBarcodeScanner(config);
  }

  return (
    <>
      <div id='barcodescanner' style={{ width: "700px", height: "400px" }}></div>
      <h1>Vite + React</h1>
      <div>
        <button onClick={startBarcodeScanner}>
          Click
        </button>
      </div>

    </>
  )
}

export default App
