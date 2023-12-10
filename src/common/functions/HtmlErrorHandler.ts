import express from "express";

function HtmlErrorHandler(message, response: express.Response) {
    try {
        const template = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ERROR</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Roboto", sans-serif;
      }
      body {
        margin: 0;
        padding: 0;
        background: white;
      }
      .error-template-top-wrapper {
        width: 100%;
        height: 100%;
      }

      .error-template-header-wrapper {
        margin: 30px;
      }
      .error-template-body-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    
      }

      .error-template-body-content {
        display: flex;
        align-items: center;
        flex-direction: column;
       margin-bottom: 50px;
      }

      .error-template-body-content .error-logo-svg {
        margin-bottom: 40px;
      }

      .error-template-body-content .error-tempalate-error-message {
        color: #0e244a;
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 15px;
        text-align: center;
      }

      .error-template-body-content .error-tempalate-error-description {
        color: #667286;
        font-size: 16px;
        text-align: center;
      }


        .error-template-body-footer .error-template-body-footer-content{
        color: #0E244A;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        }

    </style>
  </head>
  <body>
    <div class="error-template-top-wrapper">
      <div class="error-template-header-wrapper">
        <img
          src="https://websitepublicasset.s3.ap-south-1.amazonaws.com/updaptLogoErrorTemp.svg"
          alt="logo"
        />
      </div>

      <div class="error-template-body-wrapper">
        <div class="error-template-body-content">
          <img
            src="https://websitepublicasset.s3.ap-south-1.amazonaws.com/ErrorLogo.svg"
            alt="404"
            class="error-logo-svg"
          />
          <div class="error-tempalate-error-message">
           404
          </div>
          <p class="error-tempalate-error-description">
          ${message}
          </p>
        </div>

        <div class="error-template-body-footer">
          <div class="error-template-body-footer-content">
              Please contact your account administrator
          </h4>
        </div>
      </div>
    </div>
  </body>
</html>`;

        response.write(template);
        return response.end();
    } catch (error) {
        throw error;
    }
}

export function redirectHtmlInMobile(
    message,
    response: express.Response,
    status: number
) {
    try {
        const template = `<!DOCTYPE html>
    <html lang="en">
    <head>
  <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">
</head>
    <style>
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: calc(100%);
    }
    .stage {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dot-pulse {
      position: relative;
      left: -9999px;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: #0D2C40;
      color: #0D2C40;
      box-shadow: 9999px 0 0 -5px #0D2C40;
      animation: dotPulse 1.5s infinite linear;
      animation-delay: 0.25s;
    }

    .dot-pulse::before,
    .dot-pulse::after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: #0D2C40;
      color: #0D2C40;
    }

    .dot-pulse::before {
      box-shadow: 9984px 0 0 -5px #0D2C40;
      animation: dotPulseBefore 1.5s infinite linear;
      animation-delay: 0s;
    }

    .dot-pulse::after {
      box-shadow: 10014px 0 0 -5px #0D2C40;
      animation: dotPulseAfter 1.5s infinite linear;
      animation-delay: 0.5s;
    }

    @keyframes dotPulseBefore {
      0% {
        box-shadow: 9984px 0 0 -5px #0D2C40;
      }
      30% {
        box-shadow: 9984px 0 0 2px #0D2C40;
      }
      60%,
      100% {
        box-shadow: 9984px 0 0 -5px #0D2C40;
      }
    }

    @keyframes dotPulse {
      0% {
        box-shadow: 9999px 0 0 -5px #0D2C40;
      }
      30% {
        box-shadow: 9999px 0 0 2px #0D2C40;
      }
      60%,
      100% {
        box-shadow: 9999px 0 0 -5px #0D2C40;
      }
    }

    @keyframes dotPulseAfter {
      0% {
        box-shadow: 10014px 0 0 -5px #0D2C40;
      }
      30% {
        box-shadow: 10014px 0 0 2px #0D2C40;
      }
      60%,
      100% {
        box-shadow: 10014px 0 0 -5px #0D2C40;
      }
    }
  </style>
  <div class="container">
    <div class="stage">
      <div class="dot-pulse"></div>
    </div>
  </div>
    </html>
    `;
        response.write(template);
        return response.end();
    } catch (error) {
        throw error;
    }
}

export default HtmlErrorHandler;
