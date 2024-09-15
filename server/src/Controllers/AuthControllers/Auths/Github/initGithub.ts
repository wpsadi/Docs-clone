import { env } from "@/utils/env";
import { OAuthApp } from "@octokit/oauth-app";

const GithubOauthApp = new OAuthApp({
    clientType: "oauth-app",
    clientId: env.Oauth.github.clientID,
    clientSecret: env.Oauth.github.clientSecret,
  });

const scopes = {
    userInfo: [
        "user",            // Full access to user profile information
        "read:user",       // Read-only access to public and private profile information
        "user:email",      // Access to the user's email addresses
        "user:follow"      // Access to follow and unfollow users
      ],
    repo: [
      "repo",
      "repo:status",
      "repo_deployment",
      "public_repo",
      "repo:invite",
      "security_events"
    ],
    workflow: ["workflow"],
    write: [
      "write:packages",
      "read:packages",
      "delete:packages",
      "admin:org",
      "admin:public_key",
      "admin:repo_hook",
      "admin:org_hook"
    ],
    notifications: [
      "notifications",
      "user",
      "read:user",
      "user:email",
      "user:follow"
    ],
    gpg_key: [
      "admin:gpg_key",
      "write:gpg_key",
      "read:gpg_key"
    ],
    discussion: [
      "discussion",
      "discussion:read",
      "discussion:write",
      "discussion:admin"
    ],
    project: [
      "read:project",
      "write:project",
      "admin:project"
    ],
    codespaces: [
      "codespace",
      "codespace:read",
      "codespace:write",
      "codespace:admin"
    ],
    package: [
      "package",
      "package:read",
      "package:write",
      "package:delete"
    ],
    org: [
      "admin:org",
      "write:org",
      "read:org"
    ],
    gists: ["gist"],
    repo_deployment: ["repo_deployment"],
    read: [
      "read:org",
      "read:public_key",
      "read:repo_hook"
    ],
    delete_repo: ["delete_repo"],
    admin: [
      "admin:repo_hook",
      "admin:org_hook"
    ]
  };
  


export { GithubOauthApp, scopes};