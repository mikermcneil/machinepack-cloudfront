module.exports = {
  friendlyName: 'Invalidate path(s)',
  description: 'Invalidate one or more paths within a CloudFront distribution.',
  extendedDescription: 'Use this machine when you want to delete objects from CloudFront, forcing it to pull fresh copies of those files from your origin server/bucket.',
  inputs: {
    accessKeyId: {
      description: 'Your AWS access key id',
      example: 'BJIBJB5SF3Z5QQDJFHHX',
      required: true,
      whereToGet: {
        url: 'https://console.aws.amazon.com/iam/home#security_credential'
      }
    },
    secretAccessKey: {
      description: 'Your AWS secret',
      example: 'JOpq29vhaJ2VVae2jfkN/+z9/ulqRzd',
      required: true,
      whereToGet: {
        url: 'https://console.aws.amazon.com/iam/home#security_credential'
      }
    },
    region: {
      description: 'Your AWS region (defaults to "us-east-1")',
      example: 'us-east-1'
    },
    distribution: {
      description: 'The unique id of the CloudFront distribution containing the paths to invalidate.',
      example: 'E672U0C5WS3M1',
      required: true
    },
    paths: {
      description: 'The paths to invalidate, relative to this distribution (each one starting with a leading slash)',
      example: ['/images/foobar.jpg'],
      required: true
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    invalidCredentials: {
      description: 'The security credentials specified as inputs are invalid.',
    },
    unknownDistribution: {
      description: 'The specified distribution does not exist.'
    },
    success: {
      description: 'Done. The provided paths have been invalidated on CloudFront.'
    }
  },
  fn: function(inputs, exits) {

    var _ = require('lodash');
    var AmazonWebServices = require('aws-sdk');
    AmazonWebServices.config.update({
      region: inputs.region||'us-east-1',
      accessKeyId: inputs.accessKeyId,
      secretAccessKey: inputs.secretAccessKey
    });

    var CloudFront = new AmazonWebServices.CloudFront();

    CloudFront.createInvalidation({
      DistributionId: inputs.distribution,
      InvalidationBatch: {
        CallerReference: (new Date()).toString(),
        Paths: {
          Quantity: inputs.paths.length,
          Items: inputs.paths
        }
      }
    }, function(err, data) {
      if (err) {
        if (!_.isObject(err)) return exits.error(err);
        console.log(err.code, err.type, err.name);
        if (err.code === 'InvalidClientTokenId') {
          return exits.invalidCredentials();
        }
        if (err.code === 'NoSuchDistribution') {
          return exits.unknownDistribution();
        }
        return exits.error(err);
      }
      return exits.success();
    });
  },

};
