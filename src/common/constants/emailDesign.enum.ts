/**this is used to fetch client task role for email based on status */

export const emailNotificationEnum = {
  MAIL_SERVICE: (message, link, type?) => {
    return {
      htmlCode: `<html lang="en">
            <head>
              <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&family=Rubik:ital@1&display=swap"
                rel="stylesheet"
              />
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
              />
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Document</title>
              <style>
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: "Roboto", sans-serif;
                  font-family: "Rubik", sans-serif;
                }
                body {
                  margin: 0;
                  padding: 0;
                  color: #0C1C48;
                }
                .mail-top-wrapper {
                  width: 100%;
                  height: 100%;
                }
                .mail-inner-wrapper {
                  background: white;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  /* border: 1px solid whitesmoke; */
                  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                }
                .mail-header {
                  padding: 20px 20px 20px 35px;
                  background: #bd8c31;
                  color: white;
                  border-radius: 12px 12px 0px 0px;
                }
                .mail-body-outer-wrapper {
                  padding: 10px 25px 0px 25px;
                  height:auto;
                }
                .link-cover{
                 margin-top:15px;
                 margin-bottom:15px;
                }
                .recipient-name {
                  margin: 10px 0px;
                }
                .mail-welcome-header {
                  margin: 20px 0px;
                  font-size: 20px;
                  font-weight: 600;
                }
                .mail-company-details {
                  margin-bottom: 20px;
                }
                .mail-account-info-header {
                  margin: 20px 0px;
                  font-size: 18px;
                  font-weight: 600;
                }
                .mail-account-info {
                  font-size: 15px;
                  margin: 5px 0px;
                }
                .mail-action-btn {
                  background: #1378C0;
                  background: linear-gradient(90deg, #3A72EB, #2F5EC4);
                  color: white;
                  outline: none;
                  padding: 15px 20px;
                  border: none;
                  border-radius: 24px;
                  font-weight: 600;
                  font-size: 16px;
                  margin: 20px 0px;
                  cursor: pointer;
                }
                .mail-thanks-footer,
                .mail-company-name-footer {
                  margin: 5px 0px;
                }
                .mail-footer-outer-wrapper {
                  background-color: #1F2A44;
                  color: white;
                  padding: 10px;
                }
                .mail-footer-header {
                  text-align: center;
                  font-weight: 600;
                }
                /* social media with effects */
                .mail-connect-with-us-reference {
                  text-align: center;
                  padding: 20px 0px;
                  border-bottom: 1px solid #787098;
                }
                .icon-media {
                  display: inline-block;
                }
                i {
                  background-color: white;
                  border-radius: 50%;
                  border: 1px solid #787098;
                  padding: 8px;
                  margin: 0px 5px;
                  color: #0B0B45;
                  background-color: #787098;
                }
                i:hover {
                  background-color: #0B0B45;
                  color: #787098;
                  border: 1px solid #0B0B45;
                }
                .mail-footer-address {
                  font-size: 12px;
                  color: #BFBDC5;
                  text-align: center;
                  margin: 5px 0px;
                }
                .or-email-phone {
                  font-size: large;
                  font-weight: 700;
                  font-style: normal;
                  margin: 0px 3px;
                }
              </style>
            </head>
            <body>
              <div class="mail-top-wrapper">
                <div class="mail-inner-wrapper">
                  <h1 class="mail-header">TeamFame</h1>
                  <div class="mail-body-outer-wrapper">
                  <div class="link-cover">Dear User,</div>
                  ${message}
                  ${
                    type == "ESG"
                      ? `<div class= "link-cover" >For any further assistance kindly drop an email to support@teamfame.com</div>`
                      : link &&
                        `<div class= "link-cover" >
                      To review the status, kindly click here
                      <a href = ${link && link}> ${link && link} </a>
                    </div>`
                  }
                     <div> Thanks,</div>
                     <div>Team Fame</div>
                     <br/>
                     <hr/>
                     
                     <div class="mail-footer-address">This is a system generated e-mail. Please do not reply to this e-mail.</div>
                  </div>
                 
                
                   
                 
                
                  
                  <div class="mail-footer-outer-wrapper">
                    <p class="mail-footer-address">
                      
                       support@teamfame.com
                    </p>
                    <p class="mail-footer-address">©TeamFame | All Rights Reserved 2021</p>
                    
                  </div>
                </div>
              </div>
            </body>
          </html>`,
    };
  },
};
