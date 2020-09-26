// https://gitlab.com/gitlab-org/gitlab-foss/-/blob/master/doc/user/project/integrations/webhooks.md

import {GitlabEventType} from "./GitlabEventType";

export interface WikiPageEvent {
    object_kind: GitlabEventType;
    user: User;
    project: Project;
    wiki: Wiki;
    object_attributes: ObjectAttributes;
}

interface User {
    name: string;
    username: string;
    avatar_url: string;
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
    homepage: string;
    url: string;
    ssh_url: string;
    http_url: string;
}

interface Wiki {
    web_url: string;
    git_ssh_url: string;
    git_http_url: string;
    path_with_namespace: string;
    default_branch: string;
}

interface ObjectAttributes {
    title: string;
    content: string;
    format: string;
    message: string;
    slug: string;
    url: string;
    action: string;
}

