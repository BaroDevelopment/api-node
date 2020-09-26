// https://gitlab.com/gitlab-org/gitlab-foss/-/blob/master/doc/user/project/integrations/webhooks.md

import {GitlabEventType} from "./GitlabEventType";

export interface CommentOnIssue {
    object_kind: GitlabEventType;
    user: User;
    project_id: number;
    project: Project;
    repository: Repository;
    object_attributes: ObjectAttributes;
    issue: Issue;
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

interface Label {
    id: number;
    title: string;
    color: string;
    project_id?: number;
    created_at: Date;
    updated_at: Date;
    template: boolean;
    description?: any;
    type: string;
    group_id?: number;
}

interface Issue {
    id: number;
    title: string;
    assignee_ids: any[];
    assignee_id?: any;
    author_id: number;
    project_id: number;
    created_at: Date;
    updated_at: Date;
    position: number;
    branch_name?: any;
    description: string;
    milestone_id?: any;
    state: string;
    iid: number;
    labels: Label[];
}