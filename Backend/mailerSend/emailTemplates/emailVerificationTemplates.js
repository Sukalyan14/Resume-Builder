Verification_Template = `
   <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Mail Template Test</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,500;1,100&display=swap');
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                font-family: 'Roboto', sans-serif;
                font-weight: 500
            }
            body{
                height: 100vh;
                display: flex;
                justify-content: center;
            }
            
            img{
                /*max-width: calc(100% - 100px);*/
                max-width: 20%;
                height: auto;
                border-radius:25%;
            }
            h2{
                margin: 0.6rem 0;
                font-style: italic;
                letter-spacing: 1px;
                font-weight: 600;
                font-size: 1.9rem;
                color:  #34495e ;
            }

            h4{
                margin: 0.6rem 0;
                font-size: 1.3rem;
                font-weight: 300;
            }
            p{
                margin: 0.5rem;
                font-size: 0.6rem;
            }
            .container{
                /*margin: auto;*/
                padding-top: 0.5rem;
                text-align: center;
            }
            .btn{
                padding: 0.4rem 0.8rem;
                border-radius: 6px;
                font-size: 0.8rem;
                background-color:  #34495e ;
                border: 1px solid #f5f5f5;
                color: #f5f5f5;
            }
           
        </style>
    </head>
    <body>
        <div class="container">
            
            <h2>MailS</h2>
            
            <img src="https://uploads-ssl.webflow.com/65813403a9915a2548381d1c/6581344b05e429fc356fa04e_app_logo.png" alt="alt.logo" title="Logo" >  
            
            <h4>Hello There!</h4>

            <p>Thanks for Checking , This mail is a test for email verification</p>
            <a href="{ verificationLink }">
                <button class="btn" style="hover:cursor:pointer">Verify Email</button>
            </a>    
            <p>Button not working? Try pasting this link in to your browser:<a href="{ verificationLink }">{ verificationLink }</a></p>
            
        </div>

    </body>
</html>
`

module.exports = Verification_Template