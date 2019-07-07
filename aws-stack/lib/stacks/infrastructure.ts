import cdk = require("@aws-cdk/core");
import ec2 = require("@aws-cdk/aws-ec2");

export class InfrastructureStack extends cdk.Stack {
    public constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const vpc = new ec2.Vpc(this, "vpc");
    }
}
