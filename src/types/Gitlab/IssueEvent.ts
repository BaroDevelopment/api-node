// https://gitlab.com/gitlab-org/gitlab-foss/-/blob/master/doc/user/project/integrations/webhooks.md

import {GitlabEventType} from "./GitlabEventType";

export default interface GitLabIssueEvent {
    object_kind: GitlabEventType;
    user: User;
    project: Project;
    object_attributes: ObjectAttributes;
    repository: Repository;
    assignees: Assignee[];
    assignee: Assignee2;
    labels: Label2[];
    changes: Changes;
}

interface User {
    name: string;
    username: string;
    avatar_url: string;
    email: string;
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
    ci_config_path?: any;
    homepage: string;
    url: string;
    ssh_url: string;
    http_url: string;
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

interface ObjectAttributes {
    id: number;
    title: string;
    assignee_ids: number[];
    assignee_id: number;
    author_id: number;
    project_id: number;
    created_at: Date;
    updated_at: Date;
    updated_by_id: number;
    last_edited_at?: any;
    last_edited_by_id?: any;
    relative_position: number;
    description: string;
    milestone_id?: any;
    state_id: number;
    confidential: boolean;
    discussion_locked: boolean;
    due_date?: Date;
    moved_to_id?: any;
    duplicated_to_id?: any;
    time_estimate: number;
    total_time_spent: number;
    human_total_time_spent?: any;
    human_time_estimate?: any;
    weight?: any;
    iid: number;
    url: string;
    state: string;
    action: string;
    labels: Label[];
}

interface Repository {
    name: string;
    url: string;
    description: string;
    homepage: string;
}

interface Assignee {
    name: string;
    username: string;
    avatar_url: string;
}

interface Assignee2 {
    name: string;
    username: string;
    avatar_url: string;
}

interface Label2 {
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

