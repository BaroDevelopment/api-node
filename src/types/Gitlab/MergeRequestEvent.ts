// https://gitlab.com/gitlab-org/gitlab-foss/-/blob/master/doc/user/project/integrations/webhooks.md

import {GitlabEventType} from "./GitlabEventType";

export interface MergeRequestEvent {
    object_kind: GitlabEventType;
    user: User;
    project: Project;
    repository: Repository;
    object_attributes: ObjectAttributes;
    labels: Label[];
    changes: Changes;
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
    timestamp: Date;
    url: string;
    author: Author;
}

interface Assignee {
    name: string;
    username: string;
    avatar_url: string;
}

interface ObjectAttributes {
    id: number;
    target_branch: string;
    source_branch: string;
    source_project_id: number;
    author_id: number;
    assignee_id: number;
    title: string;
    created_at: Date;
    updated_at: Date;
    milestone_id?: any;
    state: string;
    merge_status: string;
    target_project_id: number;
    iid: number;
    description: string;
    source: Source;
    target: Target;
    last_commit: LastCommit;
    work_in_progress: boolean;
    url: string;
    action: string;
    assignee: Assignee;
}

interface Label {
    id: number;
    title: string;
    color: string;
    project_id: number;
    created_at: Date;
    updated_at: Date;
    template: boolean;
    description: string;
    type: string;
    group_id: number;
}

interface UpdatedById {
    previous?: any;
    current: number;
}

interface UpdatedAt {
    previous: string;
    current: string;
}

interface Previou {
    id: number;
    title: string;
    color: string;
    project_id: number;
    created_at: Date;
    updated_at: Date;
    template: boolean;
    description: string;
    type: string;
    group_id: number;
}

interface Current {
    id: number;
    title: string;
    color: string;
    project_id: number;
    created_at: Date;
    updated_at: Date;
    template: boolean;
    description: string;
    type: string;
    group_id: number;
}

interface Labels {
    previous: Previou[];
    current: Current[];
}

interface Changes {
    updated_by_id: UpdatedById;
    updated_at: UpdatedAt;
    labels: Labels;
}
