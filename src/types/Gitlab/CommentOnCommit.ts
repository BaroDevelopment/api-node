// https://gitlab.com/gitlab-org/gitlab-foss/-/blob/master/doc/user/project/integrations/webhooks.md

import {GitlabEventType} from "./GitlabEventType";

export interface CommentOnCommit {
    object_kind: GitlabEventType;
    user: User;
    project_id: number;
    project: Project;
    repository: Repository;
    object_attributes: ObjectAttributes;
    commit: Commit;
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

interface StDiff {
    diff: string;
    new_path: string;
    old_path: string;
    a_mode: string;
    b_mode: string;
    new_file: boolean;
    renamed_file: boolean;
    deleted_file: boolean;
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
    line_code: string;
    commit_id: string;
    noteable_id?: any;
    system: boolean;
    st_diff: StDiff;
    url: string;
}

interface Author {
    name: string;
    email: string;
}

interface Commit {
    id: string;
    message: string;
    timestamp: Date;
    url: string;
    author: Author;
}