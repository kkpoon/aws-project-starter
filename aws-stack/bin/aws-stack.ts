#!/usr/bin/env node
import "source-map-support/register";
import cdk = require("@aws-cdk/core");
import { InfrastructureStack } from "../lib/stacks/infrastructure";
import { WebSiteStack } from "../lib/stacks/website";

const app = new cdk.App();
new InfrastructureStack(app, "InfrastructureStack-ap-southeast-1", {
    env: {
        region: "ap-southeast-1",
    },
});
new WebSiteStack(app, "WebSiteStack-us-east-1", {
    env: {
        region: "us-east-1",
    },
});
