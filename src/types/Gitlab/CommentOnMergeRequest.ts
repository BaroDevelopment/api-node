// https://gitlab.com/gitlab-org/gitlab-foss/-/blob/master/doc/user/project/integrations/webhooks.md

import {GitlabEventType} from "./GitlabEventType";

export interface CommentOnMergeRequest {
    object_kind: GitlabEventType;
    user: User;
    project_id: number;
    project: Project;
    repository: Repository;
    object_attributes: ObjectAttributes;
    merge_request: MergeRequest;
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

interface Source {
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

interface Target {
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

interface Author {
    name: string;
    email: string;
}

interface LastCommit {
    id: string;
    message: string;
    timestamp: string;
    url: string;
    author: Author;
}

interface Assignee {
    name: string;
    username: string;
    avatar_url: string;
}

interface MergeRequest {
    id: number;
    target_branch: string;
    source_branch: string;
    source_project_id: number;
    author_id: number;
    assignee_id: number;
    title: string;
    created_at: Date;
    updated_at: Date;
    milestone_id: number;
    state: string;
    merge_status: string;
    target_project_id: number;
    iid: number;
    description: string;
    position: number;
    source: Source;
    target: Target;
    last_commit: LastCommit;
    work_in_progress: boolean;
    assignee: Assignee;
}
