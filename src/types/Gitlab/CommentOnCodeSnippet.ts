// https://gitlab.com/gitlab-org/gitlab-foss/-/blob/master/doc/user/project/integrations/webhooks.md

import {GitlabEventType} from "./GitlabEventType";

export interface CommentOnCodeSnippet {
    object_kind: GitlabEventType;
    user: User;
    project_id: number;
    project: Project;
    repository: Repository;
    object_attributes: ObjectAttributes;
    snippet: Snippet;
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

interface Repository {
    name: string;
    url: string;
    description: string;
    homepage: string;
}

interface ObjectAttributes {
    id: number;
    note: string;
    noteable_type: string;
    author_id: number;
    created_at: Date;
    updated_at: Date;
    project_id: number;
    attachment?: any;
    line_code?: any;
    commit_id: string;
    noteable_id: number;
    system: boolean;
    st_diff?: any;
    url: string;
}

interface Snippet {
    id: number;
    title: string;
    content: string;
    author_id: number;
    project_id: number;
    created_at: Date;
    updated_at: Date;
    file_name: string;
    expires_at?: any;
    type: string;
    visibility_level: number;
}