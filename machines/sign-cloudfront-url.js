module.exports = {
  friendlyName: 'Sign CloudFront URL',
  description: 'Sign an Amazon CloudFront URL.',
  extendedDescription: '',
  inputs: {
    keypairId: {
      description: 'Your CloudFront keypair id (i.e. "Access Key ID")',
      example: 'APKAJU5MWXIKYDV3YILQ',
      whereToGet: {
        url: 'https://console.aws.amazon.com/iam/home?region=us-east-1#security_credential',
        description: 'Generate a CloudFront keypair in the AWS IAM console, then copy and paste the "Access Key Id"'
      },
      required: true
    },
    privateKey: {
      description: 'Your CloudFront private key',
      whereToGet: {
        url: 'https://console.aws.amazon.com/iam/home?region=us-east-1#security_credential',
        description: 'Generate a CloudFront keypair in the AWS IAM console, download your private key file, then copy and paste its contents.'
      },
      example: '-----BEGIN RSA PRIVATE KEY-----\nMIIEow......\n-----END RSA PRIVATE KEY-----',
      required: true
    },
    src: {
      description: 'The CloudFront URL to sign',
      example: 'http://cloudfront.net/path/to/thing.jpg',
      required: true
    },
    ttl: {
      description: 'Number of miliseconds to cache the contents of the src URL on CloudFront',
      example: 3600
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Returns a signed CloudFront URL.',
      example: 'http://cloudfront.com/blah/blah'
    }
  },
  fn: function(inputs, exits) {
    var signedUrl = require('aws-cloudfront-sign').getSignedUrl(inputs.src, {
      keypairId: inputs.keypairId,
      privateKeyString: inputs.privateKey,
      expireTime: (new Date()).getTime() + (inputs.ttl || 24*60*60*1000)
    });
    return exits.success(signedUrl);
  },

};
