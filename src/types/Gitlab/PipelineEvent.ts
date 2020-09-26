// https://gitlab.com/gitlab-org/gitlab-foss/-/blob/master/doc/user/project/integrations/webhooks.md


import {GitlabEventType} from "./GitlabEventType";

export interface PipelineEvent {
    object_kind: GitlabEventType;
    object_attributes: ObjectAttributes;
    merge_request: MergeRequest;
    user: User;
    project: Project;
    commit: Commit;
    builds: Build[];
}

interface Variable {
    key: string;
    value: string;
}

interface ObjectAttributes {
    id: number;
    ref: string;
    tag: boolean;
    sha: string;
    before_sha: string;
    source: string;
    status: string;
    stages: string[];
    created_at: Date;
    finished_at: Date;
    duration: number;
    variables: Variable[];
}

interface MergeRequest {
    id: number;
    iid: number;
    title: string;
    source_branch: string;
    source_project_id: number;
    target_branch: string;
    target_project_id: number;
    state: string;
    merge_status: string;
    url: string;
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

interface User2 {
    name: string;
    username: string;
    avatar_url: string;
}

interface Runner {
    id: number;
    description: string;
    active: boolean;
    is_shared: boolean;
}

interface ArtifactsFile {
    filename?: any;
    size?: any;
}

interface Build {
    id: number;
    stage: string;
    name: string;
    status: string;
    created_at: Date;
    started_at: Date;
    finished_at: Date;
    when: string;
    manual: boolean;
    allow_failure: boolean;
    user: User2;
    runner: Runner;
    artifacts_file: ArtifactsFile;
}

