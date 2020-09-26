// https://gitlab.com/gitlab-org/gitlab-foss/-/blob/master/doc/user/project/integrations/webhooks.md

import {GitlabEventType} from "./GitlabEventType";

export interface DeploymentEvent {
    object_kind: GitlabEventType;
    status: string;
    deployable_id: number;
    deployable_url: string;
    environment: string;
    project: Project;
    short_sha: string;
    user: User;
    user_url: string;
    commit_url: string;
    commit_title: string;
}

interface Project {
    id: number;
    name: string;
    description: string;
    web_url: string;
    avatar_url?: any;
    git_ssh_url: string;
    git_http_url: string;
    namespace: string;
    visibility_level: number;
    path_with_namespace: string;
    default_branch: string;
    ci_config_path: string;
    homepage: string;
    url: string;
    ssh_url: string;
    http_url: string;
}

interface User {
    name: string;
    username: string;
    avatar_url: string;
    email: string;
}