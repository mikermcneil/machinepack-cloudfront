// module.exports = {
//   friendlyName: 'Get CloudFront URL',
//   description: 'Build and sign a URL for Amazon CloudFront.',
//   extendedDescription: '',
//   inputs: {
//     keypairId: {
//       description: 'Your CloudFront keypair id',
//       example: 'BKA5V32PQ17CB284',
//       whereToGet: {
//         url: 'https://console.aws.amazon.com/iam/home?region=us-east-1#security_credential',
//         description: 'Generate a CloudFront keypair in the AWS IAM console, then copy and paste the "Access Key Id"'
//       },
//       required: true
//     },
//     // privateKey: {
//     //   description: 'Your CloudFront private key',
//     //   whereToGet: {
//     //     url: 'https://console.aws.amazon.com/iam/home?region=us-east-1#security_credential',
//     //     description: 'Generate a CloudFront keypair in the AWS IAM console, download your private key file, then copy and paste its contents.'
//     //   },
//     //   example: '-----BEGIN RSA PRIVATE KEY-----\nMIIEow......\n-----END RSA PRIVATE KEY-----',
//     //   required: true
//     // },
//     src: {
//       description: 'The URL to regenerate and sign as a CloudFront URL',
//       example: 'http://example.com/path/to/s3/object',
//       required: true
//     },
//     ttl: {
//       description: 'Number of miliseconds to cache the contents of the src URL on CloudFront',
//       example: 3600
//     }
//   },
//   defaultExit: 'success',
//   exits: {
//     error: {
//       description: 'Unexpected error occurred.'
//     },
//     success: {
//       description: 'Returns a signed CloudFront URL.',
//       example: 'http://cloudfront.com/blah/blah'
//     }
//   },
//   fn: function(inputs, exits) {
//     var signedUrl = require('aws-cloudfront-sign').getSignedUrl(inputs.src, {
//       keypairId: inputs.keypairId,
//       // privateKeyString: inputs.privateKey,
//       privateKeyPath: '/Users/mikermcneil/Downloads/pk-APKAJU5MWXIKYDV3YILQ.pem',
//       expireTime: (new Date()).getTime() + (inputs.ttl || 24*60*60*1000)
//     });
//     return exits.success(signedUrl);
//   },

// };
