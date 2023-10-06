import Document, { Head, Main, NextScript } from 'next/document'
import React, { Component } from 'react'
import { connect } from 'react-redux'

 export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          {/* <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> */}          
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta name="theme-color" content="#000000" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="HandheldFriendly" content="true" />

          <title>PinaHeart.com</title>
          
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600" rel="stylesheet" />
          <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
          <link href="/static/assets/css/style.css" rel="stylesheet" />
          <link href="/static/assets/css/responsive.css" rel="stylesheet" />
          <link href="/static/assets/css/font.css" rel="stylesheet" />          
          
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        </Head>
        <body>
        <script src="https://js.stripe.com/v3/"></script>
        <script dangerouslySetInnerHTML={{__html: `
            window.fbAsyncInit = function() {
              FB.init({
                appId            : '2107104886246681',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v3.3'
              });
            };`}} />
          <script>
          </script>
          <script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>
          <script src="https://apis.google.com/js/platform.js"></script>
          <script async defer dangerouslySetInnerHTML={{__html: `
            var list = [
              'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css',
              'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css',
              'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
              'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
              'https://use.fontawesome.com/releases/v5.0.4/css/all.css',
              '/static/assets/css/accordion.css'
            ];
            for (var i=0; i<list.length;i++) {
              var myCSS = document.createElement( "link" );
              myCSS.rel = "stylesheet";
              myCSS.href = list[i];
              document.head.insertBefore( myCSS, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling );
            }
            `}}>
          </script>
          <script src="https://code.jquery.com/jquery-latest.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

