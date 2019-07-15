import cdk = require("@aws-cdk/core");
import { PrivateSubnet, PublicSubnet, Vpc } from "@aws-cdk/aws-ec2";

const DEFAULT_CIDR = "10.1.0.0/16";
const PUBLIC_SUBNETS = ["10.1.0.0/20", "10.1.16.0/20", "10.1.32.0/20"];
const PRIVATE_SUBNETS = ["10.1.48.0/20", "10.1.64.0/20", "10.1.80.0/20"];

export class InfrastructureStack extends cdk.Stack {
    public constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const vpc = new Vpc(this, "vpc", { cidr: DEFAULT_CIDR });

        PUBLIC_SUBNETS.forEach((s, i): void => {
            new PublicSubnet(this, `public-subnet-${i + 1}`, {
                availabilityZone: vpc.availabilityZones[i],
                cidrBlock: s,
                vpcId: vpc.vpcId,
                mapPublicIpOnLaunch: true,
            });
        });

        PRIVATE_SUBNETS.forEach((s, i): void => {
            new PrivateSubnet(this, `private-subnet-${i + 1}`, {
                availabilityZone: vpc.availabilityZones[i],
                cidrBlock: s,
                vpcId: vpc.vpcId,
            });
        });
    }
}
