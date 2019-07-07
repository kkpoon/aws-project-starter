import cdk = require("@aws-cdk/core");
import s3 = require("@aws-cdk/aws-s3");
import cloudfront = require("@aws-cdk/aws-cloudfront");

export class WebSiteStack extends cdk.Stack {
    public constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const websiteBucket = new s3.Bucket(this, "website-bucket", {
            encryption: s3.BucketEncryption.S3_MANAGED,
            publicReadAccess: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            versioned: true,
            websiteIndexDocument: "index.html",
            websiteErrorDocument: "404.html",
        });

        const webDistribution = new cloudfront.CloudFrontWebDistribution(
            this,
            "website-distribution",
            {
                originConfigs: [
                    {
                        s3OriginSource: {
                            s3BucketSource: websiteBucket,
                        },
                        behaviors: [{ isDefaultBehavior: true }],
                    },
                ],
            }
        );

        new cdk.CfnOutput(this, "WebsiteBucketArn", {
            value: websiteBucket.bucketArn,
        });

        new cdk.CfnOutput(this, "WebsiteDistributionId", {
            value: webDistribution.distributionId,
        });
    }
}
